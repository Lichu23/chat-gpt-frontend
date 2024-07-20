import { TextField } from "@mui/material";

type InputProps = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: InputProps) => {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      inputProps={{style:{width: "100%", borderRadius: 10, fontSize: 16, color:"white"}}}
    />
  );
};

export default CustomizedInput;
