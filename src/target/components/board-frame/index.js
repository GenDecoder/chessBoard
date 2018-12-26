import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import { ALGEBRAIC_COLUMN_NAMES, ALGEBRAIC_ROW_NAMES } from '../../constants';
import NotationBar from './notation-bar';

const BoardFrame = props => {
   const { anchor, children, perspective } = props;
   return (
      <div
         className={css(styles.container)}
         style={{
            padding: anchor,
            height: 150,
            width: 150
         }}
      >
         <NotationBar
            anchor={(150 / 100) * 5}
            direction="v"
            list={ALGEBRAIC_ROW_NAMES}
            perspective={perspective}
         />
         <NotationBar
            anchor={(150 / 100) * 5}
            direction="h"
            list={ALGEBRAIC_COLUMN_NAMES}
            perspective={perspective}
         />
         {children}
      </div>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#582006', //
      borderRadius: 10, //
      position: 'relative'
   }
});

BoardFrame.propTypes = {
   anchor: PropTypes.number,
   theme: PropTypes.string,
   perspective: PropTypes.oneOf(['w', 'b'])
};
BoardFrame.defaultProps = {
   anchor: 30,
   theme: 'classic',
   perspective: 'w'
};

export default BoardFrame;
