import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Slider, Button } from "@mui/material";

const TextDisplay = ({ text, settings, onSettingsChange,handlePastedContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const words = text.split(" ");

  const [textPasted, setTextPasted] = useState(false); // State to track if text is pasted
  const currentSpeed = (settings.chunkSize * settings.readingSpeed).toFixed(0);

  const handleTogglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };



  const handleRestart = () => {
    setCurrentIndex(0);
  };

  const handleWpmChange = (change) => {
    onSettingsChange("readingSpeed", settings.readingSpeed + change);
  };

  const handleSkip = (forward) => {
    setCurrentIndex((prevIndex) =>
      forward ? prevIndex + settings.chunkSize : prevIndex - settings.chunkSize
    );
  };

  const handleProgressChange = (event, newValue) => {
    setCurrentIndex(newValue);
  };

  const generateRandomText = () => {
    
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    // Split the Lorem Ipsum text into an array of words
    const words = loremIpsum.split(" ");
  
    // Generate a random length for the new text (between 20 and 50 words)
    const newTextLength = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
  
    // Select random words from the array to create the new text
    const randomWords = [];
    for (let i = 0; i < newTextLength; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }
  
    // Join the selected words to form the new text
    const newText = randomWords.join(" ");
    
    return newText;
  };
  

  const handleNewText = () => {
    const newText = generateRandomText(); // You need to define this function to generate new text
    handlePastedContent('text', newText);
    setCurrentIndex(0); // Reset the currentIndex
  };

  

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "n":
            handleNewText();
          break;
        case "p":
          handleTogglePlay();
          break;
        case "r":
          handleRestart();
          break;
        case "+":
          handleWpmChange(25);
          break;
        case "-":
          handleWpmChange(-25);
          break;
        case "ArrowRight":
          handleSkip(true);
          break;
        case "ArrowLeft":
          handleSkip(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRestart, handleTogglePlay, handleWpmChange, handleSkip]);

//   useEffect(() => {
//     let interval;
//     if (isPlaying) {
//       interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => {
//           const nextIndex = prevIndex + settings.chunkSize;
//           return Math.min(nextIndex, words.length - settings.chunkSize);
//         });
//       }, 60000 / settings.readingSpeed);
//     }

//     return () => clearInterval(interval);
//   }, [currentIndex, isPlaying, settings,words.length]);
useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + settings.chunkSize;
          return Math.min(nextIndex, words.length - settings.chunkSize);
        });
      }, 60000 / settings.readingSpeed);
    }

    return () => clearInterval(interval);
  }, [isPlaying,words.length]);

  const renderText = () => {
    const textAlignStyle = { textAlign: settings.textAlignment };

    switch (settings.readingMode) {
      case "single-word":
        const endIndex1 = currentIndex + settings.chunkSize;
        return (
          <Typography
            variant="h4"
            style={{
              fontSize: `${settings.fontSize}px`,
              fontFamily: settings.fontStyle,
              color: settings.fontColor,
              ...textAlignStyle,
            }}
          >
            {words.slice(currentIndex, endIndex1).join(" ")}
          </Typography>
        );
      case "rsvp":
        return (
          <Typography
            variant="h4"
            style={{
              fontSize: `${settings.fontSize}px`,
              fontFamily: settings.fontStyle,
              color: settings.fontColor,
              ...textAlignStyle,
            }}
          >
            {words.slice(currentIndex, currentIndex + settings.chunkSize).join(" ")}
          </Typography>
        );
      default:
        return null;
    }
  };
  return (
    <>
    <Container
      style={{
        backgroundColor: settings.backgroundColor,
        minHeight: `${settings.windowHeight}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
     <Box textAlign="center" width="100%" mb={2}>
        {renderText()}
      </Box>
    </Container>
    <Box textAlign="center" mt={2}>
    <Slider
        value={currentIndex}
        min={0}
        max={words.length - settings.chunkSize}
        onChange={handleProgressChange}
        style={{ width: "80%" }}
      />
    </Box>
    <Box textAlign="center" mt={2}>
        <Typography variant="body1">
          Speed reading {words.length} words at {currentSpeed} wpm
        </Typography>
      </Box>

     
      <Box textAlign="center" mt={2}>
        <Button
          onClick={handleTogglePlay}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={handleRestart} variant="contained" color="secondary">
          Restart
        </Button>
      </Box>

      <Box style={{ padding: "10px" }}>
        <Typography>
          n - new p - play/pause r - restart +/- - 25(+/-) wpm right/left arrows
          - skip s - settings
        </Typography>
      </Box>

    </>
  );
};

export default TextDisplay;
