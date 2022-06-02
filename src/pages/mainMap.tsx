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
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { NextPage } from "next";
import MapContent from "./mapContent";
import { scroller } from "react-scroll";
import PlaylistAddCheckCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCheckCircleOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import FlagIcon from "@mui/icons-material/Flag";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import { MockContext } from "./DataContext";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import HomeIcon from "@mui/icons-material/Home";
import { MapboxLayer } from "@deck.gl/mapbox";
import { ScenegraphLayer, SimpleMeshLayer } from "@deck.gl/mesh-layers";
import { OBJLoader } from "@loaders.gl/obj";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { dataFishMock } from "../dataMock/dataMock";

const MainMap: NextPage = () => {
  const mock = useContext(MockContext);
  const story = dataFishMock;

  const [locationMap, setLocationMap] = useState<Map | null>(null);
  const [meshLayer, setMeshLayer] = useState<any>(null);
  const dataInit = [
    {
      name: "Lafayette (LAFY)",
      code: "LF",
      address: "3601 Deer Hill Road, Lafayette CA 94549",
      entries: "3481",
      exits: "3616",
      coordinates: [104.76716166514018, 17.391327303963642],
    },
    {
      name: "12th St. Oakland City Center (12TH)",
      code: "12",
      address: "1245 Broadway, Oakland CA 94612",
      entries: "13418",
      exits: "13547",
      coordinates: [103.94223500872543, 17.784632355195704],
    },
  ];
  useEffect(() => {
    const mapInit = new Map({
      container: "map",
      style:
        "https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/622f5cbfd4c8f35aa853b31c?api_key=ay7kZQs04aiRVeE6rBSgO0tyQW1C96lGRoStZhn171hkvWNbaC84lpszKy3VY1u3&fbclid=IwAR2LGPKe3CxEAbGBsaKYSCKSH4Di7VvpW1KLwvCmS6b8EVDodN35Hck6Dbw", // stylesheet location
      // style:
      //   "https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [104.76716166514018, 17.391327303963642], // starting position [lng, lat]
      // starting zoom
      zoom: 14,
      // maxZoom: 14,
      bearing: 27,
      pitch: 60,
      maxPitch: 80,
    });
    const myMesh = new MapboxLayer({
      id: "SimpleMeshLayer",
      type: SimpleMeshLayer,
      data: story,
      /* props from SimpleMeshLayer class */

      getColor: (d: any) => [Math.sqrt(d.exits), 140, 0],
      getOrientation: (d: any) => [0, Math.random() * 180, 0],
      getPosition: (d: any) => d.locations.center,
      // getScale: [1, 1, 1],
      // getTransformMatrix: [],
      // getTranslation: [0, 0, 0],
      // material: true,
      mesh: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj",

      sizeScale: 30,
      // texture: null,
      // wireframe: false,

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      loaders: [OBJLoader],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      // visible: true,
      // wrapLongitude: false,
    });
    mapInit.easeTo({
      padding: { right: 570 },
    });
    mapInit.on("load", () => {
      // mapInit.addSource("terrain", {
      //   type: "raster-dem",
      //   url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=lumJjU9l2DTAf8myiZT0`,
      // });
      // mapInit.setTerrain({
      //   source: "terrain",
      //   exaggeration: 2.5,
      // });

      // mapInit.addLayer(myMesh);
      setMeshLayer(myMesh);

      // setTimeout(() => {
      //   mapInit.easeTo({
      //     padding: { right: 570 },
      //   });
      // }, 1000);
    });
    // mapInit.easeTo({
    //   padding: { right: 570 },
    // });
    setLocationMap(mapInit);
    return () => mapInit.remove();
  }, []);

  // useEffect(() => {
  //   if (meshLayer) {
  //     meshLayer.setProps({
  //       data: story,
  //     });
  //   }
  //   return () => {};
  // }, [meshLayer]);

  const [idScroll, setIdScroll] = useState(null);

  const getIdForScroll = (e: any) => {
    setIdScroll(e);
  };

  const [stateIcon, setStateIcon] = useState(false);

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

  const boxAnimation2 = {
    key: "box",
    initial: {
      x: -400,
      opacity: 0,
      // scale: 0.5,
    },
    animate: {
      x: 0,
      opacity: 1,
      // scale: 1,
    },
    exit: {
      x: -400,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    transition: {
      duration: 0.2,
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
                            mock.val?.indexDialogMain
                              ? Number(mock.val.indexDialogMain)
                              : 0
                          ].imageFish
                        })`,
                      }}
                    />

                    <Typography variant="titleMain" mt={3}>
                      {
                        story[1].descriptions[
                          mock.val?.indexDialogMain
                            ? Number(mock.val.indexDialogMain)
                            : 0
                        ].title
                      }
                      ของปลานิล
                    </Typography>

                    <Typography variant="description" mt={2}>
                      {
                        story[1].descriptions[
                          mock.val?.indexDialogMain
                            ? Number(mock.val.indexDialogMain)
                            : 0
                        ].description2
                      }
                    </Typography>
                  </Box>
                </motion.div>
              ) : mock.val?.showDialog &&
                mock.val?.typeDialog === "data_farming" ? (
                <motion.div
                  {...boxAnimation2}
                  style={{
                    position: "relative",
                    background: "white",
                    borderRadius: "10px",
                    width: "80%",
                    left: 80,
                    top: 25,
                    height: "120px",
                    // border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    boxShadow:
                      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                  }}
                >
                  <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
                    <Box
                      component={"div"}
                      sx={{
                        width: "170px",
                        height: "100%",
                        backgroundImage: `url(/images/${
                          story[2].farmingArea[
                            mock.val?.indexDialogMain
                              ? Number(mock.val.indexDialogMain)
                              : 0
                          ].image
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "10px 0 0 10px",
                      }}
                    />
                    <Stack
                      direction="column"
                      sx={{
                        width: "calc(100% - 170px)",
                        height: "100%",
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" alignItems="center">
                          <Typography
                            gutterBottom
                            variant="titleReason"
                            sx={{
                              width: "unset !important",
                              fontSize: "24px",
                              margin: "5px 6px 5px 16px",
                              padding: "0",
                            }}
                            component="div"
                          >
                            {
                              story[2].farmingArea[
                                mock.val?.indexDialogMain
                                  ? Number(mock.val.indexDialogMain)
                                  : 0
                              ].title
                            }
                          </Typography>
                          <Box
                            component="div"
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "KanitLight",
                              width: "220px",
                              height: "30px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              background: "#ffa000",
                              borderRadius: "8px",
                              color: "white",
                            }}
                          >
                            {`จำนวนผู้เลี้ยงปลากระชัง ${
                              story[2].farmingArea[
                                mock.val?.indexDialogMain
                                  ? Number(mock.val.indexDialogMain)
                                  : 0
                              ].amount
                            } ราย`}
                          </Box>
                        </Stack>
                        <IconButton
                          aria-label="close dialog"
                          color="error"
                          onClick={() => {
                            mock.setVal({
                              ...mock.val,
                              showDialog: false,
                              clickActive: null,
                              locationPageMain: story[2].locations,
                            });
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="contentReason"
                        sx={{
                          fontSize: "16px",
                          fontFamily: "KanitExtraLight",
                          WebkitLineClamp: "3",
                        }}
                      >
                        {
                          story[2].farmingArea[
                            mock.val?.indexDialogMain
                              ? Number(mock.val.indexDialogMain)
                              : 0
                          ].content
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
          </Stack>
        </Box>

        {/* <Canvas
          shadows
          gl={{ alpha: false }}
          camera={{ fov: 45 }}
          style={{ height: "100vh", position: "absolute" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Sky
            azimuth={0.1}
            turbidity={0.1}
            rayleigh={0.5}
            // sunPosition={[100, 20, 100]}
          />
        </Canvas> */}

        <Box component={"div"} id="map" sx={{ height: "100%", width: "100%" }}>
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              margin: "auto",
              // width: "100px",
              // height: "120px",
              // background: "white",
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
              sx={{ background: "white", borderRadius: "8px", boxShadow: 1 }}
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
                    {/* {e.icon} */}
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
              // "&::-webkit-scrollbar": {
              //   WebkitAppearance: "none",
              //   width: "8px",
              //   height: "8px",
              // },
              // "&::-webkit-scrollbar-thumb": {
              //   background: "#8e8e8b",
              //   borderRadius: "15px",
              // },
              // "&::-webkit-scrollbar-track": {
              //   background: "#f1f1f1",
              //   borderRadius: "15px",
              // },
            }}
          >
            {story.map((e: any) => {
              return (
                <MapContent
                  key={`story_${e.id}`}
                  data={e}
                  locationProp={locationMap}
                  idForScroll={getIdForScroll}
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
