import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Loading } from "../utils/Loading.js";
import { Videogrid } from "./Videogrid";
import axios from "axios";
import { config } from "../App";
import { Filter } from "./Filter";

export const LandingPage = ({ videoDetails }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [sort, setSort] = useState("");
  const [arrGenere, setGenere] = useState([]);
  const [age, setAge] = useState(null);
  const [params, setParams] = useState("");

  useEffect(() => {
    // console.log("videos",videos)
    getVideos();
  }, []);

  useEffect(() => {
    apifilterCall();
    thefinalCall();
  }, [arrGenere, sort, age]);

  const getVideos = async () => {
    setLoading(true);
    await axios
      .get(config.endpoint)
      .then((res) => {
        setLoading(false);
        setVideos(res.data.videos);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    setLoading(false);
  };

  const debounceSearch = (e) => {
    setLoading(true);
    setTimeout(async () => {
      // await axios.get(config.endpoint + "?title=" + e.target.value)
      //   .then((res) => {
      //     console.log("res", res);
      //     // setLoading(false);
      //     // setVideos(res.data.videos);
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     console.log("error",error);
      //   });
      try {
        let res = await fetch(config.endpoint + "?title=" + e.target.value);
        let data = await res.json();
        setVideos(data.videos)
        setLoading(false);

      } catch (error) {
        console.log("error",error)
        setLoading(false);
      }
      setLoading(false);
    }, 500);
    setLoading(false);
  };

  const func1 = async (e) => {
    const receivedData = e.target.value;
    if ("Lifestyle" === receivedData || "All-Genere-Btn" === receivedData) {
      setGenere([]);
    } else {
      setGenere((previousArr) => [...previousArr, receivedData]);
    }
  };

  const func2 = async (e) => {
    let response = e.target.value;
    if ("Anyone" === response) {
      setAge(null);
    } else {
      setAge(response);
    }
  };

  const handleSortBy = (e) => {
    setSort(e.target.value);
  };

  const apifilterCall = async () => {
    if (arrGenere.length !== 0 && age === null && sort === "") {
      const newarr = arrGenere.join(",");
      console.log(newarr);
      setParams("?genres=" + newarr);
    }
    if (arrGenere.length === 0 && sort === "" && age) {
      setParams("?contentRating=" + age + "%2B");
    }
    if (arrGenere.length === 0 && !age && sort.length !== 0) {
      setParams("?sortBy=" + sort);
    }
    if (arrGenere.length !== 0 && age && sort === "") {
      const newarr = arrGenere.join(",");
      setParams("?genres=" + newarr + "&contentRating=" + age + "%2B");
    }
    if (arrGenere.length === 0 && age && sort.length !== 0) {
      setParams(`?contentRating=${age}%2B&sortBy=${sort}`);
    }
    if (arrGenere.length !== 0 && !age && sort.length !== 0) {
      const newarr = arrGenere.join(",");
      setParams("?genres=" + newarr + "&sortBy=" + sort);
    }
    if (arrGenere.length !== 0 && age && sort.length !== 0) {
      const newarr = arrGenere.join(",");
      setParams(
        "?generes=" +
          newarr +
          "&sortBy=" +
          sort +
          "&contentRating" +
          age +
          "%2B"
      );
    }
  };
  const thefinalCall = async () => {
    setLoading(true);
    await axios
      .get(config.endpoint + params)
      .then((res) => {
        setLoading(false);
        setVideos(res.data.videos);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    setLoading(false);
  };
  console.log("params", params);

  return (
    <div>
      <Box sx={{backgroundColor:"#181818"}}>
        {!videoDetails && (
          <>
            <Navbar funcChange={debounceSearch} />
            <Filter
              funcChange={debounceSearch}
              func1={func1}
              func2={func2}
              handleSortBy={handleSortBy}
            />
          </>
        )}
        <Box sx={{ width: "full", height: "auto" }}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Box sx={{ padding: "3rem 5rem" }}>
                <Grid container spacing={2}>
                  {videos.map((video) => {
                    return (
                      <Grid key={video._id} item xs={12} sm={6} md={3}>
                        <Videogrid video={video} sortBy={sort} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};
