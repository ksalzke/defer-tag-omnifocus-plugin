/* global PlugIn */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const lib = this.deferTagLib

    const schedulerProject = lib.getProj()

    await document.newWindow()

    schedulerProject.parentFolder.active = true // so that information is visible when shown
    const urlStr = 'omnifocus:///task/' + schedulerProject.id.primaryKey
    URL.fromString(urlStr).call(() => {})
  })

  action.validate = function (selection, sender) {
    // only show when nothing is selected (so doesn't show in share sheet on iOS)
    return selection.tasks.length === 0 && selection.projects.length === 0
  }

  return action
})()
