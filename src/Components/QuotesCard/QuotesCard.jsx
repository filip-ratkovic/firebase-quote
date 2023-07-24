import React from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./quotesCard.css";

function QuotesCard(props) {
  const quote = props.quote;
  const navigate = useNavigate();
  const theme = useTheme();

  const goToDetails = () => {
    navigate(`/quote/${quote.id}`);
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      style={{ display: "flex" }}
    >
      <Box
        sx={{ width: "100%", marginTop: "50px" }}
        style={{ backgroundColor: theme.palette.background, position:"relative"}}
        className="quotes-card"
      >
        <Box className = "learn-more-btn-cont">
        <button size="small" onClick={goToDetails}>
            Learn More
          </button>
        </Box>
        <CardContent         sx={{ display: "flex", flexWrap: "nowrap" }}
>
          <Box sx={{ width: "10%" }}>
            <FormatQuoteIcon  style={{color:"lightgrey", fontSize:"28"}}/>
          </Box>
          <Box sx={{ width: "90%" }}>
            <Typography variant="h6" color="text.secondary">
              {quote.text} -{" "}
              <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                {quote.author.toUpperCase()}
              </span>
            </Typography>
          </Box>
          
        </CardContent>
      </Box>
    </Grid>
  );
}

export default QuotesCard;
