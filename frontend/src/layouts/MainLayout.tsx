import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { Search, LogOut } from "lucide-react";

const menu = [
    { to: "/my-learning", label: "Моє навчання" },
    { to: "/courses", label: "Доступні курси" },
    { to: "/quizzes", label: "Тести та Квізи" },
    { to: "/calendar", label: "Календар" },
    { to: "/analytics", label: "Аналітика та прогрес" },
];

// Заголовок в шапці залежить від адреси
const titles: Record<string, string> = {
    "/": "Головна",
    "/students": "Студенти",
    "/assignments": "Завдання",
    ...Object.fromEntries(menu.map((item) => [item.to, item.label])),
};

export default function MainLayout() {
    const { pathname } = useLocation();
    const title = titles[pathname] ?? "CollegeHub";

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <Link to="/" className="sidebar-logo">
                    <h2>CollegeHub</h2>
                </Link>

                <nav>
                    {menu.map((item) => (
                        <NavLink key={item.to} to={item.to}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <button type="button" className="sidebar-logout">
                    <LogOut size={16} />
                    Вийти
                </button>
            </aside>

            <div className="main">
                <header className="topbar">
                    <h1 className="topbar-title">{title}</h1>

                    <div className="topbar-actions">
                        <label className="topbar-search">
                            <Search size={16} />
                            <input type="search" placeholder="Пошук..." />
                        </label>

                        <button type="button" className="topbar-avatar" aria-label="Профіль">
                            П
                        </button>
                    </div>
                </header>

                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}