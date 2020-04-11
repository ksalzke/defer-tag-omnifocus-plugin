# About

This is an Omni Automation solitary plug-in for OmniFocus that allows the user to 'defer' all of the tasks tagged with a tag. Further details are provided below.

_Please note that Omni Automation for OmniFocus is still in development and details are subject to change before it officially ships. If you have questions, please refer to [Omni's Slack #automation channel](https://www.omnigroup.com/slack/)._

_In addition, please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from a random amateur on the internet!_

## Known issues

None so far! 🤞

# Installation & Set-Up

(For instructions on getting started with Omni Automation, see [here](https://kaitlinsalzke.com/how-to/how-to-add-a-omnijs-plug-in-to-omnifocus-and-assign-a-keyboard-shortcut/).)

1. Click on the green `Clone or download` button above to download a `.zip` file of the file in this GitHub repository.
2. Unzip the downloaded file.
3. Move the `.omnijs` file to your OmniFocus plug-in library folder.

# Actions

## Defer Tag

This action shows a form prompting the user to select a tag and enter a defer date. 

Then, for each task with the selected tag, it checks the defer date and:
1. If the existing defer date is after the entered defer date, no change is made.
2. Otherwise, the task's defer date is set to the entered date.