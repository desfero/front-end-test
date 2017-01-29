
# BaseCase Front-End Developer Test


## Introduction

As a new contributer to the 'Star Wars Database', your task is to design and implement a *Character Book*
widget using the provided *Character Store* API.


## Character Book Widget

Your 'Character Book' widget is intended to be a self-contained and reusable UI component. It should be a
classic [master/details][1] side-by-side interface for both browsing and editing Star Wars characters. It
should be both functional and polished. The code and design of the widget will be judged in equal measure.

[1]: https://msdn.microsoft.com/en-us/windows/uwp/controls-and-patterns/master-details


### Minimum Requirements

The widget must at the minimum support the following operations:

1. Upon initialization, the widget must display a list of all characters. Each list item must include
   the character name and species. List items should be sorted by their name.
2. Clicking a character must load the character details. The details must include at least the
   name, species, description and picture of the selected character.
3. There must be an edit button which enables editing the currently selected character. Editable
   fields must include at least the character name, species, and description.
4. During edit mode, there must be a cancel button and a save button. Clicking the cancel button
   must exit edit mode with no changes applied. Clicking the save button must exit edit mode with
   all changes applied.

The widget must be designed in a modern "business casual" style, which would be suitable for inclusion
in an enterprise application.

### Development Guidelines

The `index.html` file is the entry point for evalution of this test. There are no build steps, the file can
be opened directly in a browser (without a web server), and no internet connection is required.

Empty `book/book.js` and `book/book.css` files have been created and are loaded automatically. These are the
only two files that may be modified.

The widget should offer a single global entry point for initialization and need not return any instance object.

```
//
// Initialize a Character Book in the DOM element `frame` using the `Store` instance `store`.
//
Book.init(frame, store);
```

Apart from the arguments given in the `init` function, the widget should only assume the existence of the
included external dependencies and should not load any other libraries or frameworks. You may assume that
the `frame` element is empty, positioned, and statically sized.


### External Dependencies

The following libraries are loaded automatically and may be used freely. No other external code or assets
may be loaded.

* jQuery 3.0.0 (http://jquery.com/)
* Underscore 1.8.3 (http://underscorejs.org/)
* FontAwesome 4.6.3 (http://fontawesome.io/)


### Interface Testing

A suite of interface tests have been included for testing the basic functionality of the widget. These tests
rely on a specific DOM structure, but this structure has been defined as loosely as possible:

| jQuery Selector            | jQuery Operation |
| -------------------------- | ---------------- |
| .list .item                | .count()         |
| .list .item                | .click()         |
| .list .item .name          | .text()          |
| .list .item .species       | .text()          |
| .details .name             | .text()          |
| .details .species          | .text()          |
| .details .description      | .text()          |
| .edit                      | .click()         |
| .editor [name=name]        | .val()           |
| .editor [name=species]     | .val()           |
| .editor [name=description] | .val()           |
| .cancel                    | .click()         |
| .save                      | .click()         |


## Character Store API

A `Store` object is provided for listing characters and enabling CRUD operations on individual characters.
The `Store` is `Promise` based, and has built-in latency and error conditions to mock real world conditions. 


```
/**
 * Gets a list of all characters in the datastore.
 * @return {Promise<Character[], Error>}
 */
Store.prototype.getCharacters = function() { ... }

/**
 * Gets the details for the character with the given `id`.
 * @param {number} id
 * @return {Promise<CharacterDetails, Error>}
 */
Store.prototype.getCharacterDetails = function(id) { ... }

/**
 * Updates the character in the datastore with the same `id`
 * to have the other properties of the given `character` object.
 * @param {CharacterDetails} character
 * @return {Promise<undefined, Error>}
 */
Store.updateCharacter = function(character) { ... }

/**
 * Deletes the character with the given `id`.
 * @param {number} id
 * @return {Promise<undefined, Error>}
 */
Store.deleteCharacter = function(id) { ... }

/**
 * @typedef {Object} Character
 * @property {number} id The system ID of the character
 * @property {string} name The full name of the character
 * @property {string} species The species of the character
 */

/**
 * @typedef {Object} CharacterDetails
 * @property {number} id The system ID of the character
 * @property {string} name The full name of the character
 * @property {string} species The species of the character
 * @property {string} description The description of the character
 * @property {ImageURL} picture The URL of a picture of the character
 */

/**
 * A string suitable for use in an `IMG` tag as the `src` attribute. This could be an absolute
 * URL, a relative URL, or a data URL.
 * @typedef {string} ImageURL
 */
```


## Test Submission

You have 8 hours to complete the test. If you feel any part of this test is unclear or unspecified, please
resolve the issue using your best judgement. When you are ready to submit, please take the following steps:

1. Zip your entire project so that the reviewer is able to unzip and run without any additional steps.
2. Reply to the email you received to start the test with your zipped solution as an attachement.
3. In your email, please list any comments that you have concerning the test or your solution.

Your solution will be primarily judged on the following points:

* Meeting the minimum requirements as defined in this specification.
* The structure, elegance and readability of your code.
* The usability, design, and polish of your interface.
