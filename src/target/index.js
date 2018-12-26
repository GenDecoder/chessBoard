import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import { ALGEBRAIC_COLUMN_NAMES, ALGEBRAIC_ROW_NAMES } from './constants';
import { getPieceCode, invertArray, invertString } from './utils';
import Button from './components/button';

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
   const isWhitePerspective = localPerspective === 'w';

   let uiFen = fen;
   let uiAlgebraicRowNames = ALGEBRAIC_ROW_NAMES;
   let uiAlgebraicColumnNames = ALGEBRAIC_COLUMN_NAMES;

   if (!isWhitePerspective) {
      uiFen = invertString(fen);
      uiAlgebraicColumnNames = invertArray(ALGEBRAIC_COLUMN_NAMES);
      uiAlgebraicRowNames = invertArray(ALGEBRAIC_ROW_NAMES);
   }
   const rows = uiFen.split('/');
   console.log(marks);

   return (
      <Fragment>
         <Button
            onClick={() => {
               setLocalPerspective(localPerspective === 'w' ? 'b' : 'w');
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
            <div
               style={{
                  left: 0,
                  position: 'absolute',
                  top: (300 / 100) * 5,
                  bottom: (300 / 100) * 5,
                  width: (300 / 100) * 5
               }}
            >
               <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {uiAlgebraicRowNames.map(number => (
                     <div
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           display: 'flex',
                           alignItems: 'center'
                        }}
                     >
                        <span style={{ color: 'white', fontSize: '75%' }}>{number}</span>
                     </div>
                  ))}
               </div>
            </div>
            <div
               style={{
                  bottom: 0,
                  position: 'absolute',
                  right: (300 / 100) * 5,
                  left: (300 / 100) * 5,
                  height: (300 / 100) * 5
               }}
            >
               <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                  {uiAlgebraicColumnNames.map(letter => (
                     <div
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           display: 'flex',
                           alignItems: 'center'
                        }}
                     >
                        <span style={{ color: 'white', fontSize: '75%' }}>{letter}</span>
                     </div>
                  ))}
               </div>
            </div>
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

// const cellStyle = {
//    backgroundColor: 'black'
// };
// basically invert colors is to invert the fen (position)
export default ChessBoard;
