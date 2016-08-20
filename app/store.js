import { createStore, combineReducers, compose } from 'redux';

import cardsReducer from './reducers/cardsReducer';
import { columnOffsetsReducer, cardOffsetsReducer } from './reducers/offsetReducers';
import * as reducers from './reducers';

export default function configureStore() {
  const reducer = combineReducers({
    cards: cardsReducer,
    titleMode: reducers.titleModeReducer,
    title: reducers.titleReducer,
    cardOffsets: cardOffsetsReducer,
    columnOffsets: columnOffsetsReducer,
    dragging: reducers.dragReducer
  });

  const state = {
    title: 'My New Logic Model',
    titleMode: 'VIEW_MODE',
    cards: {
      inputs: [
        {
          id: '1',
          text: 'Hello World',
          color: '#FFFFFF',
          column: 'inputs',
          links: ['3']
        },
        {
          id: '2',
          text: 'Another Card',
          color: '#B3ECFF',
          column: 'inputs',
          links: ['4']
        }
      ],
      activities: [
        {
          id: '3',
          text: 'Blah Blah',
          color: '#FFB3EC',
          column: 'activities',
          links: []
        },
        {
          id: '4',
          text: 'Yet Another Card!',
          color: '#75FF98',
          column: 'activities',
          links: []
        },
        {
          id: '5',
          text: 'Derp Derp',
          color: '#FFFFFF',
          column: 'activities',
          links: []
        }
      ],
      outputs: [],
      outcomes: [],
      impact: []
    }
  };

  return createStore(reducer, state, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
