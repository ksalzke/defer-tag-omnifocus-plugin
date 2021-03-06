/* global PlugIn */
(() => {
  const action = new PlugIn.Action(function (selection, sender) {
    this.deferTagLib.updateTimedTags()
  })

  action.validate = function (selection, sender) {
    // only valid if nothing is selected - so does not show in share menu
    return selection.tasks.length === 0 && selection.projects.length === 0
  }

  return action
})()
