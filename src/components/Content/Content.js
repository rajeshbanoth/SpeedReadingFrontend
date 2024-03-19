import React, { useState } from 'react';
import { Container, CssBaseline, Grid } from '@mui/material';
import TextDisplay from './TextDisplay';
import SettingsConfiguration from './SettingsConfiguration';

const Content = () => {
  const [settings, setSettings] = useState({
    fontSize: 50,
    fontStyle: 'Poppins',
    fontColor: '#000000',
    textAlignment:"center",
    backgroundColor: '#D3D3D3',
    readingMode: 'single-word',
    readingSpeed: 300,
    windowWidth: 300,
    windowHeight: 300,
    chunkSize: 1,
  });

  const [contentText, setContentText] = useState("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).");


  const handleSettingsChange = (name, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleNewContent = () => {
    // Generate new content text here
    const newContent = "New content text goes here.";
    setContentText(newContent);
  };

  const handlePastedContent =(title,content)=>{
    setContentText(content);
    // setTextReset(true)

  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <SettingsConfiguration
              settings={settings}
              text={contentText} // Pass the contentText state to TextDisplay
              onSettingsChange={handleSettingsChange}
              handlePastedContent={handlePastedContent}
            />
          </Grid>
          <Grid item xs={12}>
            <TextDisplay
              settings={settings}
              text={contentText} // Pass the contentText state to TextDisplay
              onSettingsChange={handleSettingsChange}
              handlePastedContent={handlePastedContent}

            />
          </Grid>
          {/* <Grid item xs={12}>
            <button onClick={handleNewContent}>New Content</button>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default Content;
