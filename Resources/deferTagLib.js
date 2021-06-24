/* global PlugIn Version Task projectsMatching Tag cleanUp flattenedProjects Project */
(() => {
  const deferTagLib = new PlugIn.Library(new Version('1.0'))

  deferTagLib.getTaggedProjects = (tag) => {
    // check for any projects that should be updated with this tag
    const projectsToUpdate = []
    flattenedProjects.forEach(project => {
      if (project.note.includes(`$DEFERWITHTAG=${tag.name}`)) {
        projectsToUpdate.push(project)
      }
    })
    return projectsToUpdate
  }

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

    // update any linked projects
    const projectsToUpdate = deferTagLib.getTaggedProjects(tag)
    console.log(projectsToUpdate)
    projectsToUpdate.forEach(project => (project.status = Project.Status.OnHold))
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
      const tag = scheduler.tags[0]

      const projectsToUpdate = deferTagLib.getTaggedProjects(tag)

      // make tag active or on hold as required
      if (scheduler.name.startsWith('AVAILABLE')) {
        tag.status = Tag.Status.Active
        projectsToUpdate.forEach(project => {
          project.status = Project.Status.Active
        })
      } else if (scheduler.name.startsWith('DEFERRED')) {
        tag.status = Tag.Status.OnHold
        projectsToUpdate.forEach(project => {
          project.status = Project.Status.OnHold
        })
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
