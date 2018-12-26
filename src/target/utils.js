import { classic, modern } from './themes';

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

export function getColumnName(index) {
   return { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h' }[index];
}

export function getRowName(index) {
   return String(index + 1);
}

export function getCellName(x, y) {
   return getColumnName(x) + getRowName(y);
}

export function getInvertedString(str) {
   return str
      .split('')
      .reverse()
      .join('');
}

export function getInvertedArray(array) {
   return array.slice().reverse();
}

export function getUIFen(str) {
   return str.split('').reduce(
      (reulst, value) =>
         reulst + (Number.isInteger(Number(value)) ? '0'.repeat(Number(value)) : value), // Convert numbers to zeros. Zeros represent empty cells.
      ''
   );
}

export function getTheme(str) {
   switch (str) {
      case 'classic':
         return classic;
      case 'modern':
         return modern;
      default:
         return classic;
   }
}
