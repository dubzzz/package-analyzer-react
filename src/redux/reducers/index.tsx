import { combineReducers, Reducer } from 'redux';
import details from './details';
import router from './router';
import search from './search';

const combined = combineReducers({ details, router, search });
export default combined;
export type ReduxState = (typeof combined) extends Reducer<infer U> ? U : never;
