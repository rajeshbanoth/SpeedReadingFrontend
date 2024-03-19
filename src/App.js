import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./components/Contact/ContactPage";
import AboutPage from "./components/About/AboutPage";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PrivacyPolicy from "./components/Privacypolicy/PrivacyPolicy";
import axios from "axios";
import Api from "./components/Api";
import Sitemap from "./components/Sitemap";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function App() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  const fetchIPAddress = async () => {
    try {
      const response = await axios.get("https://ipinfo.io/json");
      const { ip } = response.data;
      return ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return null;
    }
  };

  useEffect(() => {
    // Function to fetch and set device information
    const fetchDeviceInfo = async () => {
      try {
        // Use libraries like react-device-detect to detect device type and browser
        const deviceType = window.mobileAndTabletCheck
          ? "Mobile/Tablet"
          : "Desktop";
        const browser = navigator.userAgent;
        // Fetch IP address from backend server (assuming there's an API to get it)
        const ipAddress = await fetchIPAddress().then((ipAddress) => {
          // console.log('IP Address:', ipAddress);
          setDeviceInfo({
            deviceType,
            browser,
            ipAddress,
            pageUrl: window.location.href,
            userId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),

            sessionId: ipAddress,
          });
        });

        // Set the device information
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      }
    };

    // Call the function to fetch device information when component mounts
    fetchDeviceInfo();
  }, []);

  useEffect(() => {
    const sendDeviceInfo = async () => {
      try {
        // Make sure deviceInfo is set
        if (deviceInfo) {
          // Send deviceInfo to the backend
          const response = await axios.post(Api.TRACK_DEVICE, {
            deviceInfo,
          });
          console.log("Device information sent successfully:", response.data);
        }
      } catch (error) {
        console.error("Error sending device information:", error);
      }
    };

    sendDeviceInfo();
  }, [deviceInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Header />
          <div style={{ marginTop: "10%" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/sitemap.xml" element={<Sitemap />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
