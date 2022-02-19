/* global PlugIn */
(() => {
  const action = new PlugIn.Action(function (selection, sender) {
    this.deferTagLib.updateTimedTags()
  })

  action.validate = function (selection, sender) {
    return true
  }

  return action
})()
