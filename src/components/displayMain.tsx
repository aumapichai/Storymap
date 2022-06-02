import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DisplayMain = () => {
  useEffect(() => {
    const mapInit = new maplibregl.Map({
      container: "mainMap",
      style:
        "https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/622f5cbfd4c8f35aa853b31c?api_key=ay7kZQs04aiRVeE6rBSgO0tyQW1C96lGRoStZhn171hkvWNbaC84lpszKy3VY1u3&fbclid=IwAR2LGPKe3CxEAbGBsaKYSCKSH4Di7VvpW1KLwvCmS6b8EVDodN35Hck6Dbw", // stylesheet location
      center: [102.82215268213652, 16.474501967847576], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    // setMap(mapInit);
    return () => mapInit.remove();
  }, []);
  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "gray",
      }}
    >
      <Box
        id="mainMap"
        sx={{
          // backgroundImage: `url(/images/Marmotamaps.jpg)`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "75%",
          height: "100%",
          zIndex: 1,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          //   filter: "blur(1px)",
          // borderRadius: "50% 22% 40% 80%",
          // filter: "blur(100px)",
          // background:
          //   "radial-gradient(circle at 50% 50%,rgba(76, 0, 255, 1), rgba(76, 0, 255, 0))",
          //   opacity: 0.2,
          // background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
          // linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
          // linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`,
        }}
      />
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "30%",
          height: "100%",
          background: "#f1f1f1",
          // backgroundImage:
          //   "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
          // opacity: 0.5,
          zIndex: 2,
          // background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
          // linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
          // linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`,
          // background: "gray",
          // filter: "blur(10px)",
        }}
      />
      {/* <Box
        sx={{
          position: "absolute",
          // top: 0,
          overflowY: "auto",
          right: 0,
          width: "40%",
          height: "95%",
          background: "red",
          zIndex: 3,
          top: "50%",
          transform: "translate(0, -50%)",
          // justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box> */}
    </Stack>
  );
};

export default DisplayMain;
