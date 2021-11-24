import { NavLink } from 'react-router-dom';
import './styles.scss'; 
 
const NavbarAdmin = () => (   
    <nav className="admin-nav-container">  
 
        <ul>
            <li>
                <NavLink to="/admin/hp" className="admin-nav-item"> 
                    Saúde 
                </NavLink> 
            </li>            
            <li>
                <NavLink to="/admin/places" className="admin-nav-item">
                    Locais
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/visits" className="admin-nav-item">
                    Visitas
                </NavLink> 
            </li>   
            <li>
                <NavLink to="/admin/prescriptions" className="admin-nav-item">
                    Receitas
                </NavLink> 
            </li>
            <li>
                <NavLink to="/admin/products" className="admin-nav-item">
                    Produtos
                </NavLink> 
            </li>
            <li>
                <NavLink to="/admin/social" className="admin-nav-item">
                    Social 
                </NavLink> 
            </li>  
            <li>
                <NavLink to="/admin/professions" className="admin-nav-item">
                    Profissões
                </NavLink> 
            </li>
            <li>
                <NavLink to="/admin/specializations" className="admin-nav-item">
                    Especializações
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/secretaries" className="admin-nav-item">
                    Secretárias
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/users" className="admin-nav-item">
                    Usuários
                </NavLink>
            </li>       
        </ul>
    </nav>
);

export default NavbarAdmin;