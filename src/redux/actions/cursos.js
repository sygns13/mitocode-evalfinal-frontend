import * as TYPE from '../types/cursos'
import baseApi from '../../api/baseApi'
import { ENDPOINT_CURSOS } from '../../utils/endpoints'


export const getListCursos = () => async (dispatch) => {
  try {
    dispatch({ type: TYPE.GET_CURSOS_START })

    const response = await baseApi.get(ENDPOINT_CURSOS)

    dispatch({
      type: TYPE.GET_CURSOS_SUCCESS,
      data: response.data
    })
  } catch (_) {
    dispatch({
      type: TYPE.GET_CURSOS_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al obtener cursos'
      }
    })
  } finally {
    dispatch({ type: TYPE.GET_CURSOS_FINISH })
  }
}


export const deleteCurso = (idCurso, stateCursos) => async (dispatch) => {
  const arrayCursosList = stateCursos.list.data
  dispatch({ type: TYPE.DELETE_CURSO_START })
  try {
    const endPointDeleteUser = `${ENDPOINT_CURSOS}/${idCurso}`
    await baseApi.delete(endPointDeleteUser)

    const newData = arrayCursosList.filter((obj) => obj.id !== idCurso)

    dispatch({
      type: TYPE.DELETE_CURSO_SUCCESS,
      data: newData
    })
  } catch (error) {
    dispatch({
      type: TYPE.DELETE_CURSO_FAIL,
      error: {
        error: true,
        message: 'Error al eliminar curso'
      }
    })
  } finally {
    dispatch({ type: TYPE.DELETE_CURSO_FINISH })
  }
}

export const addNewCurso = (dataForm, stateCursos) => async (dispatch) => {
  const arrayCursosList = stateCursos.list.data
  dispatch({ type: TYPE.ADD_CURSO_START })
  try {
    dataForm.estado = true
    const response = await baseApi.post(ENDPOINT_CURSOS, dataForm)
    const newData = [...arrayCursosList, response.data]
    dispatch({
      type: TYPE.ADD_CURSO_SUCCESS,
      data: newData
    })
  } catch (error) {
    dispatch({
      type: TYPE.ADD_CURSO_FAIL,
      error: {
        error: true,
        message: 'Error al agregar curso'
      }
    })
  } finally {
    dispatch({ type: TYPE.ADD_CURSO_FINISH })
  }
}

export const editCurso = (dataForm, stateCursos) => async (dispatch) => {
  const arrayCursosList = stateCursos.list.data
  dispatch({ type: TYPE.EDIT_CURSO_START })
  try {
    const endPointUpdateUser = `${ENDPOINT_CURSOS}/${dataForm.id}`
    await baseApi.put(endPointUpdateUser, dataForm)

    const index = arrayCursosList.findIndex((curso) => curso.id === dataForm.id)
    const newData = [...arrayCursosList]
    newData[index] = dataForm

    dispatch({
      type: TYPE.EDIT_CURSO_SUCCESS,
      data: newData
    })
  } catch (error) {
    dispatch({
      type: TYPE.EDIT_CURSO_FAIL,
      error: {
        error: true,
        message: 'Error al editar curso'
      }
    })
  } finally {
    dispatch({ type: TYPE.EDIT_CURSO_FINISH })
  }
}
