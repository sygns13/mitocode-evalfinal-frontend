import React, { useEffect, useState  } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as authReducer from '../../redux/actions/auth'
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

function Login() {

    const auth = useSelector((state) => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const { register, handleSubmit, errors, control } = useForm()

    //const errores = { username: false, password: false, message: false };
  
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
      margin: "0px",
      width: "100%"
    }

    const styleInput = {
      width: "100%"
    }

    const loading = auth.authenticated.loading
    const password = control.fieldsRef.current.password != null? control.fieldsRef.current.password.ref.value : true;
    const username = control.fieldsRef.current.username != null ? control.fieldsRef.current.username.ref.value: true;
  
    return (
      <div className="p-grid  p-align-center vertical-container" style={stylesBody}>
        <div className="p-grid p-justify-center" style={stylesGrid}>
          <div className="p-col-3">  
            <div className="card">
                  <Fieldset legend="Login Evaluación Final Mitocode">


                  <p className="p-justifly">Bienvenidos al Sistema de Evaluación Final de Mitocode Webflux con React: Registro de Matrículas. Por favor ingrese sus credenciales de usuario para poder iniciar sesión en el sistema</p>
                     <br/>
                     <br/>

                     <form onSubmit={handleSubmit(onSubmit)}  noValidate>
                      <div className="card">
                        <span className="p-float-label">
                        <Controller
                          name='username'
                          id='username'
                          control={control}
                          defaultValue=''
                          render={({ onChange, value }) => (
                            <InputText id="in1" value={value} style={styleInput}  disabled={loading} onChange={onChange}/>
                            )}
                            />
                            <label htmlFor="in1">Usuario</label>
                        </span>
                        {username != true && String(username).length == 0 && <span>Usuario es requerido</span>}
                      </div>

                      <div className="card">
                        <span className="p-float-label">
                        <Controller
                          name='password'
                          id='password'
                          control={control}
                          defaultValue=''
                          render={({ onChange, value }) => (
                            <Password id="in2" value={value} feedback={false} style={styleInput}   disabled={loading} onChange={onChange}/> 
                            )}
                            />
                            <label htmlFor="in2">Password</label>
                        </span>
                        {password != true && String(password).length == 0 && <span>Password es requerido</span>}
                        {username != true && password != true && String(username).length > 0 && String(password).length > 0 && <span>Ocurrió un error al realizar el login</span>}
                      </div>

                      <div className="card">
                        <Button label="Login" className="p-button-raised" style={styleInput}  icon="pi pi-sign-in"  type='submit'/>
                      </div>

                      <div className="card"><center>
                      {loading  &&   <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/> }
                      </center>
                      </div>
                  </form>

                  </Fieldset>

              </div>
            </div>
          </div>
      </div>
    )
  }


export default Login