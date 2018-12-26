import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import { ALGEBRAIC_COLUMN_NAMES, ALGEBRAIC_ROW_NAMES } from './constants';
import { getPieceCode, invertString, isWhitePerspective } from './utils';
import Button from './components/button';
import NotationBar from './components/notation-bar';

// const sampleFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// function fenInterpreter(fen) {
//    const array = fen.split('');
//    const position = array[0];
//    const turn = array[1];
//    const castles = array[2];
//    const enPassant = array[3];
//    const halfMoveCounter = array[4]; // Since the last pawn move - helps to determine if it is draw consequence of the fifty moves rule
//    const fullMoveConuter = array[5];
// }

function ChessBoard(props) {
   const { fen, marks, perspective } = props;
   const [localPerspective, setLocalPerspective] = useState(perspective);
   const viewAsWhite = isWhitePerspective(localPerspective);
   const uiFen = viewAsWhite ? fen : invertString(fen);
   const rows = uiFen.split('/');
   console.log(marks);

   return (
      <Fragment>
         <Button
            onClick={() => {
               setLocalPerspective(viewAsWhite ? 'b' : 'w');
            }}
         >
            {'Rotate'}
         </Button>

         <div
            style={{
               height: 300,
               width: 300,
               padding: (300 / 100) * 5,
               backgroundColor: '#582006',
               position: 'relative',
               borderRadius: 10
            }}
         >
            <NotationBar
               anchor={(300 / 100) * 5}
               direction="v"
               list={ALGEBRAIC_ROW_NAMES}
               perspective={localPerspective}
            />
            <NotationBar
               anchor={(300 / 100) * 5}
               direction="h"
               list={ALGEBRAIC_COLUMN_NAMES}
               perspective={localPerspective}
            />

            <div
               style={{
                  height: '100%',
                  width: '100%'
               }}
            >
               {rows.map((row, i) => {
                  const cells = row
                     .split('')
                     .reduce(
                        (total, value) =>
                           total +
                           (Number.isInteger(Number(value)) ? '0'.repeat(Number(value)) : value),
                        ''
                     )
                     .split('');
                  return (
                     <div
                        style={{
                           display: 'flex',
                           height: '12.5%'
                        }}
                     >
                        {cells.map((cell, j) => {
                           const isWhite = (i + j) % 2 === 0;
                           return (
                              <div
                                 style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: isWhite ? '#EBECCE' : '#6C8D51'
                                 }}
                              >
                                 <span
                                    style={{
                                       cursor: 'pointer',
                                       fontSize: '200%',
                                       userSelect: 'none'
                                    }}
                                 >
                                    {getPieceCode(cell)}
                                 </span>
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </div>
      </Fragment>
   );
}

ChessBoard.propTypes = {
   fen: PropTypes.string,
   marks: PropTypes.arrayOf(
      PropTypes.shape({
         cell: PropTypes.string,
         color: PropTypes.string
      })
   ),
   // move: PropTypes.func,
   perspective: PropTypes.oneOf('w', 'b')
};
ChessBoard.defaultProps = {
   fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
   marks: [],
   // move() {}, // pass move
   perspective: 'w'
};

export default ChessBoard;
