import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('auth/register', data);
    toast.success('Registration successful!');
    return redirect('/login');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg || 'Registration failed!');
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Johny"></FormRow>
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Smith"
        ></FormRow>
        <FormRow type="text" name="location" defaultValue="earth"></FormRow>
        <FormRow
          type="email"
          name="email"
          defaultValue="j.smith@gmail.com"
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          defaultValue="start!125"
        ></FormRow>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
