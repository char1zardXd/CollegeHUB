import { NavLink, Outlet } from "react-router-dom";
import { House, Users, BookOpen } from "lucide-react";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>CollegeHUB</h2>

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
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}