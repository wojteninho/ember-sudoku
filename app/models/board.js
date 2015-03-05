import Ember from 'ember';
import Cell from '../models/cell';

export default Ember.Object.extend({
    cells: null,

    init: function () {
        this.cells = Ember.A([]);

        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 9; y++) {
                this.cells.addObject(Cell.create({
                    x: x,
                    y: y
                }));
            }
        }
    },

    blockFor: function (relativeCell) {
        return this.get('cells').filter(function (cell) {
            return cell.isInBlockWith(relativeCell);
        });
    },

    rowFor: function (relativeCell) {
        return this.get('cells').filter(function (cell) {
            return cell.isInRowWith(relativeCell);
        });
    },

    columnFor: function (relativeCell) {
        return this.get('cells').filter(function (cell) {
            return cell.isInColumnWith(relativeCell);
        });
    }
});
