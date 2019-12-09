const defaultState = {
  userId: null,
  roleId: 3,// 4 member
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        userId: action.payload.userId,
        roleId: action.payload.roleId
      }
    }
    default:
      return state
  }
}

export default reducer