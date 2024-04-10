import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../utils/Loading";
import { TimeFormat } from "../utils/TimeFormat";
import { Navbar } from "./Navbar";
import { config } from "../App";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { LandingPage } from "./LandingPage";
import { Divider } from '@mui/material';

export const VideoPage = () => {
  const { enquequeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const { id } = useParams();

  const fetchVideoById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/${id}`);
      const data = await response.data;
      console.log("data", data);
      setLoading(false);
      setSelectedVideo(data);
      setUpVote(data.votes.upVotes);
      setDownVote(data.votes.downVotes);
    } catch (error) {
      enquequeSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const updateViews = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/${id}/views`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideoById();
    updateViews();
  }, [id]);

  const patchVoteData = async (vote) => {
    const voteData = {
      vote: vote,
      change: "increase",
    };

    try {
      const response = await axios.patch(
        `${config.endpoint}/${id}/votes`,
        voteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      enquequeSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
    patchVoteData("upVote");
  };

  const handleDownVote = () => {
    setDownVote(downVote + 1);
    patchVoteData("downVote");
  };

  return (
    <Box sx={{ marginTop: "3vh" }}>
      <Navbar videoDetails={true} />
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#181818" 
          }}
        >
          <Box className="iframe-container" width="90%" height="80vh">
            <iframe
              className="iframe"
              src={`https://www.${selectedVideo.videoLink}`}
              title={`${selectedVideo.title}`}
              width="100%"
              height="100%"
            />
          </Box>

          <Box sx={{ width: "80vw", marginTop: "16px" }}>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Box sx={{ color: "white" }}>
                <Typography variant="h5">{selectedVideo.title}</Typography>
                <Typography variant="p">
                  {selectedVideo.contentRating} |{" "}
                  {<TimeFormat releaseDate={selectedVideo.releaseDate} />}
                </Typography>
              </Box>

              <Box>
                <Button onClick={handleUpVote}>
                  <Stack direction="row" gap="10px" alignItems={"center"}>
                    <ThumbUpIcon />
                    <Typography
                      variant="p"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      {upVote}
                    </Typography>
                  </Stack>
                </Button>
                <Button onClick={handleDownVote}>
                  <Stack direction="row" gap="10px" alignItems={"center"}>
                    <ThumbDownIcon />
                    <Typography
                      variant="p"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      {downVote}
                    </Typography>
                  </Stack>
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
      <Divider className="MuiDivider-middle" variant="middle" />
      <LandingPage videoDetails={true} />
    </Box>
  );
};
