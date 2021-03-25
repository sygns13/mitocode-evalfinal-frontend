import { ENDPOINT_MATRICULAS, ENDPOINT_MATRICULAS_USUARIO, ENDPOINT_ESTUDIANTES, ENDPOINT_CURSOS } from '../../utils/endpoints'
import baseApi from '../../api/baseApi'
import * as TYPE from '../types/matriculas'

export const getListMatriculas = () => async (dispatch) => {
  try {
    dispatch({ type: TYPE.GET_MATRICULAS_START })

    const response = await baseApi.get(ENDPOINT_MATRICULAS)

    dispatch({
      type: TYPE.GET_MATRICULAS_SUCCESS,
      data: response.data
    })
  } catch (_) {
    dispatch({
      type: TYPE.GET_MATRICULAS_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al obtener las matriculas'
      }
    })
  } finally {
    dispatch({ type: TYPE.GET_MATRICULAS_FINISH })
  }
}

export const getListMatriculasByUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPE.GET_MATRICULAS_USER_START })

    const payload = {
      idEstudiante: id
    }

    const response = await baseApi.post(ENDPOINT_MATRICULAS_USUARIO, payload)

    dispatch({
      type: TYPE.GET_MATRICULAS_USER_SUCCESS,
      data: response.data
    })
  } catch (_) {
    dispatch({
      type: TYPE.GET_MATRICULAS_USER_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al obtener las matriculas de usuario'
      }
    })
  } finally {
    dispatch({ type: TYPE.GET_MATRICULAS_USER_FINISH })
  }
}

export const clearListMatriculasByUser = () => (dispatch) => {
  dispatch({ type: TYPE.CLEAR_MATRICULAS_USER })
}

export const getDetailMatricula = (idMatricula, callback) => async (dispatch) => {
  dispatch({ type: TYPE.GET_MATRICULA_DETAIL_START })
  try {
    const response = await baseApi.get(`${ENDPOINT_MATRICULAS}/${idMatricula}`)

    const idEstudiante = response.data.cliente.id
    const responseEstudiante = await baseApi.get(`${ENDPOINT_ESTUDIANTES}/${idEstudiante}`)
    
    const listPromisesCursos = []

    response.data.items.map((p) => {
      const req = baseApi.get(`${ENDPOINT_CURSOS}/${p.curso.id}`)
      listPromisesCursos.push(req)
    })

    const responseAllCursos = await Promise.all(listPromisesCursos)

    const filterResponseCursos = responseAllCursos.map((p) => {
      return p.data
      })

    const jsonResponse = {
      general: response.data,
      cliente: responseEstudiante.data,
      cursos: filterResponseCursos
    }

    dispatch({
      type: TYPE.GET_MATRICULA_DETAIL_SUCCESS,
      data: jsonResponse
    })
    callback()
  } catch (error) {
    dispatch({
      type: TYPE.GET_MATRICULA_DETAIL_FAIL,
      error: {
        error: false,
        message: 'Ocurrió un error al obtener detalle de matricula'
      }
    })
  } finally {
    dispatch({ type: TYPE.GET_MATRICULA_DETAIL_FINISH })
  }
}
