import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import { getInvertedArray, isVertical, isWhitePerspective } from '../../utils';

function getContainerStyle(anchor, direction) {
   return isVertical(direction)
      ? { left: 0, top: anchor, bottom: anchor, width: anchor }
      : { bottom: 0, left: anchor, right: anchor, height: anchor };
}

const NotationBar = props => {
   const { anchor, direction, list, perspective } = props;

   return (
      <div className={css(styles.container)} style={getContainerStyle(anchor, direction)}>
         <div
            className={css(styles.innerContainer)}
            style={{ flexDirection: isVertical(direction) ? 'column' : 'row' }}
         >
            {(isWhitePerspective(perspective) ? list : getInvertedArray(list)).map(item => (
               <div className={css(styles.itemContainer)} key={item}>
                  <span className={css(styles.itemText)}>{item}</span>
               </div>
            ))}
         </div>
      </div>
   );
};

NotationBar.propTypes = {
   anchor: PropTypes.number,
   direction: PropTypes.oneOf(['h', 'v']),
   list: PropTypes.instanceOf(Array),
   perspective: PropTypes.oneOf(['w', 'b'])
};
NotationBar.defaultProps = {
   anchor: 30,
   direction: 'h',
   list: [],
   perspective: 'w'
};

const styles = StyleSheet.create({
   container: {
      position: 'absolute'
   },
   innerContainer: {
      height: '100%',
      display: 'flex'
   },
   itemContainer: {
      flex: 1,
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center'
   },
   itemText: {
      color: 'white',
      fontSize: '75%'
   }
});

export default NotationBar;
