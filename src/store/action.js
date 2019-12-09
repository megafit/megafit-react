export function setUser(payload) {
  return {
    type: 'SET_USER',
    payload
  }
}

export function fetchDataClass(payload){
  return{
    type:'FETCH_DATA_CLASS'
  }
}
