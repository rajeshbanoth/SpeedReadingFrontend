import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Slider, Button } from "@mui/material";

const TextDisplay = ({ text, settings, onSettingsChange,handlePastedContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const paragraphs = [
    "Our speed reading training app is a revolutionary tool designed to transform the way you read and comprehend information. With the fast-paced nature of today's world, being able to read quickly and effectively is essential for success in both academic and professional settings. Our app provides a comprehensive platform that combines cutting-edge technology with proven learning techniques to help you improve your reading speed and comprehension skills.",
    "One of the key features of our app is its adaptive learning system, which tailors the training experience to your individual needs and learning style. Whether you're a beginner looking to increase your reading speed or an advanced reader aiming to refine your skills, our app adapts to your level of proficiency and provides personalized exercises and feedback to help you reach your goals. This adaptive approach ensures that you're always challenged at the right level and continue to make progress with each training session.",
    "Our app offers a wide range of training exercises and activities designed to target different aspects of reading speed and comprehension. From timed reading drills and comprehension quizzes to eye-tracking exercises and vocabulary builders, our app covers all the essential components of effective reading. Each exercise is carefully crafted to engage and challenge your mind, helping you develop the skills and strategies needed to read faster and retain more information.",
    "In addition to its training features, our app also provides valuable insights and analytics to help you track your progress over time. You'll receive detailed feedback on your reading speed, comprehension level, and other key metrics, allowing you to identify areas for improvement and measure your success. With this data-driven approach, you can set realistic goals, monitor your performance, and stay motivated as you work towards becoming a more proficient reader.",
    "Our app is designed to be user-friendly and intuitive, making it easy for anyone to get started with speed reading training. Whether you're using the app on your smartphone, tablet, or computer, you'll find a sleek and responsive interface that enhances your learning experience. With features like customizable settings, progress tracking, and built-in tutorials, our app puts the power of speed reading in your hands and empowers you to take control of your learning journey.",
    "One of the unique advantages of our app is its flexibility and convenience. Unlike traditional reading courses or workshops, which require you to attend scheduled classes or sessions, our app allows you to train at your own pace and on your own schedule. Whether you have a few minutes to spare during your lunch break or prefer to dedicate longer periods to focused practice, our app accommodates your busy lifestyle and lets you learn on your terms.",
    "Our app also offers a wealth of supplemental resources and materials to enrich your learning experience. From articles and eBooks on speed reading techniques to expert tips and advice from seasoned readers, our app provides everything you need to succeed. Whether you're looking for inspiration, motivation, or practical guidance, you'll find it all within our app's comprehensive library of resources.",
    "Another highlight of our app is its community-driven approach to learning. With a vibrant and supportive user community, you'll have the opportunity to connect with fellow readers, share insights and experiences, and participate in discussions and challenges. Whether you're seeking encouragement, feedback, or camaraderie, you'll find a welcoming community of like-minded individuals who share your passion for reading and self-improvement.",
    "Our app is backed by a team of experienced educators, researchers, and developers who are dedicated to advancing the field of speed reading and helping users achieve their reading goals. With a commitment to innovation and excellence, we continuously update and improve our app to incorporate the latest research findings and technological advancements. By staying at the forefront of speed reading training, we ensure that our app remains the most effective and reliable tool for readers of all levels.",
    "In conclusion, our speed reading training app is a comprehensive and effective solution for anyone looking to enhance their reading speed and comprehension skills. With its adaptive learning system, diverse range of exercises, user-friendly interface, and supportive community, our app provides everything you need to succeed. Whether you're a student, professional, or lifelong learner, our app empowers you to unlock your full reading potential and achieve your goals."
];


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
    
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setCurrentIndex(randomIndex);
  
    // Join the selected words to form the new text
    const newText = paragraphs[randomIndex]
    
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
