import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { logout } from "../redux/actions/login.actions";

const Home = (props) => {
  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: {
      inputText: "",
    },
  });

  const { errors } = formState;
  const [editMode, setEditMode] = useState(null);
  const [boxes, setBoxes] = useState(() => {
    const storedBoxes = localStorage.getItem("boxes");
    return storedBoxes ? JSON.parse(storedBoxes) : [[], [], [], []];
  });

  useEffect(() => {
    register("inputText", { required: "Please enter a valid card text." });
  }, [register]);

  // Function to add a new card in the box
  const handleAddCard = async (data) => {
    const updatedBoxes = [...boxes];
    // Updating Card
    if (editMode) {
      const { boxIndex, cardIndex } = editMode;
      updatedBoxes[boxIndex][cardIndex].text = data.inputText;
      setEditMode(null);
    }
    // Adding new Card
    else {
      updatedBoxes[0].push({
        text: data.inputText,
      });
    }

    setBoxes(updatedBoxes);
    reset();
  };

  // Function to move Cards back and forward in the boxes
  const moveCard = (newBoxIndex, currentBoxIndex, card, cardIndex) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[newBoxIndex].push(card);
    updatedBoxes[currentBoxIndex].splice(cardIndex, 1);
    setBoxes(updatedBoxes);
  };

  const handleEdit = (card, index, i) => {
    setValue("inputText", card.text);
    setEditMode({ boxIndex: index, cardIndex: i });
  };

  const handleDelete = (index, i) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].splice(i, 1);
    setBoxes(updatedBoxes);
  };

  useEffect(() => {
    // Save the boxes data to local storage whenever it changes
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  return (
    <div className="card-manager-container">
      <div className="header">
        <h2 className="home-heading">Home Page</h2>
        <button className="btn btn-danger" onClick={() => props.logout()}>
          Logout
        </button>
      </div>
      <div className="input-container">
        <div className="input-holder">
          <input
            type="text"
            {...register("inputText", {
              required: "Please enter a valid card text.",
            })}
            placeholder="Enter card text"
            className="input-text"
          />

          <div className="error-container">
            <p className="error-message">
              {errors ? errors?.inputText?.message : ""}
            </p>
          </div>
        </div>
        <button onClick={handleSubmit(handleAddCard)} className="add-button">
          {editMode ? "Edit Card" : "Add Card"}
        </button>
      </div>

      <div className="boxes-container">
        {boxes?.map((box, boxIndex) => (
          <>
            <div
              key={boxIndex}
              className={`card-box ${box.selected ? "selected-box" : ""}`}
            >
              <h2>{boxIndex + 1}</h2>
              {box?.map((card, cardIndex) => (
                <div className="card" key={cardIndex}>
                  <div className="card-body">
                    <h5 className="card-title">
                      <p>{card.text}</p>
                    </h5>

                    <div className="button-container">
                      <button
                        onClick={() =>
                          moveCard(boxIndex - 1, boxIndex, card, cardIndex)
                        }
                        disabled={boxIndex === 0 || editMode}
                        className="btn btn-primary"
                      >
                        Back
                      </button>
                      <button
                        onClick={() =>
                          moveCard(boxIndex + 1, boxIndex, card, cardIndex)
                        }
                        disabled={boxIndex === boxes.length - 1 || editMode}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                      <button
                        onClick={() => handleEdit(card, boxIndex, cardIndex)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(boxIndex, cardIndex)}
                        className="btn btn-primary"
                        disabled={editMode}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const mapDispacthToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};
export default connect(null, mapDispacthToProps)(Home);
