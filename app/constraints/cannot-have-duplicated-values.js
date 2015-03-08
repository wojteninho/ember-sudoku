import Ember from 'ember';

export default Ember.Object.extend({

  cells: null,

  validate: function() {
    var values = this
      .get('cells')
      .map(function(cell) {
        return cell.get('number');
      })
      .without(null);

    return values.length === values.uniq().length;
  }
  
});