import Ember from 'ember';

export default Ember.Object.extend({

  x1: null,
  x2: null,

  y1: null,
  y2: null,

  cells: null,

  contains: function(cell) {
    return this.get('cells').find(function(blockCell) {
      return blockCell.isSame(cell);
    });
  }

});
