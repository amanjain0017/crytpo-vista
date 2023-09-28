import { Container, Typography } from '@mui/material';
import React from 'react'

import Carousel from "./Carousel"

const Banner = () => {

  return (
    <div style={{
      backgroundImage: "url(./bannerimg.jpg)"
    }}>
      <Container style={{
          height: "400",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25",
          justifyContent: "center",
      }}>
        <div style={{
          display:"flex",
          height:"40%",
          justifyContent:"center",
          textAlign:"center",
          flexDirection:"column",
        }}>
          <Typography
          variant='h2'
          style={{
            fontWeight:"bold",
            marginBottom:15,
            fontFamily:"Montserrat",
          }}
          >
            Crpto Vista
          </Typography>

          <Typography
          variant='subtitle2'
          style={{
            color:"darkgrey",
            textTransform:"capitalize",
            fontFamily:"Montserrat",
            marginBottom:35
          }}
          >
            Get all the information regarding your favourite Cryptocurrency...
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
};

export default Banner