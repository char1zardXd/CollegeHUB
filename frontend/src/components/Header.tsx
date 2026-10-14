import { Link } from 'react-router-dom';
import "./Header.css"
import logoImg from '../assets/placeholder.png';

function Header() {
    return (
        <header className="site-header">
            <Link to="/">
                <img src={logoImg} alt="Логотип" className="logo-img" />
            </Link>
            <div>
                <input type="text"
                       placeholder="Пошук..."
                />
            </div>
            <Link to="/profile">
                Аватар
            </Link>
        </header>
    )
}
export default Header;