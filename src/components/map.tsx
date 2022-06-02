import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { NextPage } from "next";

const Map: NextPage = () => {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [btnClose, setBtnClose] = useState(true);
  useEffect(() => {
    const mapInit = new maplibregl.Map({
      container: "mainMap",
      style:
        "https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/622f5cbfd4c8f35aa853b31c?api_key=ay7kZQs04aiRVeE6rBSgO0tyQW1C96lGRoStZhn171hkvWNbaC84lpszKy3VY1u3&fbclid=IwAR2LGPKe3CxEAbGBsaKYSCKSH4Di7VvpW1KLwvCmS6b8EVDodN35Hck6Dbw", // stylesheet location
      center: [102.82215268213652, 16.474501967847576], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    setMap(mapInit);
    return () => mapInit.remove();
  }, []);
  return (
    <Box id="mainMap" sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          zIndex: 2,
          right: 0,
          top: "50%",
          transform: "translate(0, -50%)",
        }}
      >
        <Button
          variant="contained"
          sx={{ m: 1, width: "150px" }}
          onClick={() => map?.zoomIn({ duration: 1000 })}
        >
          Zoom In
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => map?.zoomOut({ duration: 1000 })}
        >
          Zoom Out
        </Button>
        <Button
          variant="contained"
          color={btnClose ? "success" : "error"}
          sx={{ m: 1 }}
          onClick={() => {
            setBtnClose(!btnClose);
            map?.setLayoutProperty(
              "new-layer",
              "visibility",
              btnClose ? "visible" : "none"
            );
            map?.setLayoutProperty(
              "new-layer_1",
              "visibility",
              btnClose ? "visible" : "none"
            );
          }}
        >
          {btnClose ? "Open Layer" : "Close Layer"}
        </Button>
      </Box>
    </Box>
  );
};

export default Map;
