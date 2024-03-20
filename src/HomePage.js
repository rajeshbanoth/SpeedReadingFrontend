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
        <meta
          name="description"
          content="Welcome to the Speed Reading App, where you can learn how to read faster, improve your brain power, and gain innovative tips for speed reading. Enhance your cognitive abilities, master speed reading techniques, boost reading speed, increase comprehension, accelerate learning, improve focus, efficient reader, advanced reading methods, absorb information, elevate reading skills, cognitive enhancement, productivity improvement, quick comprehension, rapid reading, innovative strategies, reading exercises, proficient reader, speed reader app, enhance brain function, enhance productivity, learn faster, speed reading tools, increase knowledge retention, speed reading techniques, effective reading, brain training, speed reading methods, reading efficiency, speed reading practice, memory enhancement, reading comprehension, brain exercises, reading fluency, brain fitness, speed reading benefits, brain health, brain workout, cognitive training, mental agility, brain stimulation, brain development, brain training exercises, mental fitness, reading proficiency, cognitive skills, cognitive enhancement tools, increase reading speed, accelerated learning techniques, memory improvement, concentration techniques."
        />
        <meta
          name="keywords"
          content="speed reading, speed reader, reading app, speed reading techniques, cognitive abilities, brain power, cognitive enhancement, read faster, improve focus, absorb information, increase comprehension, accelerate learning, efficient reader, advanced reading methods, innovative strategies, reading exercises, boost reading speed, enhance brain function, improve productivity, learn faster, speed reading tools, increase knowledge retention, effective reading, brain training, reading efficiency, memory enhancement, brain exercises, brain fitness, brain health, cognitive training, mental agility, brain stimulation, mental fitness, reading proficiency, cognitive skills, accelerated learning techniques, concentration techniques, rapid reading, quick comprehension, reading fluency, speed reading benefits, brain workout, brain development, cognitive enhancement tools, speed reading methods, speed reading practice, memory improvement, reading comprehension, enhance reading skills, brain exercises, brain workout, brain health, brain development, improve cognitive abilities, brain stimulation, brain fitness, cognitive training, mental agility, brain health, brain development, mental fitness, reading proficiency, cognitive skills, cognitive enhancement tools, increase reading speed, accelerated learning techniques, memory improvement, concentration techniques"
        />
        <link rel="canonical" href="https://speedreading.vercel.app" />
      </Helmet>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          py: 4,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          marginTop: "50px",
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
