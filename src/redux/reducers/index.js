import { combineReducers } from 'redux';
import estudiantes from './estudiantes'
import cursos from './cursos'
import auth from './auth'
import matriculas from './matriculas'

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    estudiantes,
    cursos,
    auth,
    matriculas
  });

  return rootReducer;
}
