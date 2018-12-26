import React from 'react';
import renderer from 'react-test-renderer';
import ChessBoard from '.';

describe('Main Feature', () => {
   it('renders Good', () => {
      const component = renderer.create(<ChessBoard />);
      expect(component.toJSON).toMatchSnapshot();
   });
});
