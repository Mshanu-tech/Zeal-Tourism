import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './umrahaviewpage.css'

const PackagePage = () => {
  const [pdfOption, setPdfOption] = useState('Standard PDF');

  const inclusions = [
    "Duis aute irure dolor in reprehenderit",
    "Esse cillum dolore eu fugiat nulla pariatur",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    "Duis aute irure dolor in reprehenderit",
    "Esse cillum dolore eu fugiat nulla pariatur",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    "Duis aute irure dolor in reprehenderit",
    "Esse cillum dolore eu fugiat nulla pariatur",
    "Deserunt mollit anim id est laborum",
  ];

  const exclusions = [
    "Duis aute irure dolor in reprehenderit",
    "Esse cillum dolore eu fugiat nulla pariatur",
    "Deserunt mollit anim id est laborum",
  ];

  return (
    <div className="page-main mt-8">
      <div className="container">
        {/* Photos Section */}
        <section id="Photos">
          <div className="bg-white pl-0 pr-0 border-0">
            <div className="flex flex-wrap">
              <div className="md:w-1/2">
                <h5 className="text-lg font-semibold">7 Days Umrah Package</h5>
                <p className="mb-1">7 Days / 6 Nights - 1 Country / 2 Cities</p>
                <div className="rating flex items-center mb-2">
                  <ul className="flex">
                    <li><span className="fa fa-star text-yellow-500"></span></li>
                    <li><span className="fa fa-star text-yellow-500"></span></li>
                    <li><span className="fa fa-star text-yellow-500"></span></li>
                    <li><span className="fa fa-star text-yellow-500"></span></li>
                    <li><span className="fa fa-star text-yellow-500"></span></li>
                  </ul>
                  <p className="ml-2 m-0 py-1 text-gray-800">4.5 | Very Good <span className="text-gray-500">(65 reviews)</span></p>
                </div>
              </div>
              <div className="md:w-1/2 text-right">
                <div className="mb-1 pt-3">
                  <div className="btn-group mr-2">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded">Type</span>
                    <button className="btn bg-gray-100 px-4 py-1 rounded-md border text-sm">
                      {pdfOption}
                      <i className="fa fa-chevron-down pl-2"></i>
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#" onClick={() => setPdfOption('Basic PDF')}>Basic PDF</a>
                      <a className="dropdown-item" href="#" onClick={() => setPdfOption('Standard PDF')}>Standard PDF</a>
                      <a className="dropdown-item" href="#" onClick={() => setPdfOption('Elite PDF')}>Elite PDF</a>
                    </div>
                  </div>
                  <button className="btn border text-sm px-4 py-1 rounded-md">Download PDF</button>
                  <a href="#" className="ml-2 text-blue-500"><i className="fa fa-share-nodes"></i></a>
                  <span className="ml-2 text-blue-500"><i className="fa fa-bookmark"></i></span>
                </div>
                <div className="mb-1 pt-2">
                  <p className="m-0">Free cancellation before <strong>28 Oct 2022</strong></p>
                </div>
                <div className="mb-1">
                  <span>From</span> <span className="text-lg font-semibold">AED 120.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          {/* Image Slider */}
          <div className="slider-main mb-5">
            <Carousel
              showThumbs={false} // Disable thumbnails
              infiniteLoop={true} // Enable infinite loop
              showStatus={false}  // Hide status indicator
              useKeyboardArrows={true} // Enable keyboard navigation
              autoPlay={true} // Enable autoplay
              interval={3000} // Set autoplay interval
              
            >
              <div>
                <img
                  src="https://img.freepik.com/premium-photo/photography-day-modern-camera-front-side-with-watercolor_145644-2928.jpg"
                  alt="First slide"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/premium-photo/photography-day-modern-camera-front-side-with-watercolor_145644-2928.jpg"
                  alt="Second slide"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/premium-photo/photography-day-modern-camera-front-side-with-watercolor_145644-2928.jpg"
                  alt="Third slide"
                  className="carousel-image"
                />
              </div>
            </Carousel>
          </div>


          {/* Availability Section */}
          <div className="card-header rounded mb-5 border-0">
            <div className="card-header rounded mb-5 border-0">
              <ul className="flex">
                <li className="mr-4"><i className="fa fa-check-circle text-green-500 pr-2"></i> Availability: Daily</li>
                <li className="mr-4"><i className="fa fa-check-circle text-green-500 pr-2"></i> Duration: 5-6 hours</li>
                <li><i className="fa fa-check-circle text-green-500 pr-2"></i> Free Cancellation 24 hours prior</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Overview Section */}
        <section id="Overview" className="mb-5">
          <h6 className="text-lg font-semibold">Overview</h6>
          <div className="card rounded border-0 shadow">
            <div className="card-body">
              <p>
                Located in the heart of Dubai, in the Deira district, the hotel is close to the Gold Souk and Spice Market.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </section>

        {/* Inclusions and Exclusions */}
        <section id="Inclusions" className="mb-5">
          <div className="Inclusionscontainer">
            <div className="section">
              <h2 style={{fontSize:"25px", fontWeight:"bold"}}>Inclusions</h2>
              <div className="list">
                {inclusions.map((item, index) => (
                  <div key={index} className="list-item">
                    <div className="icon check">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="section">
              <h6 style={{fontSize:"25px", fontWeight:"bold"}}>Exclusions</h6>
              <div className="list">
                {inclusions.map((item, index) => (
                  <div key={index} className="list-item">
                    <div className="icon cross">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Timings Section */}
        <Box sx={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
          {/* Timings Section */}
          <Card variant="outlined" sx={{ marginBottom: "20px", borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Timings
              </Typography>
              <Typography>
                <strong>Sunday to Wednesday</strong> - 10:00 AM to 10:00 PM
              </Typography>
              <Typography>
                <strong>Thursday to Saturday</strong> - 10:00 AM to 10:00 PM
              </Typography>
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <Card variant="outlined" sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional information
              </Typography>
              <Stack direction="column" spacing={1}>
                <InfoItem text="Public transport nearby" />
                <InfoItem text="Infants must sit on an adult's lap" />
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Booking Policy */}
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom>
            Booking Policy
          </Typography>

          {/* Cancellation Policy */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Cancellation Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Child Policy */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Child Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris felis, vestibulum
                sit amet ex id, dictum elementum lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Payment Terms */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Terms
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Praesent ut ligula non mi varius sagittis. Cras ultricies mi eu turpis hendrerit fringilla.
                Vestibulum volutpat pretium libero.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>

        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions
          </Typography>

          {/* Cancellation Policy */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Cancellation Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Child Policy */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Child Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris felis, vestibulum
                sit amet ex id, dictum elementum lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Payment Terms */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Terms
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Praesent ut ligula non mi varius sagittis. Cras ultricies mi eu turpis hendrerit fringilla.
                Vestibulum volutpat pretium libero.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>

      </div>
    </div>
  );
};

const InfoItem = ({ text }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <CircleIcon sx={{ color: "red", fontSize: 12 }} />
    <Typography>{text}</Typography>
  </Stack>
)

export default PackagePage;
