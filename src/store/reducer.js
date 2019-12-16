const defaultState = {
  userId: null,
  roleId: null,// 4 member
  fullname: "",
  nickname: ""
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
    default:
      return state
  }
}

export default reducer