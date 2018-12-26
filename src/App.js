import React from 'react';
import GncChess from './target';

export default function() {
   return (
      <div>
         <header>GNC COMPONENT</header>
         <GncChess />
         <GncChess fen="5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8" />
      </div>
   );
}

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
