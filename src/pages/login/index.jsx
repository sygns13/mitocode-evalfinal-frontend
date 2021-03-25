import React, { useEffect, useState  } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as authReducer from '../../redux/actions/auth'
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';

function Login() {

    const auth = useSelector((state) => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const { register, handleSubmit, errors, control } = useForm()
  
    const onSubmit = (data) => {
      dispatch(
        authReducer.doLogin(
          data,
          () => history.push('/home')
        )
      )
    }

    const stylesBody = {
      height: "500px",
      width: "100%"
    }

    const stylesGrid = {
      margin: "0px"
    }

    const styleInput = {
      width: "100%"
    }

    const [usuario, setValueUsuario] = useState('');
    const [password, setValuePassword] = useState(null);

  
  
    const loading = auth.authenticated.loading
  
    return (
      <div className="p-grid  p-align-center vertical-container" style={stylesBody}>
        <div className="p-grid p-justify-center" style={stylesGrid}>
          <div className="p-col-4">  
            <div className="card">
                  <Fieldset legend="Login Evaluación Final Mitocode">


                  <p className="p-justifly">Bienvenidos al Sistema de Evaluación Final de Mitocode Webflux con React: Registro de Matrículas. Por favor ingrese sus credenciales de usuario para poder iniciar sesión en el sistema</p>
                     <br/>
                     <br/>
                  <div className="card">
                    <span className="p-float-label">
                        <InputText id="in" value={usuario} onChange={(e) => setValueUsuario(e.target.value)} style={styleInput}/>
                        <label htmlFor="in">Usuario</label>
                    </span>
                  </div>

                  <div className="card">
                    <span className="p-float-label">
                        <Password value={password} onChange={(e) => setValuePassword(e.target.value)} feedback={false} style={styleInput} /> 
                        <label htmlFor="in">Password</label>
                    </span>
                  </div>

                  <div className="card">
                    <Button label="Login" className="p-button-raised" style={styleInput}  icon="pi pi-sign-in" />
                  </div>
                  

                  </Fieldset>

              </div>
            </div>
          </div>
      </div>
    )
  }


export default Login