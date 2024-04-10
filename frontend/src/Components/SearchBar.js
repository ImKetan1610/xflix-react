import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

export const SearchBar = ({ change }) => {
  return (
    <>
      <CssTextField
        onChange={change}
        sx={{ width: "20rem"}}
        label="search"
        size = "small"
        id="custom-css-outlined-input"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="white" />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
