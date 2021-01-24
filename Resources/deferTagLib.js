/* global PlugIn Version Task projectsMatching Tag cleanUp */
(() => {
  const deferTagLib = new PlugIn.Library(new Version('1.0'))

  deferTagLib.deferTag = (tag, date) => {
    const scheduler = new Task(
      `AVAILABLE @ ${date}`,
      projectsMatching('Tag Scheduling')[0]
    )
    scheduler.addTag(tag)
    scheduler.deferDate = date

    // make sure there are no notifications
    scheduler.notifications.forEach((notification) => {
      scheduler.removeNotification(notification)
    })

    // update tag status
    tag.status = Tag.Status.OnHold
  }

  deferTagLib.updateTimedTags = () => {
    cleanUp()

    const now = new Date()

    // get all uncompleted scheduler tasks whose defer date has passed
    const schedulers = projectsMatching('Tag Scheduling')[0].tasks.filter(
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
