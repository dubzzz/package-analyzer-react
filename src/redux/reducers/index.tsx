import { combineReducers, Reducer } from 'redux';
import router from './router';

const combined = combineReducers({ router });
export default combined;
export type ReduxState = (typeof combined) extends Reducer<infer U> ? U : never;
