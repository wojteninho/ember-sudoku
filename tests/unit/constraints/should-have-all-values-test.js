/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describe,
  it
} from 'mocha';
import ShouldHaveAllValuesConstraint from 'sudoku/constraints/should-have-all-values';
import Cell from 'sudoku/models/cell';

describe('ShouldHaveAllValuesConstraint', function() {
  it('ShouldHaveAllValuesConstraint.validate() fails for nulls', function() {
    var constraint = ShouldHaveAllValuesConstraint.create({
      cells: [
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null})
      ]
    });

    expect(constraint.validate()).to.be.false;
  });

  it('ShouldHaveAllValuesConstraint.validate() fails for duplicated values', function() {
    var constraint = ShouldHaveAllValuesConstraint.create({
      cells: [
        Cell.create({number: 1}),
        Cell.create({number: 1}),
        Cell.create({number: 1}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null})
      ]
    });

    expect(constraint.validate()).to.be.false;
  });

  it('ShouldHaveAllValuesConstraint.validate() fails for non all values', function() {
    var constraint = ShouldHaveAllValuesConstraint.create({
      cells: [
        Cell.create({number: 1}),
        Cell.create({number: 2}),
        Cell.create({number: 3}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null})
      ]
    });

    expect(constraint.validate()).to.be.false;
  });

  it('ShouldHaveAllValuesConstraint.validate() pass for unique all values', function() {
    var constraint = ShouldHaveAllValuesConstraint.create({
      cells: [
        Cell.create({number: 1}),
        Cell.create({number: 2}),
        Cell.create({number: 3}),
        Cell.create({number: 4}),
        Cell.create({number: 5}),
        Cell.create({number: 6}),
        Cell.create({number: 7}),
        Cell.create({number: 8}),
        Cell.create({number: 9})
      ]
    });

    expect(constraint.validate()).to.be.true;
  });
});
