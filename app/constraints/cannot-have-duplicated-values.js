import Ember from 'ember';

export default Ember.Object.extend({

  cells: null,

  validate: function() {
    var values = this
      .get('cells')
      .map(function(cell) {
        return cell.get('number');
      })
      .compact();

    return values.length === values.uniq().length;
  }
  
});