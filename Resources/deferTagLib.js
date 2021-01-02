(() => {
  let deferTagLib = new PlugIn.Library(new Version("1.0"));

  deferTagLib.updateTimedTags = () => {
    cleanUp();

    let now = new Date();

    // get all uncompleted scheduler tasks whose defer date has passed
    let schedulers = projectsMatching("Tag Scheduling")[0].tasks.filter(
      (task) =>
        task.deferDate < now && task.taskStatus !== Task.Status.Completed
    );

    // sort scheduler tasks - earliest defer date first
    schedulers.sort((a, b) => (a.deferDate < b.deferDate ? -1 : 1));

    // for each scheduler task...
    schedulers.forEach((scheduler) => {
      // make tag active or on hold as required
      let tag = scheduler.tags[0];
      if (scheduler.name.startsWith("AVAILABLE")) {
        tag.status = Tag.Status.Active;
      } else if (scheduler.name.startsWith("DEFERRED")) {
        tag.status = Tag.Status.OnHold;
      }

      // and then mark complete
      scheduler.markComplete();
    });
  };


  return deferTagLib;
})();
