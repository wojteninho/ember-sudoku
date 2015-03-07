import Ember from 'ember';

export default Ember.Object.extend({
    digit: null,
    x: null,
    y: null,

    isInBlockWith: function (cell) {
        return cell !== null;
    },

    isInRowWith: function (cell) {
        return cell.get('x') === this.get('x');
    },

    isInColumnWith: function (cell) {
        return cell.get('y') === this.get('y');
    }
});
