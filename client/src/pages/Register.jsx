import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Johny"></FormRow>
        <FormRow type="text" name="lastName" labelText="Last Name" defaultValue="Smith"></FormRow>
        <FormRow type="text" name="location" defaultValue="earth"></FormRow>
        <FormRow type="email" name="email" defaultValue="j.smith@gmail.com"></FormRow>
        <FormRow type="password" name="password" defaultValue="start!125"></FormRow>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
