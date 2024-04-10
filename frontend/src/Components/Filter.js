import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";

export const Filter = ({ func1, func2, funcChange, handleSortBy }) => {
  //Genere
  const [allGenere, setAllGenere] = useState(true);
  const [education, setEducation] = useState(false);
  const [sports, setSports] = useState(false);
  const [comedy, setComedy] = useState(false);

  // Age
  const [allAge, setAllAge] = useState(true);
  const [seven, setSeven] = useState(false);
  const [twelve, setTwelve] = useState(false);
  const [sixteen, setSixteen] = useState(false);
  const [eighteen, setEighteen] = useState(false);

  // for allAge
  const allAgeTrue = () => {
    setAllAge(true);
    setSixteen(false);
    setSeven(false);
    setTwelve(false);
    setEighteen(false);
  };

  // for age seven
  const sevenTrue = () => {
    setAllAge(false);
    setSeven(true);
    setTwelve(false);
    setSixteen(false);
    setEighteen(false);
  };

  // for age twelve
  const twelveTrue = () => {
    setAllAge(false);
    setSeven(false);
    setTwelve(true);
    setSixteen(false);
    setEighteen(false);
  };

  //for age sixteen
  const sixteenTrue = () => {
    setAllAge(false);
    setSeven(false);
    setTwelve(false);
    setSixteen(true);
    setEighteen(false);
  };

  //for age eighteen
  const eighteenTrue = () => {
    setAllAge(false);
    setSeven(false);
    setTwelve(false);
    setSixteen(false);
    setEighteen(true);
  };

  const caseTrue = {
    backgroundColor: "white",
    color: "black",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    mx: "1rem",
    my: "1rem",
    ":hover": {
      bgColor: "white",
      color: "black",
    },
  };

  const caseFalse = {
    // bgColor: "primary.main",
    backgroundColor:"black",
    color: "white",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    mx: "1rem",
    my: "1rem",
    ":hover": {
      bgColor: "primary.light",
      color: "white",
    },
    ":active": {
      bgColor: "white",
      color: "black",
    },
  };

  const matches = useMediaQuery("(min-width:750px");

  const toggleGenere = () => {
    setAllGenere(true);
    setComedy(false);
    setEducation(false);
    setSports(false);
  };

  const restOfGenere = (e) => {
    setAllGenere(false);
    const name = e.target.value;
    if (name === "Comedy") {
      setComedy(true);
      setAllGenere(false);
      setEducation(false);
      setSports(false);
    }
    if (name === "Education") {
      setComedy(false);
      setAllGenere(false);
      setEducation(true);
      setSports(false);
    }
    if (name === "Sports") {
      setComedy(false);
      setAllGenere(false);
      setEducation(false);
      setSports(true);
    }
  };

  return (
    <Box
      key={"outerdiv"}
      sx={{
        backgroundColor: "#181818",
        marginTop: "3vh",
        paddingTop: "5vh",
        width: "full",
        height: "auto",
        bgColor: "primary.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!matches ? <SearchBar change={funcChange} /> : ""}
      <Box
        key={"genre-button"}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Button
          key={"All-Genere-Btn"}
          value={"All-Genere-Btn"}
          onClick={(e) => {
            toggleGenere();
            func1(e);
          }}
          variant="contained"
          name="All-Genere-Button"
          className = "genre-btn"
          sx={allGenere ? caseTrue : caseFalse}
        >
          All-Genere-Button
        </Button>

        <Button
          key={"Education"}
          value={"Education"}
          onClick={(e) => {
            restOfGenere(e);
            func1(e);
          }}
          variant="contained"
          className = "genre-btn"
          name="Education"
          sx={education ? caseTrue : caseFalse}
        >
          Education
        </Button>

        <Button
          key={"Sports"}
          value={"Sports"}
          onClick={(e) => {
            restOfGenere(e);
            func1(e);
          }}
          variant="contained"
          className = "genre-btn"
          name="Sports"
          sx={sports ? caseTrue : caseFalse}
        >
          Sports
        </Button>

        <Button
          key={"Comedy"}
          value={"Comedy"}
          onClick={(e) => {
            restOfGenere(e);
            func1(e);
          }}
          variant="contained"
          className = "genre-btn"
          name="Comedy"
          sx={comedy ? caseTrue : caseFalse}
        >
          Comedy
        </Button>

        <Button
          key={"Lifestyles"}
          value={"Lifestyles"}
          onClick={(e) => {
            restOfGenere(e);
            func1(e);
          }}
          variant="contained"
          name="Lifestyles"
          className = "genre-btn"
          sx={caseFalse}
        >
          Lifestyles
        </Button>

        <Stack
          Sx={{
            bgColor: "white",
            color: "black",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "25px",
            cursor: "pointer",
            width: "200px",
            margin: "auto",
          }}
          direction="row"
          alignItems="center"
          gap="10px"
        >
          <SortIcon color="white" />
          <select
            sx={{ border: "none" }}
              // value={sortBy}
            onChange={handleSortBy}
            className="sort-select"
          >
            <option
              style={{ height: "50px" }}
              id="release-date-option"
              value={"releaseDate"}
            >
              Release Date
            </option>
            <option id="view-count-option" value={"viewCount"}>
              View Count
            </option>
          </select>
        </Stack>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          key={"all-age"}
          value={"Anyone"}
          onClick={(e) => {
            allAgeTrue();
            func2(e);
          }}
          variant="contained"
          name="AnyAge"
          sx={allAge ? caseTrue : caseFalse}
          className = "content-rating-btn"
        >
          Any Age Group
        </Button>

        <Button
          key={"7+"}
          value={7}
          onClick={(e) => {
            sevenTrue();
            func2(e);
          }}
          variant="contained"
          name="seven"
          sx={seven ? caseTrue : caseFalse}
          className = "content-rating-btn"
        >
          7+
        </Button>

        <Button
          key={"12+"}
          value={12}
          onClick={(e) => {
            twelveTrue();
            func2(e);
          }}
          variant="contained"
          name="twelve"
          sx={twelve ? caseTrue : caseFalse}
          className = "content-rating-btn"
        >
          12+
        </Button>

        <Button
          key={"16+"}
          value={16}
          onClick={(e) => {
            sixteenTrue();
            func2(e);
          }}
          variant="contained"
          name="sixteen"
          sx={sixteen ? caseTrue : caseFalse}
          className = "content-rating-btn"
        >
          16+
        </Button>

        <Button
          key={"18+"}
          value={18}
          onClick={(e) => {
            eighteenTrue();
            func2(e);
          }}
          variant="contained"
          name="eighteen"
          sx={eighteen ? caseTrue : caseFalse}
          className = "content-rating-btn"
        >
          18+
        </Button>
      </Box>
    </Box>
  );
};
