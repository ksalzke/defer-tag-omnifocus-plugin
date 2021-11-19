# About

This is an Omni Automation plug-in bundle for OmniFocus that allows the user to 'defer' a tag and mark tags as on hold or available on a schedule.

In OmniFocus, tags can be marked as Available or On Hold manually. However, there is no built-in way to defer a tag until a certain date or to set a schedule for a specific tag’s status.

There are several scenarios where this might be useful. For example:

* Your boss or colleague is away until next week and you have a number of items to speak to them about, all tagged with the same tag. Rather than deferring each task individually, you could mark the tag as 'deferred' until they return.

* You use tags to represent locations where you might carry out errands e.g. the pharmacy, the supermarket, or the hardware store. These places are not open 24/7, so if you're looking at OmniFocus (say) late at night or on the weekend, these tasks are not available and you don't see them when you can't act on them.

* You use tags to represent times of day. For example you might have a `🗓 Business Hours` tag that is only available from 9-5pm Monday-Friday. If you don't get to a task in this time, you don't need to worry about manually deferring it until the next day.

_Please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from a random amateur on the internet!_

## Known issues

Refer to ['issues'](https://github.com/ksalzke/defer-tag-omnifocus-plugin/issues) for known issues and planned changes/enhancements.

# Installation & Set-Up

1. Download the [latest release](https://github.com/ksalzke/synced-preferences-for-omnifocus/releases/latest).
2. Unzip the downloaded file.
3. Move the `.omnifocusjs` file to your OmniFocus plug-in library folder (or open it to install).

# Usage

## '🏷 Tag Scheduling' Storage and 'Scheduler' Tasks

This plugin uses a project inside a dropped folder named (both named `🏷 Tag Scheduling`) to store its data, which is then synced using the regular OmniFocus sync method (like any other projects and tasks in the database would be). This is created automatically by the plugin when it is needed.

For the purposes of this plugin, a scheduled tag status change is represented by a 'scheduler' task inside this project with the following attributes:

* Name starts with `AVAILABLE` or `DEFERRED`. (What follows is ignored by the script; I suggest using something meaningful to you e.g. `AVAILABLE from Saturday 1pm`).

* Tag is the tag to be scheduled.

* Defer date is the time that the tag should become available or be placed on hold.

## Scheduling A Tag

There are two ways to set a schedule for a tag:

### 1. Use the 'Defer Tasks With Tag' action

This action is detailed further below.

### 2. Create 'Scheduler' tasks manually

This method is recommended for more complicated instances e.g. store opening hours which repeat on a weekly basis.

By creating tasks that meet the criteria described [above](https://github.com/ksalzke/defer-tag-omnifocus-plugin#-tag-scheduling-storage-and-scheduler-tasks) in the necessary project, you can create more complex tag scheduling. To assist with this, the plugin includes a 'Show Scheduler Project' action to quickly navigate to the project, and a 'Hide Scheduler Project' action to hide it again once you have finished any edits.

Suggestions:

* For repeating scheduler tasks ensure that `Assigned Dates` are used to maintain the same times.

* For manually created scheduler tasks you will likely want to ensure that there are no notifications set to trigger on the defer date - you probably don't want to see these!

For example:

![Sample 'Scheduler' Tasks](https://user-images.githubusercontent.com/16893787/142517601-c88ec755-d75a-4632-9467-7ab79c53e200.png)


![Sample 'Repeat' Settings](https://user-images.githubusercontent.com/16893787/142517563-98319c28-0b21-4b00-921e-577603c102e1.png)


## Updating Tag Status

When the 'Update Timed Tags' action is run, the tags are updated to be correct at the current time. Here is a sample Applescript that will do this in the background:

```
tell application "OmniFocus"
	evaluate javascript "PlugIn.find('com.KaitlinSalzke.deferTag').action('updateTimedTags').perform()"
end tell
```

This action can be run (for example) by a Keyboard Maestro macro which can be set to run on an always-on Mac at an interval chosen by you to update the tags. Between them, these provide the functionality to 'defer' or 'schedule' tags in OmniFocus automatically.

# Actions

## Defer Tasks With Tag

![Defer Tags Form](https://user-images.githubusercontent.com/16893787/142516827-45a167cd-9a88-4030-b2c9-f57bd2ccc742.png)

This action shows a form prompting the user to select one or more tags and enter a defer date. It then uses the `deferTag` function to place the tag(s) on hold and create a 'scheduler' task for the tag as described above. Using this action to defer a tag also defers all of its child tags. (So, if for example you have a 'Home' tag with subtags for rooms of your house, all of these will be deferred when the 'Home' tag is selected.

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
