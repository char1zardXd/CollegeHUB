import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">CollegeHub</div>

            <nav className="sidebar-nav">
                <NavLink to="/HomePage">Головна</NavLink>
                <NavLink to="/subjects">Мої дисципліни</NavLink>
                <NavLink to="/flashcards">Флеш-картки</NavLink>
                <NavLink to="/leaderboard">Рейтинг</NavLink>
                <NavLink to="/quizzes">Тести та Квізи</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;