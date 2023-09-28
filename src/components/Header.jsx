import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const {currency, setCurrency} = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>

          <Typography
          style={{
            cursor:"pointer",
            color: "gold",
            fontWeight:"bold",
            fontFamily:"Montserrat",
            flex:"1",
          
          }}
            onClick={() => navigate("/")}
            variant="h6"
          >
            Crypto Vista
          </Typography>

          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginReft: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>

            </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
