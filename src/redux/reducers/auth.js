import * as TYPE from '../types/auth'
import Cookies from 'js-cookie'

const hasToken = Cookies.get('token')

const initialState = {
  authenticated: {
    loading: false,
    data: !!hasToken,
    error: {
      error: false,
      message: ''
    }
  },
  menu: {
    loading: false,
    data: [],
    error: {
      error: false,
      message: ''
    }
  }
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TYPE.SET_AUTHENTICATED_START:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          loading: true,
          error: initialState.authenticated.error
        },
      }
    case TYPE.SET_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          data: action.data
        },
      }
    case TYPE.SET_AUTHENTICATED_FAIL:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          error: action.error
        },
      }
    case TYPE.SET_AUTHENTICATED_FINISH:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          loading: false
        },
      }
    case TYPE.SET_MENU_START:
      return {
        ...state,
        menu: {
          ...state.menu,
          loading: true,
          error: initialState.menu.error
        },
      }
    case TYPE.SET_MENU_SUCCESS:
      return {
        ...state,
        menu: {
          ...state.menu,
          data: action.data
        },
      }
    case TYPE.SET_MENU_FAIL:
      return {
        ...state,
        menu: {
          ...state.menu,
          error: action.error
        },
      }
    case TYPE.SET_MENU_FINISH:
      return {
        ...state,
        menu: {
          ...state.menu,
          loading: false
        },
      }
    case TYPE.SIGN_OUT:
      return initialState
    default:
      return state
  }
}