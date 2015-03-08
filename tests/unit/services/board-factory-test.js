/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import Cell from 'sudoku/models/cell';

describeModule(
  'service:board-factory',
  'BoardFactoryService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    it('exists & have correct interface', function() {
      var factory = this.subject();

      expect(factory).to.be.ok;
      expect(factory.createBoard).to.be.function;
    });

    it('creates board with cells & blocks', function() {
      var factory = this.subject();
      var board = factory.createBoard();

      expect(board).to.be.ok;
      assert.isArray(board.cells);
      expect(board.cells.length).to.be.equal(81);

      board.cells.forEach(function (cell) {
        expect(cell).to.be.ok;
        assert.isNumber(cell.x);
        assert.isNumber(cell.y);
      });

      expect(board.blocks.length).to.be.equal(9);
    });

    it('board.blockCellsFor() returns array with correct cells for valid relative cell', function() {
      var board = this.subject().createBoard();
      var testCases = [
        {
          relativeCell: Cell.create({x: 0, y: 0}),
          blockCells: [
            Cell.create({x: 0, y: 0}), Cell.create({x: 0, y: 1}), Cell.create({x: 0, y: 2}),
            Cell.create({x: 1, y: 0}), Cell.create({x: 1, y: 1}), Cell.create({x: 1, y: 2}),
            Cell.create({x: 2, y: 0}), Cell.create({x: 2, y: 1}), Cell.create({x: 2, y: 2}),
          ]
        },
        {
          relativeCell: Cell.create({x: 2, y: 2}),
          blockCells: [
            Cell.create({x: 0, y: 0}), Cell.create({x: 0, y: 1}), Cell.create({x: 0, y: 2}),
            Cell.create({x: 1, y: 0}), Cell.create({x: 1, y: 1}), Cell.create({x: 1, y: 2}),
            Cell.create({x: 2, y: 0}), Cell.create({x: 2, y: 1}), Cell.create({x: 2, y: 2}),
          ]
        },
        {
          relativeCell: Cell.create({x: 4, y: 4}),
          blockCells: [
            Cell.create({x: 3, y: 3}), Cell.create({x: 3, y: 4}), Cell.create({x: 3, y: 5}),
            Cell.create({x: 4, y: 3}), Cell.create({x: 4, y: 4}), Cell.create({x: 4, y: 5}),
            Cell.create({x: 5, y: 3}), Cell.create({x: 5, y: 4}), Cell.create({x: 5, y: 5}),
          ]
        },
        {
          relativeCell: Cell.create({x: 6, y: 6}),
          blockCells: [
            Cell.create({x: 6, y: 6}), Cell.create({x: 6, y: 7}), Cell.create({x: 6, y: 8}),
            Cell.create({x: 7, y: 6}), Cell.create({x: 7, y: 7}), Cell.create({x: 7, y: 8}),
            Cell.create({x: 8, y: 6}), Cell.create({x: 8, y: 7}), Cell.create({x: 8, y: 8}),
          ]
        },
        {
          relativeCell: Cell.create({x: 8, y: 8}),
          blockCells: [
            Cell.create({x: 6, y: 6}), Cell.create({x: 6, y: 7}), Cell.create({x: 6, y: 8}),
            Cell.create({x: 7, y: 6}), Cell.create({x: 7, y: 7}), Cell.create({x: 7, y: 8}),
            Cell.create({x: 8, y: 6}), Cell.create({x: 8, y: 7}), Cell.create({x: 8, y: 8}),
          ]
        },
        {
          relativeCell: Cell.create({x: 0, y: 8}),
          blockCells: [
            Cell.create({x: 0, y: 6}), Cell.create({x: 0, y: 7}), Cell.create({x: 0, y: 8}),
            Cell.create({x: 1, y: 6}), Cell.create({x: 1, y: 7}), Cell.create({x: 1, y: 8}),
            Cell.create({x: 2, y: 6}), Cell.create({x: 2, y: 7}), Cell.create({x: 2, y: 8}),
          ]
        },
        {
          relativeCell: Cell.create({x: 6, y: 2}),
          blockCells: [
            Cell.create({x: 6, y: 0}), Cell.create({x: 6, y: 1}), Cell.create({x: 6, y: 2}),
            Cell.create({x: 7, y: 0}), Cell.create({x: 7, y: 1}), Cell.create({x: 7, y: 2}),
            Cell.create({x: 8, y: 0}), Cell.create({x: 8, y: 1}), Cell.create({x: 8, y: 2}),
          ]
        }
      ];

      testCases.forEach(function(testCase) {
        var blockCells = board.blockCellsFor(testCase.relativeCell);
        expect(blockCells.length).to.be.equal(testCase.blockCells.length);

        blockCells.forEach(function(blockCell) {
          expect(
            testCase.blockCells.find(function(testCaseBlockCell) {
              return testCaseBlockCell.isSame(blockCell);
            })
          ).to.be.ok;
        });
      });
    });

    it('board.blockCellsFor() returns empty array for invalid relative cell', function() {
      var board = this.subject().createBoard();
      var relativeCell = Cell.create({
        x: 100,
        y: 100
      });
      var row = board.rowCellsFor(relativeCell);

      assert.isArray(row);
      expect(row.length).to.be.equal(0);
    });

    it('board.rowCellsFor() returns array with correct cells for valid relative cell', function() {
      var board = this.subject().createBoard();
      var relativeCell = Cell.create({
        x: 0,
        y: 0
      });
      var row = board.rowCellsFor(relativeCell);

      assert.isArray(row);
      expect(row.length).to.be.equal(9);

      row.forEach(function(cell) {
        expect(cell.x).to.be.equal(relativeCell.x);
      });
    });

    it('board.rowCellsFor() returns empty array for invalid relative cell', function() {
      var board = this.subject().createBoard();
      var relativeCell = Cell.create({
        x: 100,
        y: 100
      });
      var row = board.rowCellsFor(relativeCell);

      assert.isArray(row);
      expect(row.length).to.be.equal(0);
    });

    it('board.columnCellsFor() for valid relative cell', function() {
      var board = this.subject().createBoard();
      var relativeCell = Cell.create({
        x: 8,
        y: 8
      });
      var row = board.columnCellsFor(relativeCell);

      assert.isArray(row);
      expect(row.length).to.be.equal(9);

      row.forEach(function(cell) {
        expect(cell.y).to.be.equal(relativeCell.y);
      });
    });

    it('board.columnCellsFor() for invalid relative cell', function() {
      var board = this.subject().createBoard();
      var relativeCell = Cell.create({
        x: 100,
        y: 100
      });
      var row = board.columnCellsFor(relativeCell);

      assert.isArray(row);
      expect(row.length).to.be.equal(0);
    });
  }
);
