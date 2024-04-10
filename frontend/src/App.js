import "./App.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage";
import { VideoPage } from "./Components/VideoPage";
import ScrollToTop from "./utils/scrollToTop";

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: 'dark',
  },
  typography: {
    button: {
      textTransform: "none",
    },
  }
})


export const config = {
  // endpoint: "https://8d3d2800-eaa8-435b-9e26-aad8a7f344f1.mock.pstmn.io/v1/videos"
  endpoint: "https://1f50254b-4f35-4522-a29e-d5e4e384d603.mock.pstmn.io/v1/videos"
  
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme= {theme}>
        <ScrollToTop />
        <Box sx={{backgroundColor:"#181818"}}></Box>
        <Routes>
          <Route path="/" exact element={<LandingPage />}></Route>
          <Route path="/video/:id" element={<VideoPage />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
