# Joel's Outline Text Editor

This editor has been made to take notes using a hierarchical structure.  


## How to install / Run:

* 1 Open the AppEngCW1 directory in the command line.
* 2 Run the command.
  ```bash
  npm install
  ```
* 3 Run the command.
  ```bash
  npm start
  ```
* 4 Go to localhost:8080 in your browser.

## Features:
Key-Bindings:
You can bring up a list of all available save files by using Control-Shift-S (or Command-Shift-S on MacOS)
If you want to undo pressing the (Delete Selected Button) You can use Control-Z (or Command-z on MacOS) this will re-place the last deleted element and append it on the end of the document.

Drag & Drop:
You can drag and drop sub-headings into different headings and even into other sub-headings, you can also drop items into the 'drag here to delete' section in order to delete multiple child elements at once.

New-Heading Button:
This button calls a function that adds a new header to the bottom of the document.

New-Sub-list Button:
This button calls a function that creates a new list element within the currently selected Header or Sub-list, if nothing is selected the button will do nothing.

Delete Selected Button:
This button deletes the currently selected header or Sub-list, if nothing is selected then the button will do nothing. Also this Button does not work on elements that have children.

Save Button:
This Button opens a prompt that requests a File Name, when entered and ok is pressed it saves all elements on the page to local storage with the key being set as the input file name.

Load Button:
This Button opens a prompt that requests another File Name, if the filename input matches a key saved in local storage the corresponding save file is loaded onto the editor. Begun coding a way to select save-files from a list of all local storage keys rather than having to input the file name when loading but I didn't have time to finish the functionality.

Sort A-Z Button:
This button sorts all headers on the page into descending alphabetical order.
