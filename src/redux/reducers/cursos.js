import * as TYPE from '../types/cursos'

const initialState = {
  list: {
    loading: false,
    data: null,
    error: {
      error: false,
      message: ''
    }
  }
}

export default function cursos(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_CURSOS_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.GET_CURSOS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.GET_CURSOS_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.GET_CURSOS_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.DELETE_CURSO_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.DELETE_CURSO_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.DELETE_CURSO_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.DELETE_CURSO_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.ADD_CURSO_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.ADD_CURSO_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.ADD_CURSO_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.ADD_CURSO_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.EDIT_CURSO_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.EDIT_CURSO_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.EDIT_CURSO_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.EDIT_CURSO_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
  }
  return state;
}