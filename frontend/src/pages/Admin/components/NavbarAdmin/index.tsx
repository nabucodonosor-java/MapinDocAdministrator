import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const NavbarAdmin = () => (
    <nav className="admin-nav-admin-container">
        <ul>
            <li>
                <NavLink to="/admin/doctors" className="admin-nav-admin-item">
                    Médicos 
                </NavLink> 
            </li>            
            <li>
                <NavLink to="/admin/specialties" className="admin-nav-admin-item">
                    Especialidades
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/specializations" className="admin-nav-admin-item">
                    Especializações
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/places" className="admin-nav-admin-item">
                    Locais de Atendimento
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/lab" className="admin-nav-admin-item">
                    Laboratório
                </NavLink>
            </li>           
        </ul>
    </nav>
);

export default NavbarAdmin;