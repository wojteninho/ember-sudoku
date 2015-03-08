/* jshint expr:true */
import {
  assert,
    expect
} from 'chai';
import {
  describe,
  it
} from 'mocha';
import Cell from 'sudoku/models/cell';

describe('Cell', function() {
  it('Cell.isSame() with valid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 0,
      y: 0
    });

    expect(cell.isSame(relativeCell)).to.be.true;
  });

  it('Cell.isSame() with invalid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 1,
      y: 1
    });

    expect(cell.isSame(relativeCell)).to.be.false;
  });

  it('Cell.isInRowWith() with valid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 0,
      y: 1
    });

    expect(cell.isInRowWith(relativeCell)).to.be.true;
  });

  it('Cell.isInRowWith() with invalid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 1,
      y: 1
    });

    expect(cell.isInRowWith(relativeCell)).to.be.false;
  });

  it('Cell.isInColumnWith() with valid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 1,
      y: 0
    });

    expect(cell.isInColumnWith(relativeCell)).to.be.true;
  });

  it('Cell.isInColumnWith() with invalid cell', function() {
    var cell = Cell.create({
      x: 0,
      y: 0
    });

    var relativeCell = Cell.create({
      x: 1,
      y: 1
    });

    expect(cell.isInColumnWith(relativeCell)).to.be.false;
  });
});
