import { LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems } from "../../navigation";
import { useAuth } from '../../auth/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

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
            <button type="button" className="sidebar-footer" onClick={handleLogout}>
                <LogOut size={18} strokeWidth={1.9} aria-hidden="true" />
                <span>Вийти</span>
            </button>
        </aside>
    );
}
