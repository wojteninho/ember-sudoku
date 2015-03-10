import Ember from 'ember';

var arrowCharCodes = [
  37, // left arrow
  38, // up arrow
  39, // right arrow
  40  // down arrow
];

var deleteCharCodes = [
  8, // backspace
  46 // delete
];

var numberCharCodes = [
  49, // 1
  50, // 2
  51, // 3
  52, // 4
  53, // 5
  54, // 6
  55, // 7
  56, // 8
  57  // 9
];

export default Ember.View.extend({

  templateName: 'cell',
  classNameBindings: [':cell', 'isActive:active', 'isValid::invalid', 'isEnabled::disabled'],

  isActive: function() {
    return this.get('cell.isActive');
  }.property('cell.isActive'),

  isValid: function() {
    return this.get('cell.isValid');
  }.property('cell.isValid'),

  isEnabled: function() {
    return this.get('cell.isEnabled');
  }.property('cell.isEnabled'),

  becomeFocused: function() {
    this.$().attr({ tabindex: 1 });
    this.$().focus();
  }.observes('cell.isActive'),

  eventManager: Ember.Object.create({
    mouseEnter: function(event, view) {
      view.get('controller').send('mouseEnter', view.get('cell'));
    },

    mouseLeave: function(event, view) {
      view.get('controller').send('mouseLeave', view.get('cell'));
    },

    click: function(event, view) {
      view.get('controller').send('click', view.get('cell'));
    },

    keyDown: function(event, view) {
      if (arrowCharCodes.contains(event.which)) {
        event.preventDefault();
        view.get('controller').send('arrowPress', view.get('cell'), event);
      }

      if (deleteCharCodes.contains(event.which)) {
        event.preventDefault();
        view.get('controller').send('deletePress', view.get('cell'));
      }
    },

    keyPress: function(event, view) {
      if (numberCharCodes.contains(event.which)) {
        view.get('controller').send('numberPress', view.get('cell'), String.fromCharCode(event.which));
      }
    }
  })

});
