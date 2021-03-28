import React, { useEffect, useState, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import * as cursoActions from '../../redux/actions/cursos'
import * as estudianteActions from '../../redux/actions/estudiantes'
import baseApi from '../../api/baseApi';
import { ENDPOINT_MATRICULAS } from '../../utils/endpoints'
import { Dropdown } from 'primereact/dropdown';


function Matricula(){

    const dataRedux = useSelector((state) => state)
    const [helperRender, setRenderHelp] = useState(false)
    const [estudiante, setEstudiante] = useState(null)
    const [nombreEstudiante, setNombreEstudiante] = useState('')
    const [curso, setCurso] = useState(null)
    const [estudiantes, setEstudiantes] = useState([])
    const [cursos, setCursos] = useState([])
    const [matriculas, setPedidos] = useState([])


    const [listaCursos, setListaCursos] = useState([])

    
    const dispatch = useDispatch()

    const getSelectOptions = () => {
        dispatch(cursoActions.getListCursos())
        dispatch(estudianteActions.getListEstudiantes())
      }
      

    const toast = useRef(null);

    useEffect(() => {
        getSelectOptions()
      }, [])

    useEffect(() => {
        setCargado();
        },[dataRedux])

        const header = (
            <div className="table-header">
                Listado de Cursos a Matricular al estudiante
            </div>
        );

    const setCargado =() =>{
        if(!dataRedux.estudiantes.list.loading && dataRedux.estudiantes.list.data != null){
            let datos = [];
            dataRedux.estudiantes.list.data.forEach(student => {
                datos.push({label: student.nombres + ' ' + student.apellidos, value: student.id});
              });
            setEstudiantes(datos)
        }

        if(!dataRedux.cursos.list.loading && dataRedux.cursos.list.data != null){
            let datos = [];
            dataRedux.cursos.list.data.forEach(curs => {
                datos.push({label: curs.nombre , value: curs.id});
              });
              setCursos(datos)
        }
        
    }

    const setStudent = (e) => {
        setEstudiante(e);
        dataRedux.estudiantes.list.data.forEach(student => {
            if(student.id === e){
                setNombreEstudiante(student.nombres + ' ' + student.apellidos);
            }
          });
    }



    const setCurs = (e) => {
        setCurso(e);
    }

    const addCurso = () =>{
        dataRedux.cursos.list.data.forEach(curs => {
            if(curso === curs.id){ 
                const resultado = listaCursos.find( c => c.id === curso );
                if(!resultado){
                    listaCursos.push(curs);
                }
                else{
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Curso ya agregado', life: 3000 });
                }
                
            }
          });
          setCurs(null);

    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" label="Remover Curso" className="p-button-rounded p-button-danger" onClick={() => onDelete (rowData)} />
            </React.Fragment>
        );
    }

    const onDelete = (data) => {
        let index = listaCursos.indexOf(data);
        if ( index !== -1 ) {
            listaCursos.splice(index,1);
            setRenderHelp(!helperRender);
            
        }
      }

    const registrar = () => {
        if(estudiante == null){
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar un estudiante', life: 3000 });
        }
        else{
            if(listaCursos == null || listaCursos.length == 0){
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Debe agregar por lo menos un curso', life: 3000 });
            }
            else{
                nuevaMatricula();
            }
        }
    }


    const nuevaMatricula = async () => {
        /*function transformCursos() {
          return listaCursos.map((p) => {
            return {
              "curso": {
                "id" : p.id
              }
            }
          })
        }*/
        try {
          const payload = {
            "estudiante" : {
                            "id" : estudiante
                            },
            "cursos" : listaCursos,
            "estado" :true  
          }
          await baseApi.post(ENDPOINT_MATRICULAS, payload)      
          toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Matricula Registrada', life: 3000 });
          setEstudiante(null)
          setCurso(null)
          setNombreEstudiante('')
          setListaCursos([])
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se registró la matrícula, comuníquese con un administrador', life: 3000 });
            console.log(error)
        }
      }


    return(
        <div className="p-grid">
            <Toast ref={toast} />
            <div className="p-col-12">
                <div className="card  p-shadow-10"  style={{ padding: '10px'}}>
                <h4>Nueva Matricula</h4>
                <div className="p-fluid">
                    <blockquote>Aquí puede registrar matriculas del sistema</blockquote>
                </div>

                <div className="p-field p-grid">
                <label htmlFor="nombre" className="p-col-12 p-md-2">Estudiante</label>
                <div className="p-col-12 p-md-8">
                {dataRedux.estudiantes.list.data &&
                    <Dropdown value={estudiante} options={estudiantes} onChange={(e) => setStudent(e.value)} placeholder="Seleccione un Estudiante"  style={{ width: '100%'}} optionLabel="label"/> 
                }
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="siglas" className="p-col-12 p-md-2">Cursos</label>
                <div className="p-col-12 p-md-8">
                {dataRedux.estudiantes.list.data &&
                    <Dropdown value={curso} options={cursos} onChange={(e) => setCurs(e.value)} placeholder="Seleccione un Curso" style={{ width: '100%'}}/> 
                }
                </div>
                <div className="p-col-12 p-md-2">
                <Button label="Agregar Curso" icon="pi pi-plus" className="p-button-raised p-button-info" onClick={addCurso}/>
                </div>
            </div>
                
                </div>
            </div>

            <div className="p-col-12">
                <div className="card  p-shadow-10" style={{ padding: '10px'}}>
             <h5>Datos de Matricula para registrar</h5>

             Estudiante Seleciconado: {nombreEstudiante}

             

             {listaCursos &&
                <div className="card" >
                    <DataTable value={listaCursos} className="p-datatable-gridlines" header={header}>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="siglas" header="Siglas"></Column>
                        <Column  header="Gestión" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                } 

                <Button icon="pi pi-save" className="p-button-rounded p-button-success p-mr-2" onClick={() => registrar()}  label="Registrar Matrícula"/>

                </div>
            </div>


        </div>
    )
}

export default Matricula