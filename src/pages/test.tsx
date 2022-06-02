import { Box, Paper, styled, Typography, Stack } from "@mui/material";
import { NextPage } from "next";
import React, { FC, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const ItemPapers = styled(Paper)({
  background: "rgba( 255, 255, 255, 0.85 )",
  boxShadow: "0 3px 10px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur(0px)",
  webkitBackdropFilter: "blur( 0px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

const StoryComp: FC<any> = (props) => {
  const { data } = props;

  const [ref, inView] = useInView({});

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("enter");
    } else if (!inView) {
      controls.start("exit");
    }
  }, [controls, inView]);

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        animate={controls}
        variants={{
          enter: { opacity: 1, transition: { duration: 1 } },
          exit: { opacity: 0, transition: { duration: 1 } },
        }}
        ref={ref}
        style={{
          width: "560px",
          position: "absolute",
          [data.position]: 50,
          top: 0,
          bottom: 0,
          margin: "auto",
          height: "fit-content",
        }}
      >
        <ItemPapers>
          <Stack direction="row" alignItems="center">
            <Typography variant="titleMain">ข้อมูลทั่วไปของปลานิล</Typography>
            <Box
              sx={{
                backgroundImage: `url(/images/oybpasiu89prq42xfPF-o.png)`,
                width: "100px",
                height: "35px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Stack>
        </ItemPapers>
        <ItemPapers sx={{ mt: 2 }}>
          <Typography variant="description"></Typography>
        </ItemPapers>
      </motion.div>
    </div>
  );
};

const TestPage: NextPage = () => {
  const story = [
    {
      id: 1,
      color: "red",
      position: "right",
    },
    { id: 2, color: "green", position: "left" },
    { id: 3, color: "blue", position: "right" },
    { id: 4, color: "blue", position: "right" },
  ];

  useEffect(() => {
    const mapInit = new maplibregl.Map({
      container: "mapMain",
      style:
        "https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/622f5cbfd4c8f35aa853b31c?api_key=ay7kZQs04aiRVeE6rBSgO0tyQW1C96lGRoStZhn171hkvWNbaC84lpszKy3VY1u3&fbclid=IwAR2LGPKe3CxEAbGBsaKYSCKSH4Di7VvpW1KLwvCmS6b8EVDodN35Hck6Dbw", // stylesheet location
      center: [102.82215268213652, 16.474501967847576], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    return () => mapInit.remove();
  }, []);

  return (
    <Box
      // component="div"
      id="mapMain"
      style={{
        // backgroundImage: `url(/images/Marmotamaps.jpg/)`,
        // overflowY: "auto",
        height: "100vh",
        width: "100vw",

        //   padding: "0px 70px 0px 120px",
      }}
    >
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {story.map((x: any) => {
          return <StoryComp key={`story_${x.id}`} data={x}></StoryComp>;
        })}
      </Box>
    </Box>
  );
};

export default TestPage;
