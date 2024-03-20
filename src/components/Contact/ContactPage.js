import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet";
import Api from "../Api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./contact.css";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(Api.CONTACT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormStatus("success");
        } else {
          setFormStatus("error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setFormStatus("error");
      }
      setLoading(false);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Speed Reading App</title>
        <meta
          name="description"
          content="Contact us to learn more about the Speed Reading App and how it can help you read faster and improve your brain power."
        />
      </Helmet>
      <Header />
      {/* className="container" */}
      <Container sx={{ marginTop: { xs: "80px" } }}>
        <Grid container spacing={3}>
          <Grid
            item
            md={6}
            lg={6}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#2c3e50",
                }}
              >
                About Our Speed Reading App
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#555",
                }}
              >
                Our Speed Reading App is designed to{" "}
                <strong style={{ color: "#007bff" }}>revolutionize</strong> the
                way you consume information. It{" "}
                <strong>utilizes cutting-edge</strong> technology to enhance
                your reading speed and comprehension. Whether you're a student
                trying to keep up with assignments or a professional striving to
                stay ahead in your field, our app is here to{" "}
                <strong style={{ color: "#28a745" }}>empower</strong> you.
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#555",
                  marginTop: "20px",
                }}
              >
                With our <strong>customizable exercises</strong> and{" "}
                <strong>intuitive interface</strong>, you can tailor your
                reading experience to suit your needs and goals. Experience the{" "}
                <strong style={{ color: "#ffc107" }}>joy</strong> of reading as
                you effortlessly absorb information and{" "}
                <strong>unlock your full potential</strong> with our Speed
                Reading App.
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#555",
                  marginTop: "20px",
                }}
              >
                Take the first step towards{" "}
                <strong style={{ color: "#dc3545" }}>
                  maximizing your productivity
                </strong>{" "}
                and <strong>enhancing your learning</strong>. Join thousands of
                satisfied users who have{" "}
                <strong>transformed their reading habits</strong> and achieved{" "}
                <strong>remarkable results</strong>
                with our innovative Speed Reading App.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
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
              Contact
            </Typography>
            <form className="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Your Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Message"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  display={{ lg: "none", md: "none", xs: "block" }}
                >
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "#2c3e50",
                        textAlign: "center",
                      }}
                    >
                      About Our Speed Reading App
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#555",
                      }}
                    >
                      Our Speed Reading App is designed to{" "}
                      <strong style={{ color: "#007bff" }}>
                        revolutionize
                      </strong>{" "}
                      the way you consume information. It{" "}
                      <strong>utilizes cutting-edge</strong> technology to
                      enhance your reading speed and comprehension. Whether
                      you're a student trying to keep up with assignments or a
                      professional striving to stay ahead in your field, our app
                      is here to{" "}
                      <strong style={{ color: "#28a745" }}>empower</strong> you.
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#555",
                        marginTop: "20px",
                      }}
                    >
                      With our <strong>customizable exercises</strong> and{" "}
                      <strong>intuitive interface</strong>, you can tailor your
                      reading experience to suit your needs and goals.
                      Experience the{" "}
                      <strong style={{ color: "#ffc107" }}>joy</strong> of
                      reading as you effortlessly absorb information and{" "}
                      <strong>unlock your full potential</strong> with our Speed
                      Reading App.
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#555",
                        marginTop: "20px",
                      }}
                    >
                      Take the first step towards{" "}
                      <strong style={{ color: "#dc3545" }}>
                        maximizing your productivity
                      </strong>{" "}
                      and <strong>enhancing your learning</strong>. Join
                      thousands of satisfied users who have{" "}
                      <strong>transformed their reading habits</strong> and
                      achieved <strong>remarkable results</strong>
                      with our innovative Speed Reading App.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </form>
            {formStatus === "success" && (
              <Typography
                variant="body1"
                align="center"
                style={{ color: "#4caf50", marginTop: 20 }}
              >
                Message sent successfully!
              </Typography>
            )}
            {formStatus === "error" && (
              <Typography
                variant="body1"
                align="center"
                style={{ color: "#f44336", marginTop: 20 }}
              >
                Oops! Something went wrong. Please try again later.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactPage;
