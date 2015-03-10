import Ember from 'ember';

export default Ember.Object.extend({

  initialize: function(board) {
    var numbers = [
      [7, 1, 8, 5, 4, 3, 6, 2, 9],
      [6, 9, 3, 2, 1, 8, 5, 7, 4],
      [5, 4, 2, 9, 7, 6, 3, 1, 8],
      [4, 3, 5, 7, 9, 1, 8, 6, 2],
      [1, 6, 7, 8, 3, 2, 4, 9, 5],
      [2, 8, 9, 4, 6, 5, 7, 3, 1],
      [8, 5, 1, 6, 2, 7, 9, 4, 3],
      [9, 2, 6, 3, 5, 4, 1, 8, 7],
      [3, 7, 4, 1, 8, 9, 2, 5, 6]
    ];

    numbers.forEach(function(row, x) {
      row.forEach(function(number, y) {
        board.cellAt(x, y).set('number', number);
      });
    });

    var getRandom = function(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    };

    var getRandomCell = function(board) {
      return board.cellAt(getRandom(0, 8), getRandom(0, 8));
    };

    var cellsToDisable = getRandom(40, 60);
    var cell;
    while(cellsToDisable > 0) {
      cell = getRandomCell(board);

      if (null !== cell.get('number')) {
        cell.set('number', null);
        cellsToDisable--;
      }
    }

    board.get('cells').forEach(function(cell) {
      if (null === cell.get('number')) {
        cell.set('isEnabled', true);
      }
    });

    return board;
  }

});
