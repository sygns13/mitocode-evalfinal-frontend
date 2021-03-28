import React, { useEffect, useState, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as cursoActions from '../../redux/actions/cursos'
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';

const TYPE_MODAL_EDIT = 'edit'
const TYPE_MODAL_ADD = 'add'
const TYPE_DELETE = 'dele'

const DEFAULT_FORM = {
    nombre: '',
    siglas: '',
  }


function Curso(){
    const [cursoDialog, setCursoDialog] = useState(false)
    const [mostrarMensaje, setMensajeMostrar] = useState(false)
    const [typeForm, setTypeForm] = useState(null)
    const [modalForm, setModalForm] = useState(DEFAULT_FORM)

    const state = useSelector((state) => state.cursos)
    const dispatch = useDispatch()

    const getCursos = () => {
        dispatch(cursoActions.getListCursos())
        
      }
      

    const toast = useRef(null);

    useEffect(() => {
    getCursos();
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
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Curso Registrado', life: 3000 });
                        setMensajeMostrar(false);
                    }if(typeForm ===TYPE_MODAL_EDIT){
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Curso Editado', life: 3000 });
                        setMensajeMostrar(false);
                    }
                    if(typeForm ===TYPE_DELETE){
                        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Curso Eliminado', life: 3000 });
                        setMensajeMostrar(false);
                    }
                    
                        
                }
            }
        }
    }


    const nuevoCurso = () => {
        setTypeForm(TYPE_MODAL_ADD);
        setModalForm(DEFAULT_FORM);
        setCursoDialog(true);
    }

    const onDelete = (data) => {
        setTypeForm(TYPE_DELETE);
        setMensajeMostrar(true);
        const idCurso = data.id;
        dispatch(cursoActions.deleteCurso(idCurso, state));
      }

    const onEdit = (data) => {
    setTypeForm(TYPE_MODAL_EDIT)
    const newForm = {
        id: data.id,
        nombre: data.nombre,
        siglas: data.siglas,
    }
    setModalForm(newForm)
    setCursoDialog(true);
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
        setCursoDialog(false);
    }


    const onSubmitFormModal = () => {
        setMensajeMostrar(true);
        if (typeForm === TYPE_MODAL_ADD) {
            dispatch(cursoActions.addNewCurso(modalForm, state))
        } else {
          dispatch(cursoActions.editCurso(modalForm, state))
        }
        setCursoDialog(false);
        
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => onEdit(rowData)}  tooltip="Editar Curso" tooltipOptions={{position: 'top'}}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete (rowData)} tooltip="Eliminar Curso" tooltipOptions={{position: 'top'}}/>
            </React.Fragment>
        );
    }

    const cursoDialogFooter = (
        <div>
            {typeForm === TYPE_MODAL_ADD ? <Button label="Grabar" icon="pi pi-check" onClick={onSubmitFormModal} /> : <Button label="Actualizar" icon="pi pi-check" onClick={onSubmitFormModal} />}
            <Button label="Cerrar" icon="pi pi-times" onClick={hideDialog} />
        </div>
    );

    const estadoBodyTemplate = (rowData) => {
      return rowData.estado ? 'Activo' : 'Inactivo';
  }


    return(
        <div className="p-grid">
            <Toast ref={toast} />
            <div className="p-col-12">
                <div className="card  p-shadow-10"  style={{ padding: '10px'}}>
                <h4>Gestión de Cursos</h4>
                <div className="p-fluid">
                    <blockquote>Aquí puede gestionar los cursos del sistema</blockquote>
                </div>
                <br/>
                <Button label="Nuevo Curso" icon="pi pi-plus" className="p-button-raised p-button-info" onClick={nuevoCurso}/>
                </div>
            </div>

            <div className="p-col-12">
                <div className="card  p-shadow-10" style={{ padding: '10px'}}>
             <h5>Listado de Cursos Registrados</h5>

             {!state.list.data &&  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>}
             {state.list.data &&
                <div className="card" >
                    <DataTable value={ state.list.data} className="p-datatable-gridlines">
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="siglas" header="Siglas"></Column>
                        <Column field="estado" header="Estado" body={estadoBodyTemplate}></Column>
                        <Column  header="Gestión" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                }

                </div>
            </div>

            <Dialog visible={cursoDialog} style={{ width: '450px' }} header="Cursos" modal className="p-fluid" footer={cursoDialogFooter} onHide={hideDialog}>

                <h4>{typeForm === TYPE_MODAL_ADD ? 'Agregar' : 'Editar'} Curso</h4>

            <div className="p-field p-grid">
                <label htmlFor="nombre" className="p-col-12 p-md-2">Nombre</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="nombre" type="text"  value={modalForm.nombre} onChange={(val) => onUpdateInput(val, 'nombre')}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="siglas" className="p-col-12 p-md-2">Siglas</label>
                <div className="p-col-12 p-md-10">
                    <InputText id="siglas" type="text"  value={modalForm.siglas} onChange={(val) => onUpdateInput(val, 'siglas')}/>
                </div>
            </div>

            </Dialog>

        </div>
    )
}

export default Curso