(() => {
  var action = new PlugIn.Action(function (selection, sender) {
    showForm(); // once form has been completed, deferTasks(tag, date) is called
  });

  action.validate = function (selection, sender) {
    // only valid if nothing is selected - so does not show in share menu
    return selection.tasks.length == 0 && selection.projects.length == 0;
  };

  return action;
})();

function showForm() {
  var inputForm = new Form();

  // create menu for form
  popupMenu = new Form.Field.Option(
    "menuItem",
    "Tag To Defer",
    flattenedTags,
    null,
    null
  );

  // create date for form
  dateField = new Form.Field.Date("dateInput", "Defer Date", null);

  // add fields to form
  inputForm.addField(popupMenu);
  inputForm.addField(dateField);

  // show form
  formPrompt = "Select a tag and a date to defer to:";
  formPromise = inputForm.show(formPrompt, "Continue");

  // validate input
  inputForm.validate = function (formObject) {
    // check that a tag has been selected
    tagStatus = flattenedTags.includes(formObject.values["menuItem"]);

    // check that date is in the future
    dateObject = formObject.values["dateInput"];
    dateStatus = dateObject && dateObject > new Date() ? true : false;
    validation = dateStatus && tagStatus ? true : false;
    return validation;
  };

  // process using form data
  formPromise.then(function (formObject) {
    deferTasks(formObject.values["menuItem"], formObject.values["dateInput"]);
  });

  // promise function called when form cancelled
  formPromise.catch(function (err) {
    console.log("form cancelled", err.message);
  });
}

function deferTasks(tag, date) {
  tag.apply((tag) => {
    tag.tasks.forEach((task) => {
      if (date > task.deferDate) {
        task.deferDate = date;
      }
    });
  });
}
