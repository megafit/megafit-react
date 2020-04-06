const defaultState = {
  userId: null,
  roleId: null,// 4 member
  fullname: "",
  nickname: "",
  loading: false,
  dataSubCategoryMemberships: [],
  dataCategoryMemberships: [],
  dataPackageMemberships: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        userId: action.payload.userId,
        roleId: action.payload.roleId,
        fullname: action.payload.fullname,
        nickname: action.payload.nickname,
      }
    }
    case 'FETCH_DATA_SUB_CATEGORY_MEMBERSHIPS_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataSubCategoryMemberships: action.payload.dataSubCategoryMemberships
      }
    }
    case 'FETCH_DATA_CATEGORY_MEMBERSHIPS_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataCategoryMemberships: action.payload.dataCategoryMemberships
      }
    }
    case 'FETCH_DATA_PACKAGE_MEMBERSHIPS_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataPackageMemberships: action.payload.dataPackageMemberships
      }
    }
    case 'FETCH_DATA_STAFF_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataAllStaff: action.payload.dataStaff
      }
    }
    case 'FETCH_DATA_MEMBER_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataAllMember: action.payload.dataMember
      }
    }
    case 'FETCH_DATA_LOADING': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_DATA_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}

export default reducer