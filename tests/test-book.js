// (c) BaseCase 2016


/**
 * The global `testBook` function runs a series of UI tests on a `Book` widget
 * initialized with the specified `frame`.
 */
window.testBook = function(frame) {
  
  return startTest('Test character book', frame, function(test) {

    var wait = test.wait;
    var describe = test.describe;
    var assertCount = test.assertCount;
    var assertHasText = test.assertHasText;
    var assertHasValue = test.assertHasValue;
    var setElementValue = test.setElementValue;
    var clickElement = test.clickElement;

    describe('Reset frame', function() {
      frame.empty();
    });

    describe('No characters loaded yet', function() {
      assertCount('.list .name', 0);
    });

    describe('Widget loads with no errors', function() {
      var store = Store.create();
      Book.init(frame, store);
    });

    wait(1500).describe('All characters loaded in list', function() {
      assertCount('.list .item', 10);
      assertHasText('.list .item:first-child .name', 'BB-8');
      assertHasText('.list .item:last-child .name', 'Yoda');
    });

    describe('Click character "Chewbacca" in list', function() {
      clickElement('.list .name:contains("Chewbacca")');
    });

    wait(1000).describe('"Chewbacca" loaded in details', function() {
      assertHasText('.details .name', 'Chewbacca');
      assertHasText('.details .species', 'Wookie');
    });

    describe('Click character "Darth Sidious" in list', function() {
      clickElement('.list .name:contains("Darth Sidious")');
    });

    wait(1000).describe('"Darth Sidious" loaded in details', function() {
      assertHasText('.details .name', 'Darth Sidious');
      assertHasText('.details .species', 'Human');
    });

    describe('Click edit button', function() {
      clickElement('.edit');
    });

    describe('"Darth Sidious" loaded in editor', function() {
      assertHasValue('.editor [name=name]', 'Darth Sidious');
      assertHasValue('.editor [name=species]', 'Human');
    });

    describe('Change name to "Emperor Palpatine"', function() {
      setElementValue('.editor [name=name]', 'Emperor Palpatine');
    });

    describe('Click save button', function() {
      clickElement('.save');
    });

    wait(1000).describe('Changes saved successfully', function() {
      assertHasText('.details .name', 'Emperor Palpatine');
      assertHasText('.details .species', 'Human');
      assertHasText('.list .item:eq(5) .name', 'Emperor Palpatine');
    });

    describe('Click character "R2-D2" in list', function() {
      clickElement('.list .name:contains("R2-D2")');
    });

    wait(1000).describe('Click edit button', function() {
      clickElement('.edit');
    });

    wait(1000).describe('"R2-D2" loaded in editor', function() {
      assertHasValue('.editor [name=name]', 'R2-D2');
      assertHasValue('.editor [name=species]', 'Droid');
    });

    describe('Change species to "Trash Can"', function() {
      setElementValue('.editor [name=species]', 'Trash Can');
      assertHasValue('.editor [name=species]', 'Trash Can');
    });

    describe('Click cancel button', function() {
      clickElement('.cancel');
    });

    wait(1000).describe('"R2-D2" is unchanged', function() {
      assertHasText('.details .name', 'R2-D2');
      assertHasText('.details .species', 'Droid');
      assertHasText('.list .item:eq(8) .name', 'R2-D2');
      assertHasText('.list .item:eq(8) .species', 'Droid');
    });

    describe('Click character "Darth Vader" in list', function() {
      clickElement('.list .name:contains("Darth Vader")');
    });

    wait(1000).describe('Click edit button', function() {
      clickElement('.edit');
    });

    wait(1000).describe('"Darth Vader" loaded in editor', function() {
      assertHasValue('.editor [name=name]', 'Darth Vader');
      assertHasValue('.editor [name=species]', 'Cyborg');
    });

    wait(1000).describe('Make edits to "Darth Vader"', function() {
      setElementValue('.editor [name=name]', 'Anakin Skywalker');
      setElementValue('.editor [name=species]', 'Human');
    });

    wait(1000).describe('Click on "Luke Skywalker"', function() {
      clickElement('.list .name:contains("Luke Skywalker")');
    });

    wait(1000).describe('"Luke Skywalker" loaded in details', function() {
      assertHasText('.details .name', 'Luke Skywalker');
      assertHasText('.details .species', 'Human');
    });

    describe('"Darth Vader" is unchanged', function() {
      assertHasText('.list .item:eq(4) .name', 'Darth Vader');
      assertHasText('.list .item:eq(4) .species', 'Cyborg');
    });

    describe('Click edit button', function() {
      clickElement('.edit');
    });

    wait(1000).describe('Make edits to "Luke Skywalker"', function() {
      setElementValue('.editor [name=species]', 'Cyborg');
    });

    describe('Click save button', function() {
      clickElement('.save');
    });

    wait(1000).describe('Changes saved successfully', function() {
      assertHasText('.details .name', 'Luke Skywalker');
      assertHasText('.details .species', 'Cyborg');
      assertHasText('.list .item:eq(7) .name', 'Luke Skywalker');
      assertHasText('.list .item:eq(7) .species', 'Cyborg');
    });

    describe('Click on "Darth Bane"', function() {
      clickElement('.list .name:contains("Darth Bane")');
    });

    wait(1000).describe('Click on "BB-8"', function() {
      clickElement('.list .name:contains("BB-8")');
    });

    wait(2000).describe('"BB-8" loaded in details', function() {
      assertHasText('.details .name', 'BB-8');
      assertHasText('.details .species', 'Droid');
    });

    describe('Click on "Yoda"', function() {
      clickElement('.list .name:contains("Yoda")');
    });

    wait(1000).describe('"Yoda" loaded in details', function() {
      assertHasText('.details .name', 'Yoda');
      assertHasText('.details .species', 'Triclorophite');
    });

    describe('Click edit button', function() {
      clickElement('.edit');
    });

    wait(1000).describe('Make edits to "Yoda"', function() {
      setElementValue('.editor [name=description]', '“Strong with the force you are. Well you have done.”');
    });

    describe('Click save button', function() {
      clickElement('.save');
    });

    wait(1000).describe('Changes saved successfully', function() {
      assertHasText('.details .name', 'Yoda');
      assertHasText('.details .species', 'Triclorophite');
      assertHasText('.details .description', '“Strong with the force you are. Well you have done.”');
    });

  });

}
