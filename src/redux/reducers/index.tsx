import { combineReducers, Reducer } from 'redux';
import details from './details';
import router from './router';

const combined = combineReducers({ details, router });
export default combined;
export type ReduxState = (typeof combined) extends Reducer<infer U> ? U : never;
