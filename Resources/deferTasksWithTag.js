/* global PlugIn Form flattenedTags */
(() => {
  const action = new PlugIn.Action(function (selection, sender) {
    const lib = this.deferTagLib
    const inputForm = new Form()

    // create menu for form
    const popupMenu = new Form.Field.Option(
      'menuItem',
      'Tag To Defer',
      flattenedTags,
      flattenedTags.map((tag) => {
        return tag.name
      }),
      null
    )

    // create date for form
    const dateField = new Form.Field.Date('dateInput', 'Defer Date', null)

    // add fields to form
    inputForm.addField(popupMenu)
    inputForm.addField(dateField)

    // show form
    const formPrompt = 'Select a tag and a date to defer to:'
    const formPromise = inputForm.show(formPrompt, 'Continue')

    // validate input
    inputForm.validate = function (formObject) {
      // check that a tag has been selected
      const tagStatus = flattenedTags.includes(formObject.values.menuItem)

      // check that date is in the future
      const dateObject = formObject.values.dateInput
      const dateStatus = !!(dateObject && dateObject > new Date())
      const validation = !!(dateStatus && tagStatus)
      return validation
    }
    // process using form data
    formPromise.then(function (formObject) {
      lib.deferTag(formObject.values.menuItem, formObject.values.dateInput)
    })

    // promise function called when form cancelled
    formPromise.catch(function (err) {
      console.log('form cancelled', err.message)
    })
  })

  action.validate = function (selection, sender) {
    // only valid if nothing is selected - so does not show in share menu
    return selection.tasks.length === 0 && selection.projects.length === 0
  }

  return action
})()
