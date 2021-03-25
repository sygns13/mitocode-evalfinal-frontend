import * as TYPE from '../types/matriculas'

const initialState = {
  list: {
    loading: false,
    data: null,
    error: {
      error: false,
      message: ''
    }
  },
  filterList: {
    loading: false,
    data: null,
    error: {
      error: false,
      message: ''
    }
  },
  detailMatricula: {
    loading: false,
    data: null,
    error: {
      error: false,
      message: ''
    }
  }
}

export default function matriculas(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_MATRICULAS_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.GET_MATRICULAS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.data
        },
      }
    case TYPE.GET_MATRICULAS_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error
        },
      }
    case TYPE.GET_MATRICULAS_FINISH:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false
        },
      }
    case TYPE.GET_MATRICULAS_USER_START:
      return {
        ...state,
        filterList: {
          ...state.filterList,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.GET_MATRICULAS_USER_SUCCESS:
      return {
        ...state,
        filterList: {
          ...state.filterList,
          data: action.data
        },
      }
    case TYPE.GET_MATRICULAS_USER_FAIL:
      return {
        ...state,
        filterList: {
          ...state.filterList,
          error: action.error
        },
      }
    case TYPE.GET_MATRICULAS_USER_FINISH:
      return {
        ...state,
        filterList: {
          ...state.filterList,
          loading: false
        },
      }
    case TYPE.CLEAR_MATRICULAS_USER:
      return {
        ...state,
        filterList: initialState.filterList,
      }
    case TYPE.GET_MATRICULA_DETAIL_START:
      return {
        ...state,
        detailMatricula: {
          ...state.detailMatricula,
          loading: true,
          error: initialState.list.error
        },
      }
    case TYPE.GET_MATRICULA_DETAIL_SUCCESS:
      return {
        ...state,
        detailMatricula: {
          ...state.detailMatricula,
          data: action.data
        },
      }
    case TYPE.GET_MATRICULA_DETAIL_FAIL:
      return {
        ...state,
        detailMatricula: {
          ...state.detailMatricula,
          error: action.error
        },
      }
    case TYPE.GET_MATRICULA_DETAIL_FINISH:
      return {
        ...state,
        detailMatricula: {
          ...state.detailMatricula,
          loading: false
        },
      }
    default:
      return state
  }
}
