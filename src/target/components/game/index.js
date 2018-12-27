import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import { getCellName, getPieceCode, getRowName } from '../../utils';

const Game = ({ fenPos }) => (
   <div className={css(styles.container)}>
      {fenPos.split('/').map((row, i) => {
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
);

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

Game.propTypes = {
   fenPos: PropTypes.string
};
Game.defaultProps = {
   fenPos: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
};

export default Game;
