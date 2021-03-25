import * as TYPE from '../types/estudiantes'

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

export default function estudiantes(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_ESTUDIANTES_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.GET_ESTUDIANTES_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.GET_ESTUDIANTES_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.GET_ESTUDIANTES_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.DELETE_ESTUDIANTE_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.DELETE_ESTUDIANTE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.DELETE_ESTUDIANTE_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.DELETE_ESTUDIANTE_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.ADD_ESTUDIANTE_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.ADD_ESTUDIANTE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.ADD_ESTUDIANTE_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.ADD_ESTUDIANTE_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.EDIT_ESTUDIANTE_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.EDIT_ESTUDIANTE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.EDIT_ESTUDIANTE_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.EDIT_ESTUDIANTE_FINISH:
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