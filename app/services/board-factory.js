import Ember from 'ember';
import Board from 'sudoku/models/board';


export default Ember.Object.extend({

  createBoard: function() {
    var board = Board.create();

    return board;
  },

  applyConstraints: function(board) {
    return board;
  },

  initialize: function(board) {
    return board;
  }

});
