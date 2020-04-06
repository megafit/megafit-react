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

export function fetchDataPackageMemberships(){
  return{
    type:'FETCH_DATA_PACKAGE_MEMBERSHIPS'
  }
}

export function fetchDataStaff(){
  return{
    type:'FETCH_DATA_STAFF'
  }
}

export function fetchDataMember(){
  return{
    type:'FETCH_DATA_MEMBER'
  }
}