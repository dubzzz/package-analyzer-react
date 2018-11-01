import { Actions } from '../actions';

const initialState = {};

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    default:
      return state;
  }
}
