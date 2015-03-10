import Ember from 'ember';
import ConstraintResult from 'sudoku/constraints/result';

export default Ember.Object.extend({

  validate: function(board) {
    var results = board.get('constraints').map(function(constraint) {
      return constraint.validate();
    });

    return ConstraintResult.create({
      valid: results.every(function(result) {
        return result.get('valid');
      }),
      invalidCells: results
        // here we have to reduce result object to concatenated invalidCells array
        .reduce(function(reduce, result) {
          return reduce.concat(result.get('invalidCells'));
        }, [])
        // here we have to reduce duplicated objects
        .reduce(function(reduce, cell) {
          if (undefined === reduce.find(function(uniqCell) {
            return uniqCell.isSame(cell);
          })) {
            reduce.addObject(cell);
          }

          return reduce;
        }, [])
    });
  }

});
