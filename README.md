# About

This is an Omni Automation plug-in bundle for OmniFocus that allows the user to 'defer' a tag and mark tags as on hold or available on a schedule. Further details are provided below.

_Please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from a random amateur on the internet!_

## Known issues

None so far! 🤞

# Installation & Set-Up

(For instructions on getting started with Omni Automation, see [here](https://kaitlinsalzke.com/how-to/how-to-add-a-omnijs-plug-in-to-omnifocus-and-assign-a-keyboard-shortcut/).)

1. Click on the green `Clone or download` button above to download a `.zip` file of the file in this GitHub repository.
2. Unzip the downloaded file.
3. Move the `.omnijs` file to your OmniFocus plug-in library folder.

## 'Scheduler' Tasks

For the purposes of this plugin, a scheduled tag status change is represented by a 'scheduler' task with the following attributes:
* Name starts with `AVAILABLE` or `DEFERRED`. (What follows is ignored by the script; I suggest using something meaningful to you e.g. `AVAILABLE from Saturday 1pm`).
* Project is the first match for `Tag Scheduling` in the database.
* Tag is the tag to be scheduled.
* Defer date is the time that the tag should become available or be placed on hold.

These scheduler tasks can be created manually by the user (recommended for more complicated instances e.g. store opening hours which repeat on a weekly basis) or a single tag can be deferred to a specific date and time by using the `Defer Tasks With Tag` action.

Suggestions:
* For repeating scheduler tasks ensure that `Assigned Dates` are used to maintain the same times.
* For manually created scheduler tasks you will likely want to ensure that there are no notifications set to trigger on the defer date - you probably don't want to see these!

# Actions

## Defer Tasks With Tag

This action shows a form prompting the user to select one or more tags and enter a defer date. It then uses the `deferTag` function to place the tags on hold and create a 'scheduler' task for the tag as described above.

If one or more tags are selected in OmniFocus before the action is run, these tags are automatically selected by default and shown at the top of the list.
If one or more tasks are selected in OmniFocus before the action is run, the tags attached to the first selected task will be shown at the top of the list.

## Updated Timed Tags

This action runs the `updateTimedTags` function described below.

# Functions

This plugin contains the following functions within the `deferTagLib` library:

## deferTag (tag, date)

This function takes a tag object and a date object as input, then places the tag on hold and creates a 'scheduler' task for the tag as described above.

## updateTimedTags

This function checks for any uncompleted 'scheduler' tasks with defer dates before the current time and updates relevant tag statuses accordingly (from oldest defer date to newest). It then marks these scheduler task as complete.

This function can be run manually using the `Update Timed Tags` action but can also be scheduled to run at regular intervals using external tools e.g. Keyboard Maestro.

## checkPlace

This function, given a Google Places Place ID, tag and Google Places API Key, checks Google Maps to see if the place in question is currently open, and updates the status of the tag accordingly.

It is not currently used by this plugin but has been left here so that others may make use of it should they desire.