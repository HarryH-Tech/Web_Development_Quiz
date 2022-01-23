import React, { useState, useContext } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
// import { browserSessionPersistence } from 'firebase/auth';

//Import Router Components
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

//DB and Auth Imports
import firebase from '../../firebase';
import { AuthContext } from '../Context/Auth';

const Login = ({ history }) => {
  //Create and destructure state values
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const [appDetails, setAppDetails] = useState({
    errors: [],
    loading: false,
  });

  const { email, password } = userDetails;
  const { errors, loading } = appDetails;

  //If error, specify which input field caused the error
  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  //Show error message
  const displayErrors = (errors) => {
    if (errors.length > 1) {
      errors.pop();
    }
    return errors.map((error, i) => <p key={i}>{error.message}</p>);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(userDetails)) {
      setAppDetails({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          history.push('/');
        })

        .catch((err) => {
          setAppDetails({
            errors: errors.concat(err),
            loading: false,
          });
        });
    }
  };

  //Check email and password fields are not empty
  const validateForm = ({ email, password }) => email && password;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 600, height: 400 }}>
        <Header as="h1" color="blue" textAlign="center">
          <div style={{ textAlign: 'center' }}>
            <Icon float="left" name="chrome" color="blue" />
            <Icon float="right" name="question" color="blue" />
            <Icon float="left" name="html5" color="blue" />
          </div>
          Web Development Quiz
        </Header>
        <Header as="h2" color="black" textAlign="center">
          {'  '}Login
        </Header>

        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              required
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
              type="email"
              value={email}
              className={handleInputError(errors, 'email')}
            />

            <Form.Input
              required
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
              type="password"
              value={password}
              className={handleInputError(errors, 'password')}
            />

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color="green"
              fluid
              size="large"
              icon
              labelPosition="left"
            >
              <Icon name="sign in" />
              Log In
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error:</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Don't Have an Account?
          <br />
          <br />
          <Link style={{ color: '#FFF' }} to="/register">
            <Button compact color="blue">
              Register Here
            </Button>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
