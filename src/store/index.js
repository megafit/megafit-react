import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import Cookies from 'js-cookie';

import {API} from '../config/API';

const api = store => next => async action => {
  let token = Cookies.get('MEGAFIT_TKN');


  if (action.type === 'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS') {
    try{
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/sub-category-memberships', { headers: { token } })
  
      next({
        type: 'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS_SUCCESS',
        payload: { dataSubCategoryMemberships: getData.data.data }
      })

    }catch(err){
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_CATEGORY_MEMBERSHIPS') {
    try{
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/category-memberships', { headers: { token } })
  
      next({
        type: 'FETCH_DATA_CATEGORY_MEMBERSHIPS_SUCCESS',
        payload: { dataCategoryMemberships: getData.data.data }
      })

    }catch(err){
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else {
    next(action)
  }
}

const store = createStore(reducer, applyMiddleware(api))

export default store
