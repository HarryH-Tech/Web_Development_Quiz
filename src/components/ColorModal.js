import React, { useContext } from "react";
import { Segment, Button, Modal, Icon, Label } from "semantic-ui-react";
import { SliderPicker } from "react-color";
import { SET_CLOSE_MODAL, SET_NAVBAR_COLOR } from "./Context/reducers/types";
import QuizContext from "./Context/QuizContext";

const ColorModal = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { modal, primaryColor } = state;

  const closeModal = () => {
    dispatch({ type: SET_CLOSE_MODAL, action: false });
  };

  const handleChangePrimary = (color) => {
    dispatch({ type: SET_NAVBAR_COLOR, action: color.hex });
  };

  return (
    <>
      <QuizContext.Provider value={{ state, dispatch }}>
        <Modal basic open={modal} onClose={closeModal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color"></Label>
              <SliderPicker
                color={primaryColor}
                onChange={handleChangePrimary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={closeModal}>
              <Icon name="checkmark" /> Save Colours
            </Button>
          </Modal.Actions>
        </Modal>
      </QuizContext.Provider>
    </>
  );
};

export default ColorModal;
