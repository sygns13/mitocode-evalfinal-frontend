/* eslint-disable */
import Cookies from 'js-cookie'
import baseApi from '../../api/baseApi'
import { ENDPOINT_LOGIN, ENDPOINT_MENU } from '../../utils/endpoints'
import * as TYPE from '../types/auth'
import store from '../store'
import { removeToken } from '../../configs/credentials'

export const doLogin = ({ username, password }, calback) => async (dispatch) => {
  dispatch({ type: TYPE.SET_AUTHENTICATED_START })
  try {
    const payload = {
      username,
      password
    }
    const response = await baseApi.post(ENDPOINT_LOGIN, payload)
    const expiration = new Date(response.data.expiracion)
    Cookies.set('token', response.data.token, { expires: expiration })

    dispatch({
      type: TYPE.SET_AUTHENTICATED_SUCCESS,
      data: true
    })
    calback()
  } catch (error) {
    dispatch({
      type: TYPE.SET_AUTHENTICATED_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al realizar el login'
      }
    })
  } finally {
    dispatch({ type: TYPE.SET_AUTHENTICATED_FINISH })
  }
}

export const doMenu = () => async (dispatch) => {
  dispatch({ type: TYPE.SET_MENU_START })
  try {
    const responseMenu = await baseApi.get(ENDPOINT_MENU)

    dispatch({
      type: TYPE.SET_MENU_SUCCESS,
      data: responseMenu.data
    })
  } catch (error) {
    dispatch({
      type: TYPE.SET_MENU_FAIL,
      error: {
        error: true,
        message: 'Ocurrió un error al obtener el menu'
      }
    })
  } finally {
    dispatch({ type: TYPE.SET_MENU_FINISH })
  }
}

export const signOut = () => async (dispatch) => {
  dispatch({ type: TYPE.SIGN_OUT })
  removeToken()
}
