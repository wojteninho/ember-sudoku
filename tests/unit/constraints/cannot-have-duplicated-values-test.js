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

    var result = constraint.validate();
    assert.isObject(result);
    expect(result.get('valid')).to.be.true;
    expect(result.get('invalidCells').length).to.be.eq(0);
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

    var result = constraint.validate();
    assert.isObject(result);
    expect(result.get('valid')).to.be.true;
    expect(result.get('invalidCells').length).to.be.eq(0);
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

    var result = constraint.validate();
    assert.isObject(result);
    expect(result.get('valid')).to.be.true;
    expect(result.get('invalidCells').length).to.be.eq(0);
  });

  it('CannotHaveDuplicatedValuesConstraint.validate() fails for duplicated values & nulls', function() {
    var duplicatedNumber = 1;
    var constraint = CannotHaveDuplicatedValuesConstraint.create({
      cells: [
        Cell.create({number: duplicatedNumber}),
        Cell.create({number: duplicatedNumber}),
        Cell.create({number: duplicatedNumber}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null}),
        Cell.create({number: null})
      ]
    });

    var result = constraint.validate();
    assert.isObject(result);
    expect(result.get('valid')).to.be.false;
    expect(result.get('invalidCells').length).to.be.eq(3);
    expect(result.get('invalidCells.firstObject.number')).to.be.eq(duplicatedNumber);
  });
});
