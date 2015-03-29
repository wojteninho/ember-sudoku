import Ember from 'ember';

var ARROWS_MAP = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

export default Ember.Controller.extend({

  board: null,
  isStarted: false,
  isPaused: false,
  isEnded: false,

  actions: {
    gameStart: function() {
      this.set('board', this.get('boardFactoryService').createBoard());
      this.set('isStarted', true);
      this.set('isPaused', false);
      this.set('isEnded', false);
    },

    gamePause: function() {
      this.set('isPaused', true);
    },

    gameResume: function() {
      this.set('isPaused', false);
    },

    gameEnd: function() {
      this.set('isEnded', true);
    },

    click: function(cell) {
      this.activateCell(cell);
    },

    arrowPress: function(cell, event) {
      this.moveCell(cell, event.which);
    },

    deletePress: function(cell) {
      cell.set('number', null);
    },

    numberPress: function(cell, number) {
      cell.set('number', number);
    }
  },

  activateCell: function(cell) {
    if (cell.get('isEnabled')) {
      this.get('board.cells').setEach('isActive', false);
      cell.set('isActive', true);
    }
  },

  moveCell: function(cell, direction) {
    var newActiveCell = null;

    switch (direction) {
      case ARROWS_MAP.ARROW_LEFT:
        newActiveCell = this.get('board').cellLeftFor(cell);
        break;
      case ARROWS_MAP.ARROW_UP:
        newActiveCell = this.get('board').cellUpFor(cell);
        break;
      case ARROWS_MAP.ARROW_RIGHT:
        newActiveCell = this.get('board').cellRightFor(cell);
        break;
      case ARROWS_MAP.ARROW_DOWN:
        newActiveCell = this.get('board').cellDownFor(cell);
        break;
    }

    if (undefined !== newActiveCell) {
      this.activateCell(newActiveCell);
    }
  },

  validateBoard: function() {
    var result = this.get('boardValidatorService').validate(this.get('board'));

    if (!result.get('valid')) {
      this.get('board.cells').setEach('isValid', true);
      result.get('invalidCells').forEach(function(cell) {
        cell.set('isValid', false);
      });
    }
  }.observes('board.cells.@each.number'),

  isBoardVisible: function() {
    return this.get('isStarted') && !this.get('isPaused') && !this.get('isEnded');
  }.property('isStarted', 'isPaused', 'isEnded'),

  isStartButtonVisible: function() {
    return !this.get('isStarted') || this.get('isEnded');
  }.property('isStarted', 'isEnded'),

  isPauseButtonVisible: function() {
    return this.get('isStarted') && !this.get('isPaused') && !this.get('isEnded');
  }.property('isStarted', 'isPaused', 'isEnded'),

  isResumeButtonVisible: function() {
    return this.get('isStarted') && this.get('isPaused') && !this.get('isEnded');
  }.property('isStarted', 'isPaused', 'isEnded'),

  isEndButtonVisible: function() {
    return this.get('isStarted') && !this.get('isEnded');
  }.property('isStarted', 'isEnded')

});
