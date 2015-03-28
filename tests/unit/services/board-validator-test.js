/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'service:board-validator',
  'BoardValidatorService',
  {
    needs: ['service:board-factory']
  },
  function() {

    var assertCell = function(testedCell, board) {
      var cell = board.cellAt(testedCell.get('x'), testedCell.get('y'));

      expect(cell).to.be.ok;
      expect(cell.get('number')).to.be.eq(testedCell.get('number'));
    };

    var createBoardFactoryService = function(context, cells = []) {
      var boardFactoryService = context.container.lookup('service:board-factory');

      boardFactoryService.set('boardInitializerService', {
        initialize: function(board) {
          cells.forEach(function(cell) {
            board.cellAt(cell.x, cell.y).set('number', cell.number);
          });

          board.get('cells').forEach(function(cell) {
            if (null === cell.get('number')) {
              cell.set('isEnabled', true);
            }
          });

          return board;
        }
      });

      return boardFactoryService;
    };

    it('exists', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();

      assert.isObject(validator);
    });

    it('BoardValidatorService.validate() fails when 2 cells in row are duplicated', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(0, 8)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in column are duplicated', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(8, 0)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in block are duplicated', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(0, 1)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in row & 2 cells in column & 2 cells in block are duplicated', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        /**
         * row: board.cellAt(0, 0) + board.cellAt(0, 8)
         * column: board.cellAt(0, 0) + board.cellAt(8, 0)
         * block: board.cellAt(0, 0) + board.cellAt(1, 1)
         */
        board.cellAt(0, 0),
        board.cellAt(0, 8),
        board.cellAt(8, 0),
        board.cellAt(1, 1)
      ];

      cells.setEach('number', 1);
      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(4);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in row & 2 cells in column & 2 cells in block are duplicated', function() {
      var boardFactoryService = createBoardFactoryService(this);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        /**
         * row: board.cellAt(0, 0) + board.cellAt(0, 8)
         * column: board.cellAt(0, 0) + board.cellAt(8, 0)
         * block: board.cellAt(0, 0) + board.cellAt(1, 1)
         */
        board.cellAt(0, 0),
        board.cellAt(0, 8),
        board.cellAt(8, 0),
        board.cellAt(1, 1)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(4);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when board is initiliazed and inserted cell conflicts with preinserted ones in block', function() {
      var boardFactoryService = createBoardFactoryService(this, [
        /**
         * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
         * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
         * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
         *
         * [ ][ ][ ]  [5][1][3]  [ ][ ][ ]
         * [1][ ][ ]  [ ][ ][8]  [ ][ ][ ]
         * [ ][ ][ ]  [9][7][ ]  [ ][ ][ ]
         *
         * [ ][ ][ ]  [1][ ][ ]  [ ][ ][ ]
         * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
         * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
         */
                                 {x: 3, y: 3, number: 5}, {x: 3, y: 4, number: 1}, {x: 3, y: 5, number: 3},
        {x: 4, y: 0, number: 1}, {x: 4, y: 3, number: null}, {x: 4, y: 4, number: null}, {x: 4, y: 5, number: 8},
                                 {x: 5, y: 3, number: 9}, {x: 5, y: 4, number: 7}, {x: 5, y: 5, number: null},
                                 {x: 6, y: 3, number: 1}
      ]);
      var board = boardFactoryService.createBoard();
      var validator = this.subject();

      /**
       * test case:
       *
       * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
       * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
       * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
       *
       * [ ][ ][ ]  [5][1][3]  [ ][ ][ ]
       * [1][ ][ ]  [1][ ][8]  [ ][ ][ ]
       * [ ][ ][ ]  [9][7][ ]  [ ][ ][ ]
       *
       * [ ][ ][ ]  [1][ ][ ]  [ ][ ][ ]
       * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
       * [ ][ ][ ]  [ ][ ][ ]  [ ][ ][ ]
       */
      board.cellAt(4, 3).set('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(4);

      result.get('invalidCells').forEach(function(cell) {
        assertCell(cell, board);
      });
    });
  }
);
