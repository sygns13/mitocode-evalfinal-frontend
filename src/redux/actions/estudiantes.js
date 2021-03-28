import * as TYPE from '../types/estudiantes'
import baseApi from '../../api/baseApi'
import { ENDPOINT_ESTUDIANTES } from '../../utils/endpoints'


export const getListEstudiantes = () => async (dispatch) => {
  try {
    dispatch({ type: TYPE.GET_ESTUDIANTES_START })

    const response = await baseApi.get(ENDPOINT_ESTUDIANTES)

    dispatch({
      type: TYPE.GET_ESTUDIANTES_SUCCESS,
      data: response.data
    })
  } catch (_) {
    dispatch({
      type: TYPE.GET_ESTUDIANTES_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al obtener estudiantes'
      }
    })
  } finally {
    dispatch({ type: TYPE.GET_ESTUDIANTES_FINISH })
  }
}


export const deleteEstudiante = (idEstudiante, stateEstudiantes) => async (dispatch) => {
  const arrayEstudiantesList = stateEstudiantes.list.data
  dispatch({ type: TYPE.DELETE_ESTUDIANTE_START })
  try {
    const endPointDeleteUser = `${ENDPOINT_ESTUDIANTES}/${idEstudiante}`
    await baseApi.delete(endPointDeleteUser)

    const newData = arrayEstudiantesList.filter((obj) => obj.id !== idEstudiante)

    dispatch({
      type: TYPE.DELETE_ESTUDIANTE_SUCCESS,
      data: newData
    })
  } catch (error) {
    dispatch({
      type: TYPE.DELETE_ESTUDIANTE_FAIL,
      error: {
        error: true,
        message: 'Error al eliminar estudiante'
      }
    })
  } finally {
    dispatch({ type: TYPE.DELETE_ESTUDIANTE_FINISH })
  }
}

export const addNewEstudiante = (dataForm, stateEstudiantes) => async (dispatch) => {
  const arrayEstudiantesList = stateEstudiantes.list.data
  dispatch({ type: TYPE.ADD_ESTUDIANTE_START })
  try {
    dataForm.estado = true
    const response = await baseApi.post(ENDPOINT_ESTUDIANTES, dataForm)
    const newData = [...arrayEstudiantesList, response.data]
    dispatch({
      type: TYPE.ADD_ESTUDIANTE_SUCCESS,
      data: newData
    })
  } catch (error) {
     dispatch({
      type: TYPE.ADD_ESTUDIANTE_FAIL,
      error: {
        error: true,
        message: 'Error al agregar estudiante'
      }
      
    })
  } finally {
    dispatch({ type: TYPE.ADD_ESTUDIANTE_FINISH })
  }
}

export const editEstudiante = (dataForm, stateEstudiantes) => async (dispatch) => {
  const arrayEstudiantesList = stateEstudiantes.list.data
  dispatch({ type: TYPE.EDIT_ESTUDIANTE_START })
  try {
    const endPointUpdateUser = `${ENDPOINT_ESTUDIANTES}/${dataForm.id}`
    await baseApi.put(endPointUpdateUser, dataForm)

    const index = arrayEstudiantesList.findIndex((estudiante) => estudiante.id === dataForm.id)
    const newData = [...arrayEstudiantesList]
    newData[index] = dataForm

    dispatch({
      type: TYPE.EDIT_ESTUDIANTE_SUCCESS,
      data: newData
    })
  } catch (error) {
    dispatch({
      type: TYPE.EDIT_ESTUDIANTE_FAIL,
      error: {
        error: true,
        message: 'Error al editar estudiante'
      }
    })
  } finally {
    dispatch({ type: TYPE.EDIT_ESTUDIANTE_FINISH })
  }
}
