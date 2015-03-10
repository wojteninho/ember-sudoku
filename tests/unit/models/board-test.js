/* jshint expr:true */
import {
  assert,
    expect
} from 'chai';
import {
  describe,
  it
} from 'mocha';
import Board from 'sudoku/models/board';
import Cell from 'sudoku/models/cell';

describe('Board', function() {
  it('Board.create() returns board with cells & blocks', function() {
    var board = Board.create();

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

  it('Board.blockCellsFor() returns array with correct cells for valid relative cell', function() {
    var board = Board.create();
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
      expect(blockCells.length).to.be.equal(testCase.blockCells.length).and.to.be.equal(9);

      blockCells.forEach(function(blockCell) {
        expect(
          testCase.blockCells.find(function(testCaseBlockCell) {
            return testCaseBlockCell.isSame(blockCell);
          })
        ).to.be.ok;
      });
    });
  });

  it('Board.rows() returns array', function() {
    var rows = Board.create().get('rows');

    assert.isArray(rows);
    expect(rows.length).to.be.equal(9);

    rows.forEach(function(row) {
      assert.isArray(row);
      expect(row.length).to.be.equal(9);
    });
  });

  it('Board.columns() returns array', function() {
    var columns = Board.create().get('columns');

    assert.isArray(columns);
    expect(columns.length).to.be.equal(9);

    columns.forEach(function(column) {
      assert.isArray(column);
      expect(column.length).to.be.equal(9);
    });
  });

  it('Board.blockCellsFor() returns empty array for invalid relative cell', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 100,
      y: 100
    });
    var row = board.rowCellsFor(relativeCell);

    assert.isArray(row);
    expect(row.length).to.be.equal(0);
  });

  it('Board.rowCellsFor() returns array with correct cells for valid relative cell', function() {
    var board = Board.create();
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

  it('Board.rowCellsFor() returns empty array for invalid relative cell', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 100,
      y: 100
    });
    var row = board.rowCellsFor(relativeCell);

    assert.isArray(row);
    expect(row.length).to.be.equal(0);
  });

  it('Board.columnCellsFor() for valid relative cell', function() {
    var board = Board.create();
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

  it('Board.columnCellsFor() for invalid relative cell', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 100,
      y: 100
    });
    var row = board.columnCellsFor(relativeCell);

    assert.isArray(row);
    expect(row.length).to.be.equal(0);
  });

  it('Board.cellLeftFor() valid case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 4,
      y: 4
    });
    var cell = board.cellLeftFor(relativeCell);

    expect(cell).to.be.ok;
    expect(cell.x).to.be.equal(relativeCell.x);
    expect(cell.y).to.be.equal(relativeCell.y - 1);
  });

  it('Board.cellLeftFor() edge case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 0,
      y: 0
    });
    var cell = board.cellLeftFor(relativeCell);

    assert.isUndefined(cell);
  });

  it('Board.cellUpFor() valid case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 4,
      y: 4
    });
    var cell = board.cellUpFor(relativeCell);

    expect(cell).to.be.ok;
    expect(cell.x).to.be.equal(relativeCell.x - 1);
    expect(cell.y).to.be.equal(relativeCell.y);
  });

  it('Board.cellUpFor() edge case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 0,
      y: 0
    });
    var cell = board.cellUpFor(relativeCell);

    assert.isUndefined(cell);
  });

  it('Board.cellRightFor() valid case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 4,
      y: 4
    });
    var cell = board.cellRightFor(relativeCell);

    expect(cell).to.be.ok;
    expect(cell.x).to.be.equal(relativeCell.x);
    expect(cell.y).to.be.equal(relativeCell.y + 1);
  });

  it('Board.cellRightFor() edge case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 0,
      y: 8
    });
    var cell = board.cellRightFor(relativeCell);

    assert.isUndefined(cell);
  });

  it('Board.cellDownFor() valid case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 4,
      y: 4
    });
    var cell = board.cellDownFor(relativeCell);

    expect(cell).to.be.ok;
    expect(cell.x).to.be.equal(relativeCell.x + 1);
    expect(cell.y).to.be.equal(relativeCell.y);
  });

  it('Board.cellDownFor() edge case', function() {
    var board = Board.create();
    var relativeCell = Cell.create({
      x: 8,
      y: 8
    });
    var cell = board.cellDownFor(relativeCell);

    assert.isUndefined(cell);
  });

  it('Board.cellAt() valid case', function() {
    var board = Board.create();
    var x = 4;
    var y = 4;
    var cell = board.cellAt(x, y);

    expect(cell).to.be.ok;
    expect(cell.x).to.be.equal(x);
    expect(cell.y).to.be.equal(y);
  });

  it('Board.cellAt() edge case', function() {
    var board = Board.create();
    var cell = board.cellAt(100, 100);

    assert.isUndefined(cell);
  });
});
