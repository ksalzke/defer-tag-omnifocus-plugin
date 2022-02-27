/* global PlugIn */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const lib = this.deferTagLib

    const schedulerProject = lib.getProj()

    if (Device.current.mac) await document.newTabOnWindow(document.windows[0])
    else await document.newWindow()

    schedulerProject.parentFolder.active = true // so that information is visible when shown
    const urlStr = 'omnifocus:///task/' + schedulerProject.id.primaryKey
    URL.fromString(urlStr).open()

    // set focus - Mac only as focus not yet supported on iOS API
    if (Device.current.mac) document.windows[0].focus = [schedulerProject]
  })

  action.validate = function (selection, sender) {
    return true
  }

  return action
})()
