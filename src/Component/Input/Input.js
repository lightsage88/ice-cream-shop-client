import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  return (
    <>
      <input
        id="standard-basic"
        label="Your City, State Abbreviation"
        variant="standard"
        placeholder="Alpharetta, GA"
        onChange={(e) => props.updateTargetCity(e)}
      />
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
