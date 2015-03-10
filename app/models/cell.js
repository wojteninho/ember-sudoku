import Ember from 'ember';

export default Ember.Object.extend({

  number: null,
  x: null,
  y: null,
  isActive: false,
  isValid: true,

  isSame: function(cell) {
    return cell.get('x') === this.get('x') && cell.get('y') === this.get('y');
  },

  isInRowWith: function(cell) {
    return cell.get('x') === this.get('x');
  },

  isInColumnWith: function(cell) {
    return cell.get('y') === this.get('y');
  }

});
