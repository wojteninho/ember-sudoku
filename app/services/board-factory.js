import Ember from 'ember';
import Board from 'sudoku/models/board';
import CannotHaveDuplicatedValuesConstraint from 'sudoku/constraints/cannot-have-duplicated-values';
import ShouldHaveAllValuesConstraint from 'sudoku/constraints/should-have-all-values';

export default Ember.Object.extend({

  createBoard: function() {
    return this.applyConstraints(Board.create());
  },

  applyConstraints: function(board) {
    var applyConstraintsForCells = function(cells) {
      board.get('constraints').pushObjects([
        CannotHaveDuplicatedValuesConstraint.create({cells: cells}),
        ShouldHaveAllValuesConstraint.create({cells: cells})
      ]);
    };

    board.get('blocks').forEach(function(block) {
      applyConstraintsForCells(block.get('cells'));
    });

    board.get('rows').forEach(function(row) {
      applyConstraintsForCells(row);
    });

    board.get('columns').forEach(function(column) {
      applyConstraintsForCells(column);
    });

    return board;
  },

  initialize: function(board) {
    return board;
  }

});
