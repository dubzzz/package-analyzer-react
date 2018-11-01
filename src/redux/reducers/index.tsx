import { combineReducers, Reducer } from 'redux';
import packageDetails from './packageDetails';

const combined = combineReducers({ packageDetails });
export default combined;
export type ReduxState = (typeof combined) extends Reducer<infer U> ? U : never;
