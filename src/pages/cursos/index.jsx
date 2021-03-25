import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as cursosActions from '../../redux/actions/cursos'
import * as TYPE from '../../redux/types/cursos'

const TYPE_MODAL_EDIT = 'edit'
const TYPE_MODAL_ADD = 'add'

const DEFAULT_FORM = {
  apellidos: '',
  fechaNac: '',
  nombres: '',
  urlFoto: ''
}

function Curso(){
    const state = useSelector((state) => state.cursos)
    const dispatch = useDispatch();

    const getCursos = () => {
        dispatch(cursosActions.getListCursos())
      }

      useEffect(() => {
        getCursos()
      }, [])

    return(
        <div>
            Página de Cursos
        </div>
    )
}

export default Curso