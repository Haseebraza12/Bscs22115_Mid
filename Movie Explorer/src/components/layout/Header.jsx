import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import logoImage from '../../assets/download.jpg'; // Add your logo image
import './Header.css';

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header-content">
        <Link to="/" className="logo-container">
          <img src={logoImage} alt="MovieFlix" className="logo-image" />
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>

        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;