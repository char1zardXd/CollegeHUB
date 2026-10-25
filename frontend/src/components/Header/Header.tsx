import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigationItems, profileRoute } from "../../navigation";
import "./Header.css";

export default function Header() {
    const { pathname } = useLocation();
    const currentTitle = pathname === profileRoute
        ? 'Профіль'
        : navigationItems.find((item) => item.path === pathname)?.title ?? 'Тести та Квізи';

    return (
        <header className="site-header">
            <h1 className="header-title">{currentTitle}</h1>
            <div className="header-actions">
                <label className="header-search">
                    <Search size={19} strokeWidth={2} aria-hidden="true" />
                    <input type="search" placeholder="Пошук..." aria-label="Пошук" />
                </label>
                <Link className="header-avatar" to={profileRoute} aria-label="Профіль">П</Link>
            </div>
        </header>
    );
}
