import React from 'react';
import ChessBoard from './target';

export default function() {
   return (
      <div>
         <header>GNC COMPONENT</header>
         <ChessBoard />
         <ChessBoard fen="5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8" />
      </div>
   );
}
