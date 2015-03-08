/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describe,
  it
} from 'mocha';
import CannotHaveDuplicatedValuesConstraint from 'sudoku/constraints/cannot-have-duplicated-values';
import Cell from 'sudoku/models/cell';

describe('CannotHaveDuplicatedValuesConstraint', function() {
  it('CannotHaveDuplicatedValuesConstraint.validate() pass for nulls', function() {
    var constraint = CannotHaveDuplicatedValuesConstraint.create({
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

    expect(constraint.validate()).to.be.true;
  });

  it('CannotHaveDuplicatedValuesConstraint.validate() pass for non duplicated values & nulls', function() {
    var constraint = CannotHaveDuplicatedValuesConstraint.create({
      cells: [
        Cell.create({number: 1}),
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

    expect(constraint.validate()).to.be.true;
  });

  it('CannotHaveDuplicatedValuesConstraint.validate() pass for non duplicated values', function() {
    var constraint = CannotHaveDuplicatedValuesConstraint.create({
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

  it('CannotHaveDuplicatedValuesConstraint.validate() fails for duplicated values & nulls', function() {
    var constraint = CannotHaveDuplicatedValuesConstraint.create({
      cells: [
        Cell.create({number: 1}),
        Cell.create({number: 1}),
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
});
