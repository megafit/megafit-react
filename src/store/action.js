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

export function fetchDataUserDetail(payload){
  return{
    type:'FETCH_DATA_USER_DETAIL',
    payload
  }
}

export function fetchDataClassPt(payload){
  return{
    type:'FETCH_DATA_CLASS_PT',
    payload
  }
}

export function resetClassPt(){
  return{
    type:'RESET_CLASS_PT'
  }
}

export function fetchDataMyJoinedClassPt(payload){
  return{
    type:'FETCH_DATA_MY_JOINED_CLASS_PT',
    payload
  }
}