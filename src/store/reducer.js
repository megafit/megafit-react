const defaultState = {
  userId: null,
  roleId: null, 
  fullname: "",
  nickname: "",
  hasConfirmTermAndCondition: false,
  loading: false,
  lockerKey: null,
  dataSubCategoryMemberships: [],
  dataCategoryMemberships: [],
  dataPackageMemberships: [],
  dataUserDetail: null,
  dataClassPt: [],
  dataMyJoinedClassPt: [],
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
        hasConfirmTermAndCondition: action.payload.hasConfirmTermAndCondition
      }
    }
    case 'FETCH_DATA_USER_DETAIL_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataUserDetail: action.payload.dataUserDetail,
        lockerKey: action.payload.lockerKey
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
    case 'FETCH_DATA_CLASS_PT_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataClassPt: action.payload.dataClassPt
      }
    }
    case 'FETCH_DATA_MY_JOINED_CLASS_PT_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataMyJoinedClassPt: action.payload.dataMyJoinedClassPt
      }
    }
    case 'RESET_CLASS_PT': {
      return {
        ...state,
        dataClassPt: []
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