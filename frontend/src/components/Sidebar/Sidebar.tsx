import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from "../../navigation";
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar" aria-label="Бічна навігація">
            <NavLink to="/tests" className="sidebar-brand">CollegeHub</NavLink>
            <nav className="sidebar-nav" aria-label="Основні розділи">
                {navigationItems.map(({ path, title }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                    >
                        {title}
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer" title="Авторизація ще не підключена">
                <LogOut size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>Вийти</span>
            </div>
        </aside>
    );
}
