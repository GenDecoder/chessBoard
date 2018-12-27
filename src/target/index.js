// import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import { getInvertedString, getUIFen, isWhitePerspective } from './utils';
// import Button from './components/button';
import BoardFrame from './components/board-frame';
import Game from './components/game';

function GncChess(props) {
   const { fenPos, marks, perspective } = props;
   const [localPerspective, setLocalPerspective] = useState(perspective);
   const viewAsWhite = isWhitePerspective(localPerspective);
   const uiFen = viewAsWhite ? getUIFen(fenPos) : getInvertedString(getUIFen(fenPos));
   console.log(marks);
   // include frame should be a prop.
   // Context comes here
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
            <Game fenPos={uiFen} />
         </BoardFrame>
      </Fragment>
   );
}

// const styles = StyleSheet.create();

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
