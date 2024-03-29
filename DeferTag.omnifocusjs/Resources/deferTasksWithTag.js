/* global PlugIn Form flattenedTags */
(() => {
  const action = new PlugIn.Action(function (selection, sender) {
    const lib = this.deferTagLib
    const inputForm = new Form()

    function bringToFront (tagsToFront, currentArray) {
      const removed = currentArray.filter(tag => !tagsToFront.includes(tag))
      return tagsToFront.concat(removed)
    }

    // Bring tags of first selected task if any to the top of the list
    const selectedTaskTags = selection.tasks.length > 0 ? selection.tasks[0].tags.flat() : []
    const selectedTaskTagsWithParents = selectedTaskTags.map(includedTag => flattenedTags.filter(tag => tag === includedTag || tag.flattenedTags.includes(includedTag))).flat()
    const firstWithoutDuplicates = [...new Set(selectedTaskTagsWithParents)]
    let reordered = bringToFront(firstWithoutDuplicates, flattenedTags)

    // Bring any already-selected tags to top of list and select them
    const selectedTags = selection.tags.length > 0 ? selection.tags.flat() : []
    reordered = bringToFront(selectedTags, reordered)

    // create menu for form
    const popupMenu = new Form.Field.MultipleOptions(
      'menuItem',
      'Tag(s) To Defer',
      reordered,
      reordered.map((tag) => {
        return tag.name
      }),
      selectedTags
    )

    // create date for form
    const dateField = new Form.Field.Date('dateInput', 'Defer Date', null)

    // add fields to form
    inputForm.addField(dateField)
    inputForm.addField(popupMenu)

    // show form
    const formPrompt = 'Select tag(s) and a date to defer to:'
    const formPromise = inputForm.show(formPrompt, 'Continue')

    // validate input
    inputForm.validate = function (formObject) {
      // check that a tag has been selected
      const tagStatus = formObject.values.menuItem.length > 0

      // check that date is in the future
      const dateObject = formObject.values.dateInput
      const dateStatus = !!(dateObject && dateObject > new Date())
      const validation = !!(dateStatus && tagStatus)
      return validation
    }
    // process using form data
    formPromise.then(function (formObject) {
      formObject.values.menuItem.forEach(tag => {
        lib.deferTag(tag, formObject.values.dateInput)
      })
    })

    // promise function called when form cancelled
    formPromise.catch(function (err) {
      console.log('form cancelled', err.message)
    })
  })

  action.validate = function (selection, sender) {
    // always available
    return true
  }

  return action
})()
