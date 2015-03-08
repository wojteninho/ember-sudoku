import Ember from 'ember';

export default Ember.Object.extend({

  allValues: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  cells: null,

  validate: function() {
    var values = this
      .get('cells')
      .map(function(cell) {
        return cell.get('number');
      })
      .compact();

    return this.get('allValues').every(function(value) {
      return values.contains(value);
    });
  }

});