import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import './contact.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Api from '../Api';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      const response = await fetch(Api.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      console.log(response,"reso")
      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <>
     <Helmet>
        <title>Contact Us - Speed Reading App</title>
        <meta name="description" content="Contact us to learn more about the Speed Reading App and how it can help you read faster and improve your brain power." />
      </Helmet>
      <Header />
      <Container className="container" style={{ fontFamily: 'Poppins' }}>
        <Typography variant="h4" align="center" className="title">
          Contact Us
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Your Name"
                variant="outlined"
                fullWidth
                className="textfield"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Your Email"
                variant="outlined"
                fullWidth
                className="textfield"
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
                className="textfield"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="submitButton"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
        {formStatus === 'success' && (
          <Typography variant="body1" align="center" style={{ color: 'green' }}>
            Message sent successfully!
          </Typography>
        )}
        {formStatus === 'error' && (
          <Typography variant="body1" align="center" style={{ color: 'red' }}>
            Oops! Something went wrong. Please try again later.
          </Typography>
        )}
      </Container>
    
    </>
  );
};

export default ContactPage;
