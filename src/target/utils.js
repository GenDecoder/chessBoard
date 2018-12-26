export function getPieceCode(letter) {
   switch (letter) {
      case 'K':
         return '♔';
      case 'Q':
         return '♕';
      case 'R':
         return '♖';
      case 'B':
         return '♗';
      case 'N':
         return '♘';
      case 'P':
         return '♙';
      case 'k':
         return '♚';
      case 'q':
         return '♛';
      case 'r':
         return '♜';
      case 'b':
         return '♝';
      case 'n':
         return '♞';
      case 'p':
         return '♟';
      default:
         return '';
   }
}

export function isWhitePerspective(perspective) {
   return perspective === 'w';
}

export function isVertical(direction) {
   return direction === 'v';
}

export function invertString(str) {
   return str
      .split('')
      .reverse()
      .join('');
}

export function invertArray(array) {
   return array.slice().reverse();
}
