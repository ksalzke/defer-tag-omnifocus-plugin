# About

This is an Omni Automation plug-in bundle for OmniFocus that allows the user to 'defer' a tag and mark tags as on hold or available on a schedule. Further details are provided below.

_Please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from a random amateur on the internet!_

## Known issues

Refer to the 'issues' in this repo for known issues and planned changes/enhancements.

# Installation & Set-Up

1. Click on the green `Clone or download` button above to download a `.zip` file of all the files in this GitHub repository.
2. Unzip the downloaded file.
3. Rename the entire folder to anything you like, with the extension `.omnifocusjs`
4. Move the resulting file to your OmniFocus plug-in library folder.

## '🏷 Tag Scheduling' Storage and 'Scheduler' Tasks

This plugin uses a project inside a dropped folder named (both named `🏷 Tag Scheduling`) to store any preferences, which is then synced using the regular OmniFocus sync method (like any other projects and tasks in the database would be). This is created automatically by the plugin when it is needed.

For the purposes of this plugin, a scheduled tag status change is represented by a 'scheduler' task inside this project with the following attributes:
* Name starts with `AVAILABLE` or `DEFERRED`. (What follows is ignored by the script; I suggest using something meaningful to you e.g. `AVAILABLE from Saturday 1pm`).
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

If one or more tasks are selected in OmniFocus before the action is run, the tags attached to the first selected task will be shown, with any parent tags, at the top of the list.

## Updated Timed Tags

This action runs the `updateTimedTags` function described below.

## Show Scheduler Project

This action navigates to the project used to store the data, and makes its containing folder active so that the information is visible. This action is only available when no projects or tasks are selected (so that it is not shown on the share sheet on iOS)

## Hide Scheduler Project

This action sets the status of the 'Tag Scheduling' folder to dropped, so that it is not visible. This action is only available when the folder has an active status (i.e. its status is not set to dropped.)

# Functions

This plugin contains the following functions within the `deferTagLib` library:

## deferTag (tag, date)

This function takes a tag object and a date object as input, then places the tag on hold and creates a 'scheduler' task for the tag as described above.

Child tags will also be deferred.

## updateTimedTags

This function checks for any uncompleted 'scheduler' tasks with defer dates before the current time and updates relevant tag statuses accordingly (from oldest defer date to newest). It then marks these scheduler task as complete.

This function can be run manually using the `Update Timed Tags` action but can also be scheduled to run at regular intervals using external tools e.g. Keyboard Maestro.

## getProj

This function creates the folder and project used to store the 'scheduler' tasks, if they do not already exist.

It then returns the project object.

## checkPlace

This function, given a Google Places Place ID, tag and Google Places API Key, checks Google Maps to see if the place in question is currently open, and updates the status of the tag accordingly.

It is not currently used by this plugin but has been left here so that others may make use of it should they desire.