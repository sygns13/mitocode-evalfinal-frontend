import React, { useEffect, useState, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as estudianteActions from '../../redux/actions/estudiantes'
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';

const TYPE_MODAL_EDIT = 'edit'
const TYPE_MODAL_ADD = 'add'
const TYPE_DELETE = 'dele'

const DEFAULT_FORM = {
    nombres: '',
    apellidos: '',
    dni: '',
    edad: ''
  }


function Estudiante(){
    const [estudianteDialog, setEstudianteDialog] = useState(false)
    const [mostrarMensaje, setMensajeMostrar] = useState(false)
    const [typeForm, setTypeForm] = useState(null)
    const [modalForm, setModalForm] = useState(DEFAULT_FORM)

    const state = useSelector((state) => state.estudiantes)
    const dispatch = useDispatch()

    const getEstudiantes = () => {
        dispatch(estudianteActions.getListEstudiantes())
        
      }
      

    const toast = useRef(null);

    useEffect(() => {
    getEstudiantes();
    setResultado();
    }, [])

    useEffect(() => {
        setResultado();
        },)

    const setResultado =() =>{
        if(mostrarMensaje){

            if(!state.list.loading){
                if(state.list.error.error){
                    toast.current.show({ severity: 'error', summary: 'Error', detail: state.list.error.message, life: 3000 });
                    setMensajeMostrar(false);
                }
                else{
                    if(typeForm === TYPE_MODAL_ADD){
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Estudiante Registrado', life: 3000 });
                        setMensajeMostrar(false);
                    }if(typeForm ===TYPE_MODAL_EDIT){
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Estudiante Editado', life: 3000 });
                        setMensajeMostrar(false);
                    }
                    if(typeForm ===TYPE_DELETE){
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Estudiante Eliminado', life: 3000 });
                        setMensajeMostrar(false);
                    }
                    
                        
                }
            }
        }
    }


    const nuevoEstudiante = () => {
        setTypeForm(TYPE_MODAL_ADD);
        setModalForm(DEFAULT_FORM);
        setEstudianteDialog(true);
    }

    const onDelete = (data) => {
        setTypeForm(TYPE_DELETE);
        setMensajeMostrar(true);
        const idEstudiante = data.id;
        dispatch(estudianteActions.deleteEstudiante(idEstudiante, state));
      }

    const onEdit = (data) => {
    setTypeForm(TYPE_MODAL_EDIT)
    const newForm = {
        id: data.id,
        nombres: data.nombres,
        apellidos: data.apellidos,
        dni: data.dni,
        edad: data.edad
    }
    setModalForm(newForm)
    setEstudianteDialog(true);
    }

    const onUpdateInput = (val, id) => {
        setModalForm((state) => {
          return {
            ...state,
            [id]: val.target.value
          }
        })
      }

      const hideDialog = () => {
        setTypeForm(TYPE_MODAL_ADD)
        setEstudianteDialog(false);
    }


    const onSubmitFormModal = () => {
        setMensajeMostrar(true);
        if (typeForm === TYPE_MODAL_ADD) {
            dispatch(estudianteActions.addNewEstudiante(modalForm, state))
        } else {
          dispatch(estudianteActions.editEstudiante(modalForm, state))
        }
        setEstudianteDialog(false);
        
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => onEdit(rowData)}  tooltip="Editar Estudiante" tooltipOptions={{position: 'top'}}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete (rowData)} tooltip="Eliminar Estudiante" tooltipOptions={{position: 'top'}}/>
            </React.Fragment>
        );
    }

    const estudianteDialogFooter = (
        <div>
            {typeForm === TYPE_MODAL_ADD ? <Button label="Grabar" icon="pi pi-check" onClick={onSubmitFormModal} /> : <Button label="Actualizar" icon="pi pi-check" onClick={onSubmitFormModal} />}
            <Button label="Cerrar" icon="pi pi-times" onClick={hideDialog} />
        </div>
    );


    return(
        <div className="p-grid">
            <Toast ref={toast} />
            <div className="p-col-12">
                <div className="card  p-shadow-10"  style={{ padding: '10px'}}>
                <h4>Gestión de Estudiantes</h4>
                <div className="p-fluid">
                    <blockquote>Aquí puede gestionar los estudiantes del sistema</blockquote>
                </div>
                <br/>
                <Button label="Nuevo Estudiante" icon="pi pi-plus" className="p-button-raised p-button-info" onClick={nuevoEstudiante}/>
                </div>
            </div>

            <div className="p-col-12">
                <div className="card  p-shadow-10" style={{ padding: '10px'}}>
             <h5>Listado de Estudiantes Registrados</h5>

             {!state.list.data &&  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>}
             {state.list.data &&
                <div className="card" >
                    <DataTable value={ state.list.data} className="p-datatable-gridlines">
                        <Column field="nombres" header="Nombres"></Column>
                        <Column field="apellidos" header="Apellidos"></Column>
                        <Column field="dni" header="DNI"></Column>
                        <Column field="edad" header="Edad"></Column>
                        <Column  header="Gestión" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                }

                </div>
            </div>

            <Dialog visible={estudianteDialog} style={{ width: '450px' }} header="Estudiantes" modal className="p-fluid" footer={estudianteDialogFooter} onHide={hideDialog}>

                <h4>{typeForm === TYPE_MODAL_ADD ? 'Agregar' : 'Editar'} Estudiante</h4>

            <div className="p-field p-grid">
                <label htmlFor="nombres" className="p-col-12 p-md-2">Nombres</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="nombres" type="text"  value={modalForm.nombres} onChange={(val) => onUpdateInput(val, 'nombres')}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="apellidos" className="p-col-12 p-md-2">Apellidos</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="apellidos" type="text"  value={modalForm.apellidos} onChange={(val) => onUpdateInput(val, 'apellidos')}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="dni" className="p-col-12 p-md-2">DNI</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="dni" type="text" value={modalForm.dni} onChange={(val) => onUpdateInput(val, 'dni')}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="edad" className="p-col-12 p-md-2">Edad</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="edad" type="text"  value={modalForm.edad} onChange={(val) => onUpdateInput(val, 'edad')}/>
                </div>
            </div>

            </Dialog>

        </div>
    )
}

export default Estudiante