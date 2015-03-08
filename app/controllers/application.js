import Ember from 'ember';

var ARROWS_MAP = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

export default Ember.Controller.extend({

  board: null,

  init: function() {
    this._super();
    this.board = this.get('boardFactoryService').createBoard();

    console.log(this.board);
  },

  actions: {
    mouseEnter: function(cell) {
//      this.get('board').blockCellsFor(cell).setEach('isActive', true);
    },

    mouseLeave: function(cell) {
//      this.get('board').blockCellsFor(cell).setEach('isActive', false);
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
    this.get('board.cells').setEach('isActive', false);
    cell.set('isActive', true);
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
  }

});
