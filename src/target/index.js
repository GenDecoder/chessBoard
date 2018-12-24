import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import bookImg from './img/book.jpg';
import Button from './components/button';
import ChessBoard from './components/chessBoard';

// Constants
const LOCS = {
   // labels
   I_am: 'I am',
   and_I_say: 'and I say',
   Say_something: 'Say something',
   // random words
   hello: 'hello',
   welcome: 'welcome',
   yeah: 'yeah',
   you_rule: 'you rule',
   try_again: 'try again'
};
const WORDS = [LOCS.hello, LOCS.welcome, LOCS.yeah, LOCS.you_rule, LOCS.try_again];

// Custom hook
function useRandomWord() {
   const [randomWord, setRandomWord] = useState('...');

   function doChange() {
      const residualWords = WORDS.filter(word => word !== randomWord);
      setRandomWord(residualWords[Math.floor(Math.random() * residualWords.length)]);
   }
   return [randomWord, doChange];
}
// Funcitional component
function GncComponent(props) {
   const { name } = props;
   const [data, setData] = useState({});
   const [randomWord, changeRandomWord] = useRandomWord();

   const fetchData = async () => {
      const response = await fetch('http://hn.algolia.com/api/v1/search?query=redux');
      const rawData = await response.json();
      setData(rawData);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div>
         <ChessBoard fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" />
         <div
            key="main-container"
            style={{
               display: 'inline-flex',
               alignItems: 'center',
               backgroundColor: 'white',
               color: 'black',
               fontSize: 24,
               fontWeight: 'bold',
               padding: 20,
               borderRadius: 8,
               borderStyle: 'solid',
               borderColor: 'grey',
               borderWidth: 1
            }}
         >
            <img src={bookImg} alt="book" width={100} height={100} />
            <div style={{ display: 'inline-block', width: 500, marginLeft: 20 }}>
               <span>{`${LOCS.I_am} `}</span>
               <span style={{ color: 'blue' }}>{name.toUpperCase()}</span>
               <span>{` ${LOCS.and_I_say} `}</span>
               <span style={{ color: 'red' }}>{`"${randomWord.toUpperCase()}"`}</span>
            </div>
            <Button onClick={changeRandomWord}>{LOCS.Say_something}</Button>
         </div>
         {data.hits && (
            <ul>
               {data.hits.map(item => (
                  <li key={item.objectID}>
                     <a href={item.url}>{item.title}</a>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

GncComponent.propTypes = {
   name: Proptypes.string
};
GncComponent.defaultProps = {
   name: 'Genesis'
};

export default GncComponent;
