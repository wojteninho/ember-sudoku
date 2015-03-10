import Ember from 'ember';

export default Ember.Object.extend({

  valid: false,
  invalidCells: null,

  init: function() {
    if (null === this.get('invalidCells')) {
      this.set('invalidCells', []);
    }
  }
  
});