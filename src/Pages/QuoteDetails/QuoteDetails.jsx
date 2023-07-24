import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteQuote,
  getQuoteById,
  likeQuote,
  updateQuoteData,
} from "../../Config/firebase";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  CardActions,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { shadows } from '@mui/system';
import {
  FormatQuote as QuotationMarkIcon,
  Favorite as LikedIcon,
  FavoriteBorderOutlined as UnlikeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import "./quoteDetails.css";
import Loading from "../Loading/Loading";
import Layout from "../../Containers/Layout";

function QuoteDetails() {
  const [quote, setQuote] = useState([]);
  const [heartColor, setHeartColor] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const getQuoteData = () => {
    getQuoteById(params.id)
      .then((data) => {
        setQuote(data);
        setLoading(false);
        setHeartColor(data.isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuoteData();
  }, []);

  const likeHandler = () => {
    likeQuote(params.id, quote.likes + 1);
    updateQuoteData(params.id, { isLiked: !quote.isLiked })
      .then(() => {
        getQuoteData();
        setHeartColor(!heartColor);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unlikeHandler = () => {
    likeQuote(params.id, quote.likes - 1);
    updateQuoteData(params.id, { isLiked: !quote.isLiked })
      .then(() => {
        getQuoteData();
        setHeartColor(!heartColor);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = async () => {
    try {
      await deleteQuote(params.id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = () => {
    navigate(`/quote/${params.id}/edit`);
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Card
      sx={{boxShadow:"0px 4px 16px rgba(0,0,0,0.1)", backgroundColor: theme.palette.secondary.main
      }}
        // style={{ backgroundColor: theme.palette.secondary.main }}
        className="quote-details-card"
      >
        <CardContent sx={{ display: "flex", flexWrap: "nowrap" }}>
          <Box sx={{ width: "10%" }}>
            <QuotationMarkIcon style={{ color: "lightgrey", fontSize: "28" }} />
          </Box>
          <Box sx={{ width: "90%" }}>
            <Typography variant="h6" color="text.secondary">
              {quote.text} -{" "}
              <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                {quote.author?.toUpperCase()}
              </span>
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <IconButton
              aria-label="add to favorites"
              style={{ color: "red" }}
              onClick={() => {
                heartColor ? unlikeHandler(quote) : likeHandler(quote);
              }}
            >
              {heartColor ? <LikedIcon /> : <UnlikeIcon />}
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              marginLeft="10px"
            >
              {quote.likes} likes
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={editHandler}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={deleteHandler}
              style={{ color: "red" }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Layout>
  );
}

export default QuoteDetails;
