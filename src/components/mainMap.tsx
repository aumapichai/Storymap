import {
  Box,
  Stack,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Map, TerrainControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { NextPage } from "next";
import MapContent from "./mapContent";
import { scroller } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Threebox } from "threebox-plugin";
import { MockContext } from "../context/DataContext";
import { storyContent } from "../content/content";

declare global {
  interface Window {
    tb: any;
  }
}

const MainMap: NextPage = () => {
  const mock = useContext(MockContext);
  const story = storyContent;

  const [locationMap, setLocationMap] = useState<Map | null>(null);
  const [animationStart, setAnimationStart] = useState<boolean>(false);

  useEffect(() => {
    const mapInit = new Map({
      container: "map",
      style:
        "https://cloud.vallarismaps.com/core/api/styles/1.0-beta/styles/62982cdd70a29a5657afde98?api_key=SmxDVKuhZO2bbxwiRb7uaGUXoN8WYR6aaeg4BfyFbxTpq98sax5ZCz5TYXWlrMIB", // stylesheet location
      center: [106.3328610586887, 9.568141549456763], // starting position [lng, lat]
      // starting zoom
      zoom: 14,
      // maxZoom: 14,
      bearing: 27,
      pitch: 60,
      maxPitch: 80,
      antialias: true,
      maxZoom: 18,
    });

    setLocationMap(mapInit);

    mapInit.easeTo({
      padding: { right: 570 },
    });

    window.tb = new Threebox(mapInit, mapInit.getCanvas().getContext("webgl"), {
      defaultLights: true,
    });

    mapInit.on("load", () => {
      console.log(mapInit.getLight());

      // window.tb.camera.matrixAutoUpdate = true;
      // window.tb.camera.matrixWorldNeedsUpdate = true;
      // mapInit.addSource("terrain", {
      //   type: "raster-dem",
      //   url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=lumJjU9l2DTAf8myiZT0`,
      // });

      // mapInit.setTerrain({
      //   source: "terrain",
      //   exaggeration: 1.25,
      // });
    });

    return () => mapInit.remove();
  }, []);

  const [idScroll, setIdScroll] = useState(null);

  const getIdForScroll = (e: any) => {
    setIdScroll(e);
  };

  // const [stateIcon, setStateIcon] = useState(false);

  const boxAnimation = {
    key: "box",
    initial: {
      // y: "50%",
      opacity: 0,
      // scale: 0.5,
      transition: {
        duration: 0.4,
      },
    },
    animate: {
      // y: 0,
      opacity: 1,
      // scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      // y: "50%",
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  };

  const BoxImages = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "150px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",

    margin: "8px 0 8px 0",
  }));

  return (
    <Fragment>
      <Box component={"div"} sx={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows
          gl={{ alpha: false }}
          camera={{ fov: 45 }}
          style={{ height: "100vh", position: "absolute", zIndex: 0 }}
        >
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Sky azimuth={0.1} turbidity={0.1} rayleigh={0.5} inclination={0.6} />
        </Canvas>
        <Box
          component={"div"}
          sx={{
            width: "calc(100% - 733px)",
            position: "fixed",
            height: "100%",
            zIndex: 4,
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ width: "100%", height: "100%" }}
          >
            <AnimatePresence>
              {mock.val?.showDialog && mock.val?.typeDialog === "data_fish" ? (
                <motion.div
                  {...boxAnimation}
                  style={{
                    position: "relative",
                    background: "white",
                    borderRadius: "10px",
                    left: 105,
                    top: 0,
                    bottom: 0,
                    margin: "auto",
                    height: "fit-content",
                    width: "70%",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    boxShadow:
                      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1}
                    sx={{
                      paddingLeft: "25px",
                      paddingRight: "3px",
                      boxShadow: "0 1px 0 0 #dddd",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "KanitRegular",
                        color: "rgb(42 65 174)",
                      }}
                    >
                      ข้อมูลเพิ่มเติม
                    </Typography>
                    <IconButton
                      aria-label="close dialog"
                      color="error"
                      onClick={() =>
                        mock.setVal({
                          ...mock.val,
                          showDialog: false,
                          clickActive: null,
                        })
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack>

                  <Box
                    component={"div"}
                    sx={{ padding: "16px 25px 25px 25px" }}
                  >
                    <BoxImages
                      sx={{
                        backgroundImage: `url(${
                          story[1].descriptions[
                            mock.val?.indexDialogFish
                              ? Number(mock.val.indexDialogFish)
                              : 0
                          ].imageFish
                        })`,
                      }}
                    />

                    <Typography variant="titleMain" mt={3}>
                      {
                        story[1].descriptions[
                          mock.val?.indexDialogFish
                            ? Number(mock.val.indexDialogFish)
                            : 0
                        ].title
                      }
                      ของปลานิล
                    </Typography>

                    <Typography variant="description" mt={2}>
                      {
                        story[1].descriptions[
                          mock.val?.indexDialogFish
                            ? Number(mock.val.indexDialogFish)
                            : 0
                        ].description2
                      }
                    </Typography>
                  </Box>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Stack>
        </Box>

        <Box component={"div"} id="map" sx={{ height: "100%", width: "100%" }}>
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              margin: "auto",

              height: "fit-content",
              width: "fit-content",
              zIndex: 5,
              left: 20,
              cursor: "pointer",
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{
                background: "white",
                borderRadius: "8px",
                boxShadow: 1,
              }}
              p={2}
              spacing={2}
            >
              {story.map((e: any) => (
                <Tooltip key={e.id} title={e.title} placement="right" arrow>
                  <IconButton
                    aria-label="all-data"
                    sx={
                      e.id === idScroll
                        ? {
                            border: "2px solid #0024ff",
                            background: "#009eff",
                            padding: "3px",
                            color: "white",
                            "&:hover": {
                              background: "#009eff",
                              color: "white",
                            },
                          }
                        : { border: "2px solid #757575", padding: "3px" }
                    }
                    onClick={() => {
                      scroller.scrollTo(e.id, {
                        duration: 1500,
                        delay: 0,
                        smooth: "easeInOutQuint",
                        containerId: "test",
                      });
                      mock.setVal({ ...mock.val, stateIcon: true });
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{
                        margin: "2px",
                        width: "25px",
                        height: "25px",
                        mask: `url(${e.icon}) no-repeat`,
                        maskSize: "cover",
                        maskRepeat: "round",
                        background: e.id === idScroll ? "white" : "#757575",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
          <Box
            component={"div"}
            id="test"
            sx={{
              overflowY: "auto",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
            onScroll={() => {
              setAnimationStart(false);
            }}
          >
            {story.map((e: any) => {
              return (
                <MapContent
                  key={`story_${e.id}`}
                  data={e}
                  locationProp={locationMap}
                  idForScroll={getIdForScroll}
                  animationStart={animationStart}
                  setAnimationStart={setAnimationStart}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default MainMap;
