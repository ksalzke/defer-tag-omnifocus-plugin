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
    return true
  }

  return action
})()
