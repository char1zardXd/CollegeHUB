import { Link } from 'react-router-dom';
import "./Header.css"
import logoImg from '../assets/placeholder.png';

function Header() {
    return (
        <header className="site-header">
            <Link to="/HomePage" className="logo-link">
                <img src={logoImg} alt="Логотип" className="logo-img" />
            </Link>
            <div className="search-container">
                <input type="text"
                       placeholder="Пошук..."
                       className="search-input"
                />
            </div>
            <Link to="/UserProfilePage" className="profile-btn">
                Аватар
            </Link>
        </header>
    )
}
export default Header;