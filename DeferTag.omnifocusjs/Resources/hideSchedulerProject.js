/* global PlugIn */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const lib = this.deferTagLib

    const schedulerProject = lib.getProj()

    schedulerProject.parentFolder.active = false
  })

  action.validate = function (selection, sender) {
    // only show when folder is active
    const lib = this.deferTagLib
    return lib.getProj().parentFolder.active
  }

  return action
})()
