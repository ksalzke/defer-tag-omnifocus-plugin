/* global PlugIn Version Task Tag cleanUp folderNamed Folder Project */
(() => {
  const deferTagLib = new PlugIn.Library(new Version('1.0'))

  deferTagLib.deferTag = (tag, date) => {
    const scheduler = new Task(
      `AVAILABLE @ ${date}`,
      deferTagLib.getProj()
    )
    scheduler.addTag(tag)
    scheduler.deferDate = date

    // make sure there are no notifications
    scheduler.notifications.forEach((notification) => {
      scheduler.removeNotification(notification)
    })

    // update tag status
    tag.status = Tag.Status.OnHold

    // defer any child tags
    if (tag.children.length > 0) {
      tag.children.forEach(tag => deferTagLib.deferTag(tag, date))
    }
  }

  deferTagLib.updateTimedTags = () => {
    cleanUp()

    const now = new Date()

    // get all uncompleted scheduler tasks whose defer date has passed
    const schedulers = deferTagLib.getProj().tasks.filter(
      (task) =>
        task.deferDate < now && task.taskStatus !== Task.Status.Completed
    )

    // sort scheduler tasks - earliest defer date first
    schedulers.sort((a, b) => (a.deferDate < b.deferDate ? -1 : 1))

    // for each scheduler task...
    schedulers.forEach((scheduler) => {
      // make tag active or on hold as required
      const tag = scheduler.tags[0]
      if (scheduler.name.startsWith('AVAILABLE')) {
        tag.status = Tag.Status.Active
      } else if (scheduler.name.startsWith('DEFERRED')) {
        tag.status = Tag.Status.OnHold
      }

      // and then mark complete
      scheduler.markComplete()
    })
  }

  deferTagLib.getProj = () => {
    const name = '🏷 Tag Scheduling'

    const createFolder = () => {
      const created = new Folder(name)
      created.active = false
      return created
    }
    const folder = folderNamed(name) || createFolder()

    const project = folder.projectNamed(name) || new Project(name, folder)

    // make SAL
    project.containsSingletonActions = true

    return project
  }

  deferTagLib.checkPlace = (placeID, tag, apiKey) => {
    const url = URL.fromString(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&fields=opening_hours/open_now&key=${apiKey}`
    )

    url.fetch((data) => {
      const json = JSON.parse(data.toString())
      const openNow =
        json.result.opening_hours.open_now === 'true'

      if (openNow) {
        tag.status = Tag.Status.Active
      } else {
        tag.status = Tag.Status.OnHold
      }
    })
  }

  return deferTagLib
})()
