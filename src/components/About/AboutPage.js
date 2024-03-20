import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import "./AboutPage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  const generateInnovativeTexts = () => {
    const texts = [
      "Revolutionize your reading speed with our innovative speed reading techniques.",
      "Experience the future of reading with our cutting-edge speed reading practice app.",
      "Unlock the potential of your mind with our advanced speed reading exercises.",
      "Elevate your reading experience to new heights with our groundbreaking speed reading platform.",
      "Discover a whole new world of reading possibilities with our revolutionary speed reading technology.",
      "Embark on a journey of rapid learning and comprehension with our state-of-the-art speed reading tool.",
      "Enhance your cognitive abilities with our immersive speed reading experience.",
      "Master the art of speed reading with our dynamic and intuitive practice app.",
      "Boost your productivity and knowledge absorption with our innovative speed reading solution.",
      "Achieve unparalleled reading efficiency with our cutting-edge speed reading application.",
    ];
    return texts;
  };

  return (
    <div>
      <Helmet>
        <title>About Us - Speed Reading App</title>
        <meta name="description" content="Learn more about the Speed Reading App and how it can help you read faster and improve your brain power." />
      </Helmet>
      <Header />
      <Container className="container" style={{ marginTop: "100px" }}>
        <Typography
          variant="h4"
          align="center"
          className="title"
          style={{
            fontFamily: "Poppins",
            marginBottom: "30px",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          Welcome to Our Speed Reading Practice App
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className="description"
          style={{ fontFamily: "Poppins", marginBottom: "30px" }}
        >
          My name is Rajesh Banoth, and I'm a full-stack developer ,completed my graduation in 
          Computer Science Engineering at Delhi Technological University.
          I'm passionate about creating innovative solutions, and I've developed
          this speed reading practice app to help users enhance their reading
          skills.
        </Typography>
        <Grid container spacing={3} className="cardGrid">
          {generateInnovativeTexts().map((text, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card className="card">
                <CardContent>
                  <Typography
                    variant="h6"
                    className="cardTitle"
                    style={{ fontFamily: "Poppins", color: "#fff" }}
                  >
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutPage;
