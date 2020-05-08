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
  } else if (action.type === 'FETCH_DATA_CLASS_PT') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let data = []

      let getData = await API.get(`/class-pts?hour=${new Date().getHours()}&week=${action.payload.week}&year=${action.payload.year}`, { headers: { token } })

      for (let i = 0; i < 7; i++) {
        let day = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"]
        let timeClassPt = [
          { jam: '06:00 - 07:00', partisipan: "" },
          { jam: '07:00 - 08:00', partisipan: "" },
          { jam: '08:00 - 09:00', partisipan: "" },
          { jam: '09:00 - 10:00', partisipan: "" },
          { jam: '10:00 - 11:00', partisipan: "" },
          { jam: '11:00 - 12:00', partisipan: "" },
          { jam: '12:00 - 13:00', partisipan: "" },
          { jam: '13:00 - 14:00', partisipan: "" },
          { jam: '14:00 - 15:00', partisipan: "" },
          { jam: '15:00 - 16:00', partisipan: "" },
          { jam: '16:00 - 17:00', partisipan: "" },
          { jam: '17:00 - 18:00', partisipan: "" },
          { jam: '18:00 - 19:00', partisipan: "" },
          { jam: '19:00 - 20:00', partisipan: "" },
          { jam: '20:00 - 21:00', partisipan: "" },
          { jam: '21:00 - 22:00', partisipan: "" }
        ]

        let newDate = new Date(
          new Date(action.payload.date).getFullYear(),
          new Date(action.payload.date).getMonth(),
          new Date(action.payload.date).getDate() + i, 8)

        await timeClassPt.forEach(async el => { // Assign class pt perjam
          let classPt = await getData.data.data.find(element => `${el.jam.slice(0, 5)}:00` === element.time && element.date === new Date(action.payload.date).getDate() + i)
          if (classPt) el.classPt = classPt
        })

        data.push({ day: day[i], date: newDate, data: timeClassPt })
      }

      next({
        type: 'FETCH_DATA_CLASS_PT_SUCCESS',
        payload: { dataClassPt: data }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_MY_JOINED_CLASS_PT') {
    try {
      next({
        type: 'FETCH_DATA_LOADING'
      })

      let getData = await API.get(`/class-pts?date=${action.payload}&hour=${new Date().getHours()}`, { headers: { token } })
      // console.log(getData.data.data)
      next({
        type: 'FETCH_DATA_MY_JOINED_CLASS_PT_SUCCESS',
        payload: { dataMyJoinedClassPt: getData.data.data }
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
