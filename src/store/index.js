import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import Cookies from 'js-cookie';

import { API } from '../config/API';

const api = store => next => async action => {
  let token = Cookies.get('MEGAFIT_TKN');

  if (action.type === 'FETCH_DATA_USER_DETAIL') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get(`/users/${action.payload}`, { headers: { token } })

      next({
        type: 'FETCH_DATA_USER_DETAIL_SUCCESS',
        payload: { dataUserDetail: getData.data.data, lockerKey: getData.data.lockerKey }
      })

    } catch (err) {
      console.log(err)
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/sub-category-memberships', { headers: { token } })

      next({
        type: 'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS_SUCCESS',
        payload: { dataSubCategoryMemberships: getData.data.data }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_CATEGORY_MEMBERSHIPS') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/category-memberships', { headers: { token } })

      next({
        type: 'FETCH_DATA_CATEGORY_MEMBERSHIPS_SUCCESS',
        payload: { dataCategoryMemberships: getData.data.data }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_PACKAGE_MEMBERSHIPS') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/package-memberships', { headers: { token } })

      next({
        type: 'FETCH_DATA_PACKAGE_MEMBERSHIPS_SUCCESS',
        payload: { dataPackageMemberships: getData.data.data }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_STAFF') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/users?only=staff', { headers: { token } })

      next({
        type: 'FETCH_DATA_STAFF_SUCCESS',
        payload: { dataStaff: getData.data.data }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_MEMBER') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get('/users?only=member', { headers: { token } })

      next({
        type: 'FETCH_DATA_MEMBER_SUCCESS',
        payload: { dataMember: getData.data.data }
      })

    } catch (err) {
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
