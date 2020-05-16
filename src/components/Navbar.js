import React, { useContext } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import firebase from "../firebase";
import { SET_OPEN_MODAL } from "./Context/reducers/types";
import QuizContext from "./Context/QuizContext";

const Navbar = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { primaryColor } = state;

  const openModal = () => {
    dispatch({ type: SET_OPEN_MODAL, action: true });
  };

  return (
    <Segment style={{ backgroundColor: primaryColor }}>
      <Header as="h1" inverted>
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => firebase.auth().signOut()} color="red">
            Sign Out
          </Button>
          <Button
            color="yellow"
            style={{ marginRight: "1em" }}
            onClick={openModal}
          >
            Change The Navbar Color
          </Button>
        </div>
      </Header>
    </Segment>
  );
};

export default Navbar;
