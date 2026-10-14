import {NavLink} from 'react-router-dom';
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink to="/HomePage" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Головна
                </NavLink>
                <NavLink to="/subjects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Мої дисципліни
                </NavLink>
                <NavLink to="/flashcards" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Флеш-картки
                </NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Рейтинг
                </NavLink>
            </nav>
        </aside>
    )
}
export default Sidebar;