import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Typography, Box } from "@mui/material";
import Content from "./components/Content/Content";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import axios from "axios";
import Api from "./components/Api";
import { Helmet } from "react-helmet";

function HomePage() {
  const [pageCounts, setPageCounts] = useState({ unique: 0, total: 0 });

  useEffect(() => {
    // Fetch page counts from the backend
    fetchPageCounts();
  }, []);

  const fetchPageCounts = async () => {
    try {
      const response = await axios.get(Api.UNIQUE_PAGE_VIEWS_COUNT);
      const uniquePageViews = response.data.count;

      const totalResponse = await axios.get(Api.TOTAL_PAGE_VIEWS_COUNT);
      const totalPageViews = totalResponse.data.count;

      setPageCounts({ unique: uniquePageViews, total: totalPageViews });
    } catch (error) {
      console.error("Error fetching page counts:", error);
    }
  };

  return (
    <>
     <Helmet>
        <title>Speed Reading App - Learn to Read Faster</title>
        <meta name="description" content="Welcome to the Speed Reading App, where you can learn how to read faster, improve your brain power, and gain innovative tips for speed reading." />
      </Helmet>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          py: 4,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Content />
        <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <Typography variant="h6">
            Unique  Visits: <strong>{pageCounts.unique}</strong>
          </Typography> */}
          <Typography variant="h6">
            Visitors: <strong>{pageCounts.total}</strong>
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
