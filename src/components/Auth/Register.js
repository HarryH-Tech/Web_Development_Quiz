import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Progress,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import md5 from "md5";
import firebase from "../../firebase";
import { withRouter } from "react-router";

const Register = ({ history }) => {
  //Create and destructure state values
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usersRef: firebase.database().ref("users1"),
  });

  const [appDetails, setAppDetails] = useState({
    errors: "",
    loading: false,
    showTooltip: false,
  });

  const { username, email, password, confirmPassword, usersRef } = userDetails;
  const { errors, loading, showTooltip } = appDetails;

  //Validate Form Submission called in handleSubmit Function
  const validateForm = () => {
    if (isFormEmpty(userDetails)) {
      setAppDetails({ errors: "Please fill in all fields" });
      return false;
    } else if (!isPasswordValid(userDetails)) {
      setAppDetails({
        errors:
          "Password is invalid. It must be at least 6 letters long and both passwords must match.",
      });
      return false;
    } else if (passwordStrength < 50) {
      setAppDetails({
        errors: "Please ensure the password strength is above 50%.",
      });
    } else {
      return true;
    }
  };

  //Check if all form fields are filled in, called in validateForm function
  const isFormEmpty = ({ username, email, password, confirmPassword }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  // Validate password, called in validateForm function
  const isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  //Save User to DB, called in handleSubmit function
  const saveUser = (createdUser) => {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAppDetails({ errors: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (createdUser) => {
            createdUser.user
              .updateProfile({
                displayName: username,
                photoURL: `https://gravatar.com/avatar/${md5(
                  createdUser.user.email
                )}?d=identicon`,
              })
              .then(() => {
                saveUser(createdUser).then(() => {});
                history.push("/");
              })

              .catch((err) => {
                console.error(err);
                setAppDetails({ errors: errors.concat(err), loading: false });
              });
          },
          [history]
        )
        .catch((err) => {
          console.error(err);
          setAppDetails({ errors: errors.concat(err), loading: false });
        });
    }
  };

  /*
  Calculate Password Strength To 
  Show in Form Progress Bar
  */
  let passwordStrength = 0;
  const numberRegex = /\d/g;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (password.length > 5) {
    passwordStrength += 40;
  }
  if (numberRegex.test(password)) {
    passwordStrength += 30;
  }
  if (specialCharRegex.test(password)) {
    passwordStrength += 30;
  }

  const handlePasswordChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleOpenTooltip = () => {
    setAppDetails({ showTooltip: !showTooltip });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 600, height: 550 }}>
        <Header as="h1" color="blue" textAlign="center">
          <div style={{ textAlign: "center" }}>
            <Icon float="left" name="chrome" color="blue" />
            <Icon float="right" name="question" color="blue" />
            <Icon float="left" name="html5" color="blue" />
          </div>
          {"  "}Welcome To The Web Development Quiz{"  "}
        </Header>

        {/* Input Fields */}
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Username"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
              value={username}
              type="text"
            ></Form.Input>

            <Form.Input
              icon="mail"
              iconPosition="left"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
              value={email}
              type="email"
            ></Form.Input>

            <Form.Input
              icon="lock"
              iconPosition="left"
              name="password"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e)}
              value={password}
              type="password"
              onMouseOver={toggleOpenTooltip}
              onMouseLeave={toggleOpenTooltip}
            ></Form.Input>
            <div
              style={showTooltip ? { display: "block" } : { display: "none" }}
            >
              <ul>
                <strong>Passwords Should:</strong>
                <li>Be longer than 5 characters</li>
                <li>Contain at least 1 number</li>
                <li>Contain at least one non alpha numeric character</li>
              </ul>
            </div>

            <Progress
              progress
              percent={passwordStrength}
              color={passwordStrength > 50 ? "green" : "red"}
            >
              Password Strength
            </Progress>

            <Form.Input
              icon="plus circle"
              iconPosition="left"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  [e.target.name]: e.target.value,
                })
              }
              value={confirmPassword}
              type="password"
            ></Form.Input>

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="blue"
              fluid
              size="large"
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        {errors && (
          <Message error>
            <h3>Error:</h3>
            {errors}
          </Message>
        )}

        <Message style={{ marginBottom: "0.5rem" }}>
          Already a User?
          <br />
          <br />
          <Link style={{ color: "#FFF" }} to="/login">
            <Button compact color="green">
              Login
            </Button>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Register);
