import React, { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  Box,
  Stack,
  Typography,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSnackbar } from "notistack";
// import { useSnackbar } from "notistack";
import { config } from "../App";

export const UploadVideo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const [postData, setPostData] = useState({
    videoLink: "",
    previewImage: "",
    title: "",
    contentRating: "",
    genre: "",
    releaseDate: value,
  });

  let dateString = "";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLink = (link) => {
    let urlLink;

    try {
      urlLink = new URL(link);
      // console.log("urlLink", urlLink)
      let videoParam = urlLink.searchParams.get("v");
      // console.log('videoParam', videoParam);
      const finalVideoLink = `youtube.com/embed/${videoParam}`;
      console.log("finalVideoLink", finalVideoLink);
      setPostData({ ...postData, videoLink: finalVideoLink });
    } catch (error) {
      console.log("Invalid URL:", error);
    }
  };

  const handleDateChange = (newValue) => {
    const date1 = new Date(newValue);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date1
    );
    setValue(formattedDate);
    const years = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = newValue.getDate();
    const month = years[newValue.getMonth()];
    const fullYear = newValue.getFullYear();

    dateString = date + " " + month + " " + fullYear;
    setPostData({ ...postData, releaseDate: dateString });
  };

  const handleSubmit = async (dataPost) => {
    const data = dataPost;
    if (
      data.videoLink &&
      data.title &&
      data.genre &&
      data.releaseDate &&
      data.contentRating &&
      data.previewImage
    ) {
      try {
        const response = await axios.post(`${config.endpoint}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleClose();
        enqueueSnackbar("Upload Successfully", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    } else if (!data.videoLink) {
      enqueueSnackbar("Link must be a valid URL", { variant: "warning" });
    } else {
      enqueueSnackbar("All fields are required", { variant: "warning" });
    }
  };

  return (
    <div>
      <Button
        id="upload-btn"
        className="upload-button"
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          ":hover": {
            bgcolor: "primary.light",
            color: "white",
          },
        }}
        variant="contained"
        startIcon={<FileUploadIcon />}
        onClick={handleOpen}
      >
        Upload
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{
        //   backgroundColor: "white",
        //   maxWidth: "600px",
        //   margin: "auto",
        //   padding: "1rem",
        //   border: "1px solid grey",
        //   borderRadius: "5px",
        //   maxHeight: "650px",
        // }}
      >
        <Box className="upload-modal">
          <Stack gap="10px" justifyContent="flex-start">
            <Box
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="upload-btn-submit"
                variant="h6"
                component="h2"
                sx={{ marginTop: "5px", marginBottom: "5px", color: "white" }}
              >
                Upload Video
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  color: "white",
                }}
              />
            </Box>

            <TextField
              className="video-tile-link"
              id="upload-btn-video"
              label="Video Link"
              variant="outlined"
              helperText="This link is used to derive the video"
              onChange={(e) => handleLink(e.target.value)}
            />

            <TextField
              className="video-tile-link"
              id="upload-btn-image"
              label="Video Thumbnail Image"
              variant="outlined"
              helperText="This link is used to preview the thumbnail image"
              onChange={(e) => {
                setPostData({ ...postData, previewImage: e.target.value });
              }}
            />

            <TextField
              className="video-tile-link"
              id="upload-btn-title"
              label="Video Title"
              varient="outlined"
              helperText="This title will be representative text for video"
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
              }}
            />

            <FormControl>
              <InputLabel id="genre">Genre</InputLabel>
              <Select
                className="genre-btn"
                labelId="genre"
                id="upload-btn-genre"
                label="Genre"
                value={postData.genre}
                onChange={(e) => {
                  setPostData({ ...postData, genre: e.target.value });
                }}
              >
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Lifestyles"}>Life Style</MenuItem>
              </Select>
              <FormHelperText sx={{ marginBottom: "4px" }}>
                Genre will help you in categorising your Video.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel id="age">Suitable age group for the clip.</InputLabel>
              <Select
                id="upload-btn-content-rating"
                className="age-btn"
                labelId="age"
                // id="ageFilter"
                label="Suitable age for the group"
                onChange={(e) => {
                  setPostData({ ...postData, contentRating: e.target.value });
                }}
              >
                <MenuItem value={"7+"}>7+</MenuItem>
                <MenuItem value={"12+"}>12+</MenuItem>
                <MenuItem value={"16+"}>16+</MenuItem>
                <MenuItem value={"18+"}>18+</MenuItem>
              </Select>
              <FormHelperText sx={{ marginBottom: "5px" }}>
                This will filter the video on basis of Age group suitability.
              </FormHelperText>
            </FormControl>
            <LocalizationProvider
              id="upload-btn-release-date"
              dateAdapter={AdapterDateFns}
            >
              <DesktopDatePicker
                label="Upload and Publish Date"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText="This will be used to sort the videos"
                  />
                )}
              />
            </LocalizationProvider>
            <Box
              id="upload-btn"
              sx={{
                alignItems: "center",
                gap: "1rem",
                borderRadius: 1,
              }}
            >
              <Button
                id="upload-btn-submit"
                variant="outlined"
                color="error"
                sx={{
                  color: "black",
                  textTransform: "uppercase",
                  border: 0,
                  backgroundColor: "white",
                  fontWeight: "bold",
                  marginRight: "20px"
                }}
                onClick={() => handleSubmit(postData)}
              >
                Upload Video
              </Button>
              <Button
                id="upload-btn-cancel"
                variant="outlined"
                color="error"
                size={"medium"}
                sx={{
                  color: "black",
                  textTransform: "uppercase",
                  border: 0,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
