import Ember from 'ember';
import ConstraintResult from 'sudoku/constraints/result';

export default Ember.Object.extend({

  cells: null,

  validate: function() {
    var compactValues = this.get('cells').map(function(cell) {
      return cell.get('number');
    }).compact();

    var compactCells = this.get('cells').filter(function(cell) {
      return compactValues.contains(cell.get('number'));
    });

    var isDuplicate = function(cell) {
      var sameValueCells = compactCells.filter(function(innerCell) {
        return cell.get('number') === innerCell.get('number');
      });

      return sameValueCells.length > 1;
    };

    var duplicates = this.get('cells').filter(isDuplicate);

    return ConstraintResult.create({
      valid: 0 === duplicates.length,
      invalidCells: duplicates
    });
  }
  
});