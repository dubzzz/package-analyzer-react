import { DUMMY } from './actionTypes';

export const dummy = () => ({
  type: DUMMY,
  payload: null
});

export type Actions = ReturnType<typeof dummy>;
