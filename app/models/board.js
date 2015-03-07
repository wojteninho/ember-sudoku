import Ember from 'ember';
import Cell from 'sudoku/models/cell';
import Block from 'sudoku/models/block';

export default Ember.Object.extend({

  cells: null,
  blocks: null,

  init: function () {
    var board = this;
    var x;
    var y;

    board._super();
    board.set('cells', []);
    board.set('blocks', []);

    for (x = 0; x < 9; x++) {
      for (y = 0; y < 9; y++) {
        board.get('cells').addObject(
          Cell.create({
            x: x,
            y: y
          })
        );
      }
    }

    var cellsForBlockFilter = function(cell) {
      return cell.get('x') >= x1 && cell.get('x') <= x2 &&
             cell.get('y') >= y1 && cell.get('y') <= y2;
    };

    for (x = 0; x < 9; x+=3) {
      for (y = 0; y < 9; y+=3) {
        var x1 = x;
        var x2 = x+2;
        var y1 = y;
        var y2 = y+2;

        this.get('blocks').addObject(
          Block.create({
            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2,
            cells: board.get('cells').filter(cellsForBlockFilter)
          })
        );
      }
    }
  },

  blockCellsFor: function (relativeCell) {
    var block = this.get('blocks').find(function (block) {
      return block.contains(relativeCell);
    });

    if (undefined === block) {
      return [];
    }

    return block.cells;
  },

  rowCellsFor: function (relativeCell) {
    return this.get('cells').filter(function (cell) {
      return cell.isInRowWith(relativeCell);
    });
  },

  columnCellsFor: function (relativeCell) {
    return this.get('cells').filter(function (cell) {
      return cell.isInColumnWith(relativeCell);
    });
  }

});
