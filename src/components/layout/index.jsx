import { Menubar } from 'primereact/menubar';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../../redux/actions/auth'
import { validateMenus } from '../../utils/helper';

const Layout = (props) => {
    const location = useLocation()
    const history = useHistory()
    const state = useSelector((state) => state.auth)

    const goTo = (path) => {
        console.log(path)
        history.push(path)
      }

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command:()=>{ goTo("/home"); }},
        {label: 'Estudiantes', icon: 'pi pi-fw pi-users', command:()=>{ goTo("/estudiantes"); }},
        {label: 'Cursos', icon: 'pi pi-fw pi-book', command:()=>{ goTo("/cursos"); }},
        {label: 'Matriculas', icon: 'pi pi-fw pi-pencil', command:()=>{ goTo("/matriculas"); }}
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://mitocode.com/assets/img/mitocode.png'} height="40" className="p-mr-2"></img>;



    if (location.pathname === '/login') {
        return props.children
      }

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