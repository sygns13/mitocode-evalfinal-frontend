import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { TOKEN_NAME } from '../utils/constants'

export const getToken = () => Cookies.get(TOKEN_NAME)

export const removeToken = () => Cookies.remove(TOKEN_NAME)

export const decodeToken = () => jwt_decode(getToken())
