import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
// import {API} from '../config/API';

const api = store => next => async action => {
  // let token =     Cookies.remove('MEGAFIT_TKN');


  if(action.type=== 'FETCH_DATA_CLASS'){

  }else{
    next(action)
  }
}

const store = createStore(reducer, applyMiddleware(api))

export default store