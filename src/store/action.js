export function setUser(payload) {
  return {
    type: 'SET_USER',
    payload
  }
}

export function fetchDataSubCategoryMemberships(){
  return{
    type:'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS'
  }
}

export function fetchDataCategoryMemberships(){
  return{
    type:'FETCH_DATA_CATEGORY_MEMBERSHIPS'
  }
}
