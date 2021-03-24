import { Menubar } from 'primereact/menubar';

const Layout = (props) => {

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command:()=>{ window.location="/home"; }},
        {label: 'Estudiantes', icon: 'pi pi-fw pi-users', command:()=>{ window.location="/estudiantes"; }},
        {label: 'Cursos', icon: 'pi pi-fw pi-book', command:()=>{ window.location="/cursos"; }},
        {label: 'Matriculas', icon: 'pi pi-fw pi-pencil', command:()=>{ window.location="/matriculas"; }}
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://mitocode.com/assets/img/mitocode.png'} height="40" className="p-mr-2"></img>;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} />
            </div>

            <div className="card">
                {props.children}
            </div>
        </div>
    );
    
}


export default Layout