import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import {
   getCellName,
   getInvertedString,
   getPieceCode,
   getRowName,
   getUIFen,
   isWhitePerspective
} from './utils';
import Button from './components/button';
import BoardFrame from './components/board-frame';

function GncChess(props) {
   const { fenPos, marks, perspective } = props;
   const [localPerspective, setLocalPerspective] = useState(perspective);
   const viewAsWhite = isWhitePerspective(localPerspective);
   const uiFen = viewAsWhite ? getUIFen(fenPos) : getInvertedString(getUIFen(fenPos));
   const rows = uiFen.split('/');
   console.log(marks);
   // include frame should be a prop.
   return (
      <Fragment>
         {/* <Button
            onClick={() => {
               setLocalPerspective(viewAsWhite ? 'b' : 'w');
            }}
         >
            {'Rotate'}
         </Button> */}

         <BoardFrame anchor={(150 / 100) * 5} perspective={localPerspective}>
            <div className={css(styles.container)}>
               {rows.map((row, i) => {
                  const cells = row.split('');
                  return (
                     <div key={getRowName(i)} className={css(styles.rowContainer)}>
                        {cells.map((cell, j) => {
                           const isWhite = (i + j) % 2 === 0;
                           return (
                              <div
                                 key={getCellName(i, j)}
                                 className={css(styles.cellContainer)}
                                 style={{
                                    backgroundColor: isWhite ? '#EBECCE' : '#6C8D51'
                                 }}
                              >
                                 <span className={css(styles.cellText)}>{getPieceCode(cell)}</span>
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </BoardFrame>
      </Fragment>
   );
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: '100%'
   },
   rowContainer: {
      display: 'flex',
      height: '12.5%'
   },
   cellContainer: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'center'
   },
   cellText: {
      cursor: 'pointer',
      fontSize: '100%',
      userSelect: 'none'
   }
});

GncChess.propTypes = {
   fenPos: PropTypes.string,
   marks: PropTypes.arrayOf(
      PropTypes.shape({
         cell: PropTypes.string,
         color: PropTypes.string
      })
   ),
   // move: PropTypes.func,
   perspective: PropTypes.oneOf(['w', 'b'])
};
GncChess.defaultProps = {
   fenPos: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
   marks: [],
   // move() {}, // pass move
   perspective: 'w'
};

export default GncChess;
