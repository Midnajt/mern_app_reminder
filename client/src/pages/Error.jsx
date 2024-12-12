import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Error page</h1>
      <Link to="/">back gome</Link>

      <div>{error.data}</div>
    </div>
  );
};

export default Error;
