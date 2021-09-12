import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss'; 
 
const NavbarAdmin = () => (   
    <nav className="admin-nav-container"> 
        <ul>
            <li>
                <NavLink to="/admin/doctors" className="admin-nav-item">
                    Médicos 
                </NavLink> 
            </li>            
            <li>
                <NavLink to="/admin/specialties" className="admin-nav-item">
                    Especialidades
                </NavLink> 
            </li>
            <li>
                <NavLink to="/admin/specializations" className="admin-nav-item">
                    Especializações
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
        </ul>
    </nav>
);

export default NavbarAdmin;