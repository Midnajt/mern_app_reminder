import Wrapper from '../assets/wrappers/LandingPage.js';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga laborum nihil at nesciunt officia alias facilis modi ea, quos esse illum inventore provident sint vel earum repre</p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/register" className="btn login-link">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
