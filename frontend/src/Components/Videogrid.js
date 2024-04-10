import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { TimeFormat } from "../utils/TimeFormat";

// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

export const Videogrid = ({ video, sortBy }) => {
  return (
    <Box sx={{border:"1px solid lightgrey", borderRadius:"5px", boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Card>
        <Link to={`/video/${video._id}`} className="video-tile-link">
          <CardMedia
            className="video-tile"
            component="img"
            height="250"
            width="250"
            sx={{ objectFit: "cover" }}
            alt="green image"
            image={video.previewImage}
          />
        </Link>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            // color: "#fff",
          }}
        >
          <Typography variant="p" sx={{fontWeight:"bold"}}>{video.title}</Typography>
          <Typography variant="p" component="div" sx={{display:"flex", justifyContent:"space-between", fontWeight:"bold"}}>
            <Typography variant="p">
              {sortBy === "releaseDate" ? (
                <TimeFormat releaseDate={video.releaseDate} />
              ) : (
                `${video.viewCount} views`
              )}
            </Typography>
            <Typography variant="p">{video.releaseDate}</Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
