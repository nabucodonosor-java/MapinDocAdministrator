import 'bootstrap/js/src/collapse.js';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar-dark navbar navbar-expand-md bg-primary navbar-container">
      <div className="container-fluid">
        <a href="link" className="navbar-logo">
          <img
            src="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/logo.png"
            alt="logo"
            className="navbar-logo-img" 
          />
          <h4>DocAdmin</h4>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#docadmin-navbar"
          aria-controls="docadmin-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="docadmin-navbar">
          <ul className="navbar-nav offset-md-1 navbar-main-menu">
          <li>
              <a href="link" className="active">HOME</a>
            </li>
            <li>
              <a href="link">MARKETING</a>
            </li>
            <li>
              <a href="link">LABORATÓRIO</a>
            </li>
            <li>
              <a href="link">ADMIN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
