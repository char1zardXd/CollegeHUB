import { NavLink, Outlet } from "react-router-dom";
import { House, Users, BookOpen, ClipboardList } from "lucide-react";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>CollegeHub</h2>

                <nav>
                    <NavLink to="/" end>
                        <House size={20} />
                        Головна
                    </NavLink>

                    <NavLink to="/students">
                        <Users size={20} />
                        Студенти
                    </NavLink>

                    <NavLink to="/assignments">
                        <BookOpen size={20} />
                        Завдання
                    </NavLink>

                    <NavLink to="/quizzes">
                        <ClipboardList size={20} />
                        Тести та Квізи
                    </NavLink>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}