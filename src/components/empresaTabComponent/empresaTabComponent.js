import './empresaTabComponent.css'
import logo from './logo_papeleria.png'
import { useSelector } from 'react-redux'
export const EmpresaTabComponent = () => {
    const {user} = useSelector(state => state.session)
    return (
        <div>
            <div className='text-center'>
                <h2 className='mb-3'>EMPRESA: PAPELERIA SAS</h2>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-5 mt-5">
                <div>
                    <h2 className='mb-3'>DATOS DEL USUARIO</h2>
                    <div>
                        <p><strong>NOMBRE: </strong>
                        <span data-testid="user_nombre">{user.nombre}</span></p>
                        <p><strong>USUARIO: </strong>
                        <span data-testid="user_username">{user.usuario}</span></p>
                        <p><strong>CORREO: </strong>
                        <span data-testid="user_correo">{user.correo}</span></p>
                    </div>
                </div>
                <div>
                    <img src={logo} alt="Logo" className='img-fluid logo_sas'/>
                </div>
                
            </div>
        </div>
    )
}