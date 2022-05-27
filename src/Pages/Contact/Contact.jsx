import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';
import ButtonApp from '../../Components/ButtonApp/ButtonApp';
import ContactBox from './ContactBox';

import './Contact.css'

function Contact() {
    return (
        <>
            <Nav />
            <FeatureTitle title="Contact Us" page="Contact" />
            <Box sx={{ paddingTop: '120px', paddingBottom: '90px' }} className="contact-area">
                <Container sx={{ maxWidth: { md: 1200 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={6}>
                            <ContactBox icon={`fas fa-envelope`} heading="Mail Here" firstText="Admin@BasicTheme.com" secondText="Info@Themepur.com" />
                            <ContactBox icon={`fas fa-map-marker-alt`} heading="Visit Here" firstText="27 Division St, New York, NY 10002, Jaklina, United Kingpung" />
                            <ContactBox icon={`fas fa-phone`} heading="Call Here" firstText="+8 (123) 985 789" secondText="+787 878897 87" />
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Box sx={{ padding: '100px 0', background: '#f5f5f5' }} className="contact-form">
                <Container sx={{ maxWidth: { md: 1200 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={6}>
                            <Grid item sm={8} xs={12}>
                                <Box className="section-title">
                                    <p><span></span> Anything On your Mind</p>
                                    <Typography variant="h1" sx={{ fontSize: '40px' }}>Estimate Your Idea</Typography>
                                </Box>
                            </Grid>
                            <Grid sx={{
                                textAlign: {
                                    xs: 'left',
                                    md: 'right'
                                }, marginBottom: '80px'
                            }} item sm={4} xs={12}>
                                <ButtonApp value="Make Call" classColor="orange-btn"></ButtonApp>
                            </Grid>
                        </Grid>
                        <form className="contact-form">
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    <Box className="form-box user-icon">
                                        <input type="text" name="name" placeholder="Your Name" />
                                    </Box>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Box className="form-box email-icon">
                                        <input type="text" name="name" placeholder="Your Email" />
                                    </Box>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Box className="form-box phone-icon">
                                        <input type="text" name="name" placeholder="Your Phone" />
                                    </Box>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Box className="form-box subject-icon">
                                        <input type="text" name="name" placeholder="Your Subject" />
                                    </Box>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <Box className="form-box message-icon">
                                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Your Message"></textarea>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <ButtonApp value="Get Action" classColor="orange-btn"></ButtonApp>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </Box>
            <Box>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1315359654336!2d105.83325081532762!3d21.027422293199006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9926e7bd67%3A0x580e078874d5df1e!2zVsSDbiBNacOqzIF1IFF1w7TMgWMgVMawzIkgR2lhzIFt!5e0!3m2!1svi!2s!4v1645609739486!5m2!1svi!2s"
                    width="100%" height="520" style={{ "border": 0 }} loading="lazy"></iframe>
            </Box>
            <Footer />
        </>
    );
}

export default Contact;