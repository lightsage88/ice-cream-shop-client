import { useState } from "react";

const Input = (props) => {
  const [inputString, setInputString] = useState("");
  const xMove = (e) => {
    let value;
    if (e !== "reset") {
      value = e.target.value;
    } else {
      value = "alpharetta, ga";
    }
    setInputString(value);
  };
  return (
    <>
      <input
        id="standard-basic"
        label="Your City, State Abbreviation"
        variant="standard"
        placeholder="Alpharetta, GA"
        onChange={(e) => xMove(e)}
      />
      <button onClick={() => props.updateTargetCity(inputString)}>
        Let's Dish!
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          props.updateTargetCity("reset");
          document.getElementById("standard-basic").value = "Alpharetta, GA";
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Input;
