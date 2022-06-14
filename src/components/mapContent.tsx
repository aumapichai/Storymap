import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Threebox } from "threebox-plugin";
import * as THREE from "three";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { MockContext } from "../context/DataContext";

const ItemPapers = styled(Paper)({
  background: "white",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

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

const MapContent: NextPage<any> = (props) => {
  const mock = useContext(MockContext);
  const { data } = props;
  const { locationProp, animationStart, setAnimationStart } = props;
  const { stateIcon } = props;

  // const [open, setOpen] = React.useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [arrayIndex, setArrayIndex] = React.useState(0);

  const controls = useAnimation();

  const [clickActive, setClickActive] = useState(null);

  const [tranProb, setTranProb] = useState(true);

  const [animation] = useState<any>({});
  const [rotate, setRotate] = useState<any>(0);
  const [tranFarm, setTranFarm] = useState(true);
  const [showFarm, setShowFarm] = useState(true);
  const [showFarm_1, setShowFarm_1] = useState(true);
  const [showFarm_2, setShowFarm_2] = useState(true);
  const [showFarm_3, setShowFarm_3] = useState(true);

  const scrollRef = useRef(null);
  const scrollTop = useRef(null);

  const [isDown, setIsDown] = useState(false);

  const [hoverOnScroll, setHoverOnScroll] = useState(false);

  useEffect(() => {
    let isPlay: any = false;
    let fish: any;
    let mixers: any[] = [];
    let clock: any;
    let mixer1: any;
    let mixer2: any;
    let mixer3: any;

    if (inView && locationProp) {
      isPlay = false;

      controls.start("enter");
      setClickActive(null);
      setShowFarm(true);

      setArrayIndex(0);
      mock.setVal({
        ...mock.val,
        showDialog: false,
        indexDialogMain: 0,
        clickActive: null,
        locationPageMain: {},
        indexDialogFarming: 0,
      });
      const timer = setTimeout(() => {
        locationProp.flyTo({
          center: data.locations.center,
          zoom: data.locations.zoom,
          speed: 1.2,
          curve: 1,
          essential: true,
          easing(t: any) {
            return t;
          },
        });

        locationProp?.setPaintProperty(
          "water",
          "fill-extrusion-color",
          "rgba(146, 196, 231, 1)"
        );
        locationProp?.setPaintProperty("water", "fill-extrusion-height", 0);

        locationProp?.setPaintProperty(
          "background",
          "background-color",
          "rgba(181, 224, 173, 1)"
        );

        props.idForScroll(data.id);

        if (data.id !== 0 && window.tb.world?.children?.length) {
          isPlay = false;
          window.tb.world?.children?.map((rs: any, index: any) => {
            window.tb.remove(window.tb.world.children[index]);
          });

          if (locationProp.getLayer("model-fish")) {
            locationProp.removeLayer("model-fish");
          }

          fish = undefined;
          mixers = [];
          clock = undefined;
          mixer1 = undefined;
          mixer2 = undefined;
          mixer3 = undefined;
        } else {
          if (data.id === 0) {
            window.tb.clear();

            window.tb = new Threebox(
              locationProp,
              locationProp.getCanvas().getContext("webgl"),
              {
                defaultLights: true,
              }
            );

            isPlay = false;

            let customLayer = {
              id: "model-fish",
              type: "custom",
              renderingMode: "3d",
              onAdd: function (map: any, gl: any) {
                let options = {
                  type: "glb", //model type
                  obj: `/models/fish.glb`,
                  units: "meters", // in meters
                  scale: 20,
                  rotation: { x: 90, y: 180, z: 0 },
                  anchor: "center",
                };
                window.tb.loadObj(options, function (model: any) {
                  fish = model;
                  mixer1 = new THREE.AnimationMixer(model);
                  mixer2 = new THREE.AnimationMixer(model);
                  mixer3 = new THREE.AnimationMixer(model);

                  console.log(model.animations);
                  fish.setCoords([106.3328610586887, 9.568141549456763, 0]);
                  fish.castShadow = true;
                  fish.addEventListener(
                    "ObjectChanged",
                    onObjectChanged,
                    false
                  );

                  mixer1.clipAction(model.animations[0]).play();
                  mixer2.clipAction(model.animations[1]).play();
                  mixer3.clipAction(model.animations[2]).play();

                  mixers.push(mixer1, mixer2, mixer3);

                  window.tb.add(fish);

                  renderAnimation();
                  isPlay = true;
                  clock = new THREE.Clock();

                  ani();
                });
              },
              render: function (gl: any, matrix: any) {
                window.tb.update();
              },
            };
            locationProp.addLayer(customLayer as any);

            const renderAnimation = async () => {
              const getData = await fetch(
                "https://cloud.vallarismaps.com/core/api/features/1.0/collections/629b8a105ac9bd64b6940e9d/items?api_key=SmxDVKuhZO2bbxwiRb7uaGUXoN8WYR6aaeg4BfyFbxTpq98sax5ZCz5TYXWlrMIB"
              )
                .then((rs) => rs.json())
                .then((rs) => rs);
              const router = getData.features[0].geometry.coordinates[0].map(
                (s: any, i: any) => {
                  return [...s, -200];
                }
              );
              var options = {
                path: router,
                duration: 1200000,
                trackHeading: true,
              };

              fish.followPath(options, function () {});
            };

            const easing = (t: any) => {
              return t * (2 - t);
            };

            const onObjectChanged = (e: any) => {
              let model = e.detail.object;
              locationProp.easeTo({
                center: model.coordinates,
                essential: true,
                pitch: 80,
                easing: easing,
                zoom: 15.8,
                bearing: -90,
              });
            };

            const ani = () => {
              if (!isPlay) {
              } else {
                const delta = clock.getDelta();

                for (const mixer of mixers) mixer.update(delta);
                requestAnimationFrame(ani);
              }
            };

            return () => {
              window.tb.dispose();
            };
          }
        }
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (!inView) {
      controls.start("exit");
      setClickActive(null);
      setShowFarm(true);
      // setShowDialogMine(false);
      // setDialogFarm(false);
      setArrayIndex(0);
      mock.setVal({
        ...mock.val,
        showDialog: false,
        indexDialogMain: 0,
        clickActive: null,
        locationPageMain: {},
        indexDialogFarming: 0,
      });
    }
  }, [controls, inView, locationProp]);

  const handleClickLocation = (
    e: any,
    add3d?: boolean,
    modelOptions?: {
      modelPath: string;
      type: string;
      scale: number;
      rotation: any;
      duplicate?: boolean;
    },
    remove3d?: boolean
  ) => {
    setAnimationStart(false);
    const timer2 = setTimeout(() => {
      locationProp.flyTo(e);

      setTimeout(() => {
        setAnimationStart(true);
      }, 5000);
    }, 700);

    if (remove3d) {
      if (window.tb.world?.children?.length) {
        if (locationProp.getLayer("model")) {
          locationProp.removeLayer("model");
          locationProp.repaint = true;
        }
        window.tb.world?.children?.map((rs: any, index: any) => {
          return window.tb.remove(window.tb.world.children[index]);
        });
      }
    }
    if (add3d) {
      if (locationProp.getLayer("model")) {
        locationProp.removeLayer("model");
        locationProp.repaint = true;
      }
      if (window.tb.world?.children?.length) {
        window.tb.world?.children?.map((rs: any, index: any) => {
          return window.tb.remove(window.tb.world.children[index]);
        });
      }

      let myModel: any;
      let customLayer = {
        id: "model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map: any, gl: any) {
          let options = {
            type: modelOptions?.type, //model type
            obj: modelOptions?.modelPath,
            units: "meters", // in meters
            scale: modelOptions?.scale,
            rotation: modelOptions?.rotation,
            anchor: "center",
            cloned: modelOptions?.duplicate ? true : false,
          };
          window.tb.loadObj(options, function (model: any) {
            myModel = model;
            if (modelOptions?.duplicate) {
              locationProp.once("idle", () => {
                let features = locationProp.queryRenderedFeatures(undefined, {
                  layers: ["village"],
                });

                if (features) {
                  features.forEach(function (pt: any) {
                    let newSphere = myModel
                      .duplicate()
                      .setCoords(pt.geometry.coordinates);

                    newSphere.castShadow = true;
                    window.tb.add(newSphere);
                  });
                }
              });
            } else {
              myModel.setCoords(e.center);
              myModel.castShadow = true;

              window.tb.add(myModel);
            }
          });
        },
        render: function (gl: any, matrix: any) {
          window.tb.update();
        },
      };

      locationProp.addLayer(customLayer as any);
    }

    return () => {
      clearTimeout(timer2);
    };
  };

  let checkLocationPageMain = mock.val?.locationPageMain
    ? mock.val.locationPageMain
    : {};
  if (Object.keys(checkLocationPageMain).length !== 0) {
    handleClickLocation(checkLocationPageMain);
  }

  const boxAnimation2 = {
    key: "box",
    initial: {
      x: -30,
      opacity: 0,
      // scale: 0.5,
    },
    animate: {
      x: 0,
      opacity: 1,
      // scale: 1,
    },
    exit: {
      x: 30,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  };

  const boxAnimation3 = {
    key: "box",
    initial: {
      y: 30,
      opacity: 0,
      // scale: 0.5,
    },
    animate: {
      y: 0,
      opacity: 1,
      // scale: 1,
    },
    exit: {
      y: 30,
      opacity: 0,
      transition: {
        duration: 0.9,
      },
    },
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  };

  const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const sideScrollTop = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmountTop = 0;
    const slideTimerTop = setInterval(() => {
      element.scrollTop += step;
      scrollAmountTop += Math.abs(step);
      if (scrollAmountTop >= distance) {
        clearInterval(slideTimerTop);
      }
    }, speed);
  };

  const setDataContext = (e: any) => {
    let checkActive = mock.val?.clickActive ? mock.val.clickActive : null;
    if (checkActive === e.id) {
      if (mock.val?.showDialog) {
        mock.setVal({
          ...mock.val,
          showDialog: false,
          [e.indexName]: 0,
          typeDialog: e.type,
          clickActive: null,
          locationPageMain: {},
        });
      } else {
        mock.setVal({
          ...mock.val,
          showDialog: true,
          [e.indexName]: 0,
          typeDialog: e.type,
          clickActive: null,
          locationPageMain: {},
        });
      }
    } else {
      if (mock.val?.showDialog) {
        mock.setVal({
          ...mock.val,
          showDialog: false,
          [e.indexName]: e.index,
          typeDialog: e.type,
          clickActive: e.id,
          locationPageMain: {},
        });
        setTimeout(() => {
          mock.setVal({
            ...mock.val,
            showDialog: true,
            [e.indexName]: e.index,
            typeDialog: e.type,
            clickActive: e.id,
            locationPageMain: {},
          });
        }, 700);
      } else {
        mock.setVal({
          ...mock.val,
          showDialog: true,
          [e.indexName]: e.index,
          typeDialog: e.type,
          clickActive: e.id,
          locationPageMain: {},
        });
      }
    }
  };

  const animate = () => {
    setRotate((t: any) => (t + 0.1) % 360);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  useEffect(() => {
    if (animationStart && locationProp) {
      if (data.id === 0) {
      } else {
        locationProp.rotateTo(rotate, { duration: 0 });
      }
    }
  }, [rotate, animationStart, locationProp, data]);

  return (
    <Box
      component={"div"}
      id={data.id}
      sx={{
        height: "100vh",
        position: "relative",
        zIndex: 1,
        background: "unset",
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
        <ItemPapers
          sx={
            data.id === 0
              ? {
                  background: "transparent !important",
                  boxShadow: "unset !important",
                  border: "unset !important",
                }
              : {}
          }
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
          >
            <Typography
              variant="titleMain"
              sx={{ fontSize: data.id === 0 ? "42px" : "24px" }}
            >
              {data.title}
            </Typography>

            <Box
              component={"div"}
              sx={{
                backgroundImage: `url(/images/360_F_398324429_sjH.jpg)`,
                width: "100px",
                height: "35px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                display: data.id === 0 ? "none" : "",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="end"
            sx={{ display: data.id === 0 ? "" : "none" }}
          >
            <Typography
              variant="titleCard"
              sx={{ paddingRight: "60px", fontSize: "30px", marginTop: "10px" }}
            >
              Dev Mini Marathon
            </Typography>
          </Stack>
        </ItemPapers>
        <ItemPapers
          sx={{ px: 3, py: 2, mt: 2, display: data.id === 0 ? "none" : "" }}
        >
          {data.descriptions.length === 0 ? null : (
            <Typography variant="description" mb={2}>
              {data.descriptionMain}
            </Typography>
          )}

          <Grid container spacing={2}>
            {data.descriptions.length === 0
              ? null
              : data.descriptions.map((e: any, index: any) => (
                  <Grid key={`desc_${e.id}`} item xs={6}>
                    <motion.button
                      whileFocus={
                        e.id === mock.val?.clickActive ? { scale: 1.03 } : {}
                      }
                      style={{
                        border: "unset",
                        background: "unset",
                        padding: "0",
                        textAlign: "unset",
                      }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          boxShadow:
                            e.id === mock.val?.clickActive
                              ? "0 0 0 4px #f2d61d !important"
                              : "",
                          "&:hover": {
                            boxShadow: "0 0 0 4px #f2d61d",
                          },
                        }}
                        onClick={() => {
                          setArrayIndex(index);
                          setDataContext({
                            id: e.id,
                            type: "data_fish",
                            index: index,
                            indexName: "indexDialogFish",
                          });
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="110"
                          image={e.imageFish}
                          alt="Tilapia Fish"
                        />
                        <CardContent sx={{ pt: 1, px: 2 }}>
                          <Typography
                            gutterBottom
                            variant="titleCard"
                            component="div"
                          >
                            {e.title}
                          </Typography>
                          <Typography variant="descriptionCard">
                            {e.description2}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            p: 0,
                            justifyContent: "end",
                            fontSize: "16px",
                          }}
                        ></CardActions>
                      </Card>
                    </motion.button>
                  </Grid>
                ))}

            {data.farmingArea.length === 0 ? null : (
              <>
                <Grid item xs={12}>
                  <BoxImages sx={{ boxShadow: "unset !important" }}>
                    <AnimatePresence>
                      {tranFarm && (
                        <motion.div {...boxAnimation2}>
                          <BoxImages
                            sx={{
                              backgroundImage: `url(/images/${
                                data.farmingArea[
                                  mock.val?.indexDialogFarming
                                    ? Number(mock.val.indexDialogFarming)
                                    : 0
                                ].image
                              })`,
                              backgroundPosition: "center !important",
                              position: "relative",
                            }}
                          >
                            <Box
                              component={"div"}
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                background:
                                  "linear-gradient(7deg, #0e0e0e, transparent)",
                                width: "100%",
                                height: "37%",
                                borderRadius: "0 0 8px 8px",
                              }}
                            />
                            <Typography
                              sx={{
                                position: "absolute",
                                fontSize: "24px",
                                bottom: 0,
                                left: 0,
                                padding: "0 17px",
                                margin: "8px 0",
                                color: "white",
                                fontFamily: "KanitLight",
                                textShadow: "0 0 8px black",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: "1",
                                overflow: "hidden",
                                display: "-webkit-box",
                              }}
                            >
                              {
                                data.farmingArea[
                                  mock.val?.indexDialogFarming
                                    ? Number(mock.val.indexDialogFarming)
                                    : 0
                                ].title
                              }
                            </Typography>
                          </BoxImages>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </BoxImages>
                </Grid>

                <Grid item xs={12} sx={{ height: "380px", overflow: "hidden" }}>
                  <AnimatePresence>
                    {showFarm ? (
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <AnimatePresence>
                          {showFarm_1 && (
                            <motion.div
                              initial={{ y: 40, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 40, opacity: 0 }}
                              transition={{ duration: 0.6 }}
                              style={{ width: "100%", height: "100%" }}
                            >
                              <Grid container spacing={2}>
                                {data.farmingArea
                                  .filter((e: any) => e.no !== "0")
                                  .map((e: any, index: any) => (
                                    <Grid key={`farm_${e.id}`} item xs={4}>
                                      <motion.button
                                        whileFocus={
                                          mock.val?.clickActive === e.id
                                            ? { scale: 1.07 }
                                            : {}
                                        }
                                        style={{
                                          border: "unset",
                                          background: "unset",
                                          padding: "0",
                                          textAlign: "unset",
                                          width: "100%",
                                        }}
                                      >
                                        <BoxImages
                                          sx={{
                                            backgroundImage: `url(/images/${e.image})`,
                                            backgroundPosition:
                                              "top !important",
                                            position: "relative",
                                            height: "105px !important",
                                            cursor: "pointer",
                                            margin: "0 !important",
                                            boxShadow:
                                              e.id === mock.val?.clickActive
                                                ? "0 0 0 4px #f2d61d !important"
                                                : "",
                                            "&:hover": {
                                              boxShadow: "0 0 0 4px #f2d61d",
                                            },
                                          }}
                                          onClick={() => {
                                            setArrayIndex(index + 1);
                                            setDataContext({
                                              id: e.id,
                                              type: "data_farming",
                                              index: index + 1,
                                              indexName: "indexDialogFarming",
                                            });
                                            setShowFarm(false);
                                            setShowFarm_1(false);
                                            setTimeout(() => {
                                              setShowFarm_1(true);
                                            }, 700);
                                            setTranFarm(false);
                                            setTimeout(() => {
                                              setTranFarm(true);
                                            }, 700);
                                            setShowFarm_2(false);
                                            setTimeout(() => {
                                              setShowFarm_2(true);
                                            }, 500);
                                            setShowFarm_3(false);
                                            setTimeout(() => {
                                              setShowFarm_3(true);
                                            }, 500);
                                            if (
                                              mock.val?.clickActive === e.id
                                            ) {
                                              // handleClickLocation(
                                              //   data.locations
                                              // );
                                              handleClickLocation(
                                                data.locations,
                                                undefined,
                                                undefined,
                                                true
                                              );
                                            } else {
                                              // handleClickLocation(e.locations);
                                              handleClickLocation(
                                                e.locations,
                                                true,
                                                {
                                                  modelPath:
                                                    "/models/village.glb",
                                                  type: "glb",
                                                  scale: e.actions.scale,
                                                  rotation: e.actions.rotation,
                                                }
                                              );
                                            }
                                          }}
                                        >
                                          <Box
                                            component={"div"}
                                            sx={{
                                              position: "absolute",
                                              bottom: 0,
                                              left: 0,
                                              background:
                                                "linear-gradient(0deg, #4a4a4a, transparent)",
                                              width: "100%",
                                              height: "38%",
                                              borderRadius: "0 0 8px 8px",
                                            }}
                                          />
                                          <Typography
                                            sx={{
                                              position: "absolute",
                                              bottom: 0,
                                              left: 0,
                                              padding: "0 8px",
                                              margin: "5px 0",
                                              color: "white",
                                              fontFamily: "KanitLight",
                                              textShadow: "0 0 8px black",
                                            }}
                                          >
                                            {e.title}
                                          </Typography>
                                        </BoxImages>
                                      </motion.button>
                                    </Grid>
                                  ))}
                              </Grid>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <>
                        <Box
                          component={"div"}
                          sx={{
                            width: "100%",
                            height: "calc(100% - 127px)",
                            marginBottom: "16px",
                          }}
                        >
                          <AnimatePresence>
                            {showFarm_2 && (
                              <motion.div
                                initial={{ y: -40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <Stack
                                  direction="column"
                                  sx={{
                                    width: "100%",
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
                                          data.farmingArea[
                                            mock.val?.indexDialogFarming
                                              ? Number(
                                                  mock.val.indexDialogFarming
                                                )
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
                                          data.farmingArea[
                                            mock.val?.indexDialogFarming
                                              ? Number(
                                                  mock.val.indexDialogFarming
                                                )
                                              : 0
                                          ].amount
                                        } ราย`}
                                      </Box>
                                    </Stack>
                                  </Stack>
                                  <Typography
                                    mt={1}
                                    variant="description"
                                    sx={{
                                      fontSize: "16px",
                                      // fontFamily: "KanitExtraLight",
                                      // WebkitLineClamp: "8",
                                      textAlign: "left",
                                    }}
                                  >
                                    {
                                      data.farmingArea[
                                        mock.val?.indexDialogFarming
                                          ? Number(mock.val.indexDialogFarming)
                                          : 0
                                      ].content
                                    }
                                  </Typography>
                                </Stack>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Box>
                        <AnimatePresence>
                          {showFarm_3 && (
                            <motion.div
                              initial={{ y: -40, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -40, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "130px",
                              }}
                            >
                              <Box
                                component={"div"}
                                sx={{
                                  opacity: isDown ? 1 : 0,
                                  transitionDuration: "0.8s",
                                  position: "absolute",
                                  left: 1,
                                  zIndex: 2,
                                  top: 0,
                                  bottom: 0,
                                  margin: "auto",
                                  height: "fit-content",
                                }}
                                onClick={() =>
                                  sideScroll(
                                    scrollRef.current as any,
                                    25,
                                    181,
                                    -10
                                  )
                                }
                                onMouseEnter={() => setIsDown(true)}
                              >
                                <IconButton
                                  aria-label="ChevronLeftIcon"
                                  sx={{
                                    background: "rgba( 255, 255, 255, 0.7 )",
                                    color: "dark",
                                    boxShadow: 4,
                                    backdropFilter: "blur( 5px )",
                                    "&:hover": {
                                      background: "rgba( 255, 255, 255, 0.9 )",
                                    },
                                  }}
                                >
                                  <ChevronLeftIcon />
                                </IconButton>
                              </Box>
                              <Box
                                component={"div"}
                                sx={{
                                  opacity: isDown ? 1 : 0,
                                  transitionDuration: "0.8s",
                                  position: "absolute",
                                  right: 1,
                                  zIndex: 2,
                                  top: 0,
                                  bottom: 0,
                                  margin: "auto",
                                  height: "fit-content",
                                }}
                                onClick={() =>
                                  sideScroll(
                                    scrollRef.current as any,
                                    25,
                                    181,
                                    10
                                  )
                                }
                                onMouseEnter={() => setIsDown(true)}
                              >
                                <IconButton
                                  aria-label="ChevronLeftIcon"
                                  sx={{
                                    background: "rgba( 255, 255, 255, 0.7 )",
                                    color: "dark",
                                    boxShadow: 4,
                                    backdropFilter: "blur( 5px )",
                                    "&:hover": {
                                      background: "rgba( 255, 255, 255, 0.9 )",
                                    },
                                  }}
                                >
                                  <ChevronRightIcon />
                                </IconButton>
                              </Box>
                              <Grid
                                container
                                spacing={2}
                                ref={scrollRef}
                                sx={{
                                  position: "relative",

                                  height: "130px",
                                  flexDirection: "column",
                                  overflowY: "auto",
                                  width: "calc(100% + 27px)",
                                  "& .MuiGrid-item:last-child": {
                                    paddingRight: "16px",
                                  },
                                  "&::-webkit-scrollbar": {
                                    height: 0,
                                  },
                                  "&::-webkit-scrollbar-track": {
                                    height: 0,
                                  },
                                  "&::-webkit-scrollbar-thumb": {
                                    height: 0,
                                  },
                                }}
                                onMouseEnter={() => setIsDown(true)}
                                onMouseLeave={() => setIsDown(false)}
                              >
                                {data.farmingArea
                                  .filter((e: any) => e.no !== "0")
                                  .map((e: any, index: any) => (
                                    <Grid
                                      component={"div"}
                                      key={`farm_${e.id}`}
                                      item
                                      xs={4}
                                      sx={{ width: "174px !important" }}
                                    >
                                      <motion.button
                                        whileFocus={
                                          mock.val?.clickActive === e.id
                                            ? { scale: 1.07 }
                                            : {}
                                        }
                                        style={{
                                          border: "unset",
                                          background: "unset",
                                          padding: "0",
                                          textAlign: "unset",
                                          width: "100%",
                                        }}
                                      >
                                        <BoxImages
                                          sx={{
                                            backgroundImage: `url(/images/${e.image})`,
                                            backgroundPosition:
                                              "top !important",
                                            position: "relative",
                                            height: "105px !important",
                                            cursor: "pointer",
                                            margin: "0 !important",
                                            boxShadow:
                                              e.id === mock.val?.clickActive
                                                ? "0 0 0 4px #f2d61d !important"
                                                : "",
                                            "&:hover": {
                                              boxShadow: "0 0 0 4px #f2d61d",
                                            },
                                          }}
                                          onClick={() => {
                                            setArrayIndex(index + 1);
                                            setDataContext({
                                              id: e.id,
                                              type: "data_farming",
                                              index: index + 1,
                                              indexName: "indexDialogFarming",
                                            });
                                            setShowFarm(false);
                                            setTranFarm(false);
                                            setTimeout(() => {
                                              setTranFarm(true);
                                            }, 700);
                                            setShowFarm_2(false);
                                            setTimeout(() => {
                                              setShowFarm_2(true);
                                            }, 500);
                                            if (
                                              mock.val?.clickActive === e.id
                                            ) {
                                              setShowFarm(true);
                                              setShowFarm_1(true);
                                              // handleClickLocation(
                                              //   data.locations
                                              // );
                                              handleClickLocation(
                                                data.locations,
                                                undefined,
                                                undefined,
                                                true
                                              );
                                            } else {
                                              // handleClickLocation(e.locations);
                                              handleClickLocation(
                                                e.locations,
                                                true,
                                                {
                                                  modelPath:
                                                    "/models/village.glb",
                                                  type: "glb",
                                                  scale: e.actions.scale,
                                                  rotation: e.actions.rotation,
                                                }
                                              );
                                            }
                                          }}
                                        >
                                          <Box
                                            component={"div"}
                                            sx={{
                                              position: "absolute",
                                              bottom: 0,
                                              left: 0,
                                              background:
                                                "linear-gradient(0deg, #4a4a4a, transparent)",
                                              width: "100%",
                                              height: "38%",
                                              borderRadius: "0 0 8px 8px",
                                            }}
                                          />
                                          <Typography
                                            sx={{
                                              position: "absolute",
                                              bottom: 0,
                                              left: 0,
                                              padding: "0 8px",
                                              margin: "5px 0",
                                              color: "white",
                                              fontFamily: "KanitLight",
                                              textShadow: "0 0 8px black",
                                            }}
                                          >
                                            {e.title}
                                          </Typography>
                                        </BoxImages>
                                      </motion.button>
                                    </Grid>
                                  ))}
                              </Grid>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </AnimatePresence>
                </Grid>
              </>
            )}

            {data.descriptionProblem.length === 0 ? null : (
              <>
                <Grid item xs={12} mt={1}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#595959",
                    }}
                  >
                    {data.descriptionProblem[arrayIndex].headerP}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ pt: "3px !important" }}>
                  <BoxImages sx={{ boxShadow: "unset !important" }}>
                    <AnimatePresence>
                      {tranProb && (
                        <motion.div {...boxAnimation2}>
                          <BoxImages
                            sx={{
                              backgroundImage: `url(/images/${data.descriptionProblem[arrayIndex].imageP})`,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </BoxImages>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" alignItems="center">
                    {data.descriptionProblem.map((e: any, index: any) => (
                      <Grid
                        key={`descPrl_${e.idP}`}
                        item
                        xs={2}
                        textAlign="center"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.2,
                            y: -2,
                          }}
                          style={{
                            cursor: "pointer",
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background:
                              arrayIndex === index ? "#ff4444" : "#ff9b57",
                            fontSize: "16px",
                            fontFamily: "KanitRegular",
                            color: "white",
                            border: "unset",
                          }}
                          onClick={() => {
                            setArrayIndex((oldIndex) => {
                              if (data.descriptionProblem[oldIndex].actions) {
                                locationProp.setPaintProperty(
                                  data.descriptionProblem[oldIndex].actions
                                    .layerId,
                                  data.descriptionProblem[oldIndex].actions
                                    .paint,
                                  data.descriptionProblem[oldIndex].actions
                                    .default
                                );
                              }

                              return index;
                            });

                            if (data.descriptionProblem[index].actions) {
                              setTimeout(() => {
                                locationProp.setPaintProperty(
                                  data.descriptionProblem[index].actions
                                    .layerId,
                                  data.descriptionProblem[index].actions.paint,
                                  data.descriptionProblem[index].actions.color
                                );
                              }, 500);
                            }

                            handleClickLocation(
                              data.descriptionProblem[index].locations
                            );
                            setTranProb(false);
                            setTimeout(() => {
                              setTranProb(true);
                            }, 700);
                          }}
                        >
                          ปี {e.yearP}
                        </motion.button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} pt={2} pl={2}>
                  <Box
                    component={"div"}
                    mx={2}
                    sx={{
                      height: 220,
                      overflow: "hidden",
                    }}
                  >
                    <AnimatePresence>
                      {tranProb && (
                        <motion.div {...boxAnimation3}>
                          <Typography
                            variant="description"
                            sx={{
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: "7",
                              overflow: "hidden",
                              display: "-webkit-box",
                              height: "168px",
                            }}
                          >
                            {data.descriptionProblem[arrayIndex].descP}
                          </Typography>
                          <Stack direction="row" justifyContent="end">
                            <Link
                              href={data.descriptionProblem[arrayIndex].href}
                            >
                              <a target="_blank">
                                <Typography
                                  variant="titleReason"
                                  sx={{ color: "gray" }}
                                >
                                  อ่านต่อ...
                                </Typography>{" "}
                              </a>
                            </Link>
                          </Stack>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </Grid>
              </>
            )}
            {data.reasonProblem.length === 0 ? null : (
              <>
                <Grid item xs={12} mt={1}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#595959",
                    }}
                  >
                    สาเหตุของปัญหาของปลานิลที่ตาย
                  </Typography>
                </Grid>

                {data.reasonProblem.map((e: any) => (
                  <Grid key={`reaPrl_${e.id}`} item xs={12}>
                    <motion.button
                      whileFocus={e.id === clickActive ? { scale: 1.03 } : {}}
                      style={{
                        border: "unset",
                        background: "unset",
                        padding: 0,
                      }}
                    >
                      <Box
                        component={"div"}
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          "& > :not(style)": {
                            width: "100%",
                            height: 90,
                          },
                        }}
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            borderRadius: 2,
                            display: "flex",
                            cursor: "pointer",
                            boxShadow:
                              e.id === clickActive
                                ? "0 0 0 4px #f2d61d !important"
                                : "",
                            "&:hover": {
                              boxShadow: "0 0 0 4px #f2d61d",
                            },
                          }}
                          onClick={() => {
                            if (clickActive === e.id) {
                              setClickActive(null);
                              handleClickLocation(data.locations);
                            } else {
                              setClickActive(e.id);
                              handleClickLocation(e.locations);
                            }
                          }}
                        >
                          <Box
                            component={"div"}
                            sx={{
                              backgroundImage: `url(/images/${e.image})`,
                              height: "100%",
                              width: "110px",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              borderRadius: "8px 0 0 8px",
                            }}
                          />
                          <Stack
                            direction="column"
                            sx={{ width: "calc(100% - 100px)" }}
                          >
                            <Stack direction="row" alignItems="center">
                              <Box
                                component={"div"}
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  fontFamily: "KanitLight",
                                  width: "50px",
                                  background: "#ffa000",
                                  borderRadius: "4px",
                                  padding: "2px 8px",
                                  color: "white",
                                  marginLeft: "8px",
                                  boxShadow: "0 0 3px 1px #d8d8d8",
                                }}
                              >
                                {`ปี ${e.year}`}
                              </Box>
                              <Typography
                                gutterBottom
                                variant="titleReason"
                                component="div"
                                sx={{ textAlign: "start" }}
                              >
                                {e.title}
                              </Typography>
                            </Stack>
                            <Typography
                              variant="contentReason"
                              sx={{ textAlign: "start" }}
                            >
                              {e.content}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Box>
                    </motion.button>
                  </Grid>
                ))}
              </>
            )}
            {data.dataDam.length === 0
              ? null
              : data.dataDam.map((e: any) => (
                  <Grid item xs={12} mt={1} key={`dam_${e.id}`}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#595959",
                          }}
                        >
                          {e.title}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sx={{ pt: "3px !important" }}>
                        <motion.button
                          whileFocus={
                            e.id === clickActive ? { scale: 1.03 } : {}
                          }
                          style={{
                            width: "100%",
                            border: "unset",
                            background: "unset",
                            padding: 0,
                          }}
                        >
                          <BoxImages
                            sx={{
                              backgroundImage: `url(/images/${e.image})`,
                              position: "relative",
                              backgroundPosition: `${e.imagePostion} !important`,
                              cursor: "pointer",

                              boxShadow:
                                e.id === clickActive
                                  ? "0 0 0 4px #f2d61d !important"
                                  : "",
                              "&:hover": {
                                boxShadow: "0 0 0 4px #f2d61d",
                              },
                            }}
                            onClick={() => {
                              if (clickActive === e.id) {
                                setClickActive(null);
                                handleClickLocation(
                                  data.locations,
                                  undefined,
                                  undefined,
                                  true
                                );
                              } else {
                                setClickActive(e.id);
                                handleClickLocation(e.locations, true, {
                                  modelPath: "/models/dam.glb",
                                  type: "glb",
                                  scale: 5,
                                  rotation: { x: 90, y: 180, z: 0 },
                                });
                              }
                            }}
                          >
                            <Box
                              component={"div"}
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                background:
                                  "linear-gradient(0deg, #000000ba, transparent)",
                                width: "100%",
                                height: "80%",
                                borderRadius: "0 0 8px 8px",
                              }}
                            />

                            <Typography
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                padding: "0 8px",
                                margin: "8px 0",
                                color: "white",
                                fontFamily: "KanitLight",
                                textShadow: "0 0 8px black",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: "2",
                                overflow: "hidden",
                                display: "-webkit-box",
                                textAlign: "start",
                              }}
                            >
                              {e.content}
                            </Typography>
                          </BoxImages>
                        </motion.button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            {data.otherEffects.length === 0 ? null : (
              <Grid
                item
                xs={12}
                sx={{ position: "relative" }}
                onMouseEnter={() => setHoverOnScroll(true)}
                onMouseLeave={() => setHoverOnScroll(false)}
              >
                <Box
                  component={"div"}
                  sx={{
                    opacity: hoverOnScroll ? 1 : 0,
                    transitionDuration: "0.8s",
                    position: "absolute",
                    top: 15,
                    zIndex: 2,
                    left: 16,
                    right: 0,
                    margin: "auto",
                    width: "fit-content",
                  }}
                >
                  <Tooltip title="ผลกระทบก่อนหน้า" placement="top">
                    <IconButton
                      aria-label="ChevronLeftIcon"
                      sx={{
                        background: "rgba( 255, 255, 255, 0.7 )",
                        color: "dark",
                        boxShadow: 4,
                        backdropFilter: "blur( 5px )",
                        transform: "rotate(90deg)",
                        "&:hover": {
                          background: "rgba( 255, 255, 255, 0.9 )",
                        },
                      }}
                      onMouseEnter={() => setHoverOnScroll(true)}
                      onClick={() =>
                        sideScrollTop(scrollTop.current as any, 25, 280, -10)
                      }
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    opacity: hoverOnScroll ? 1 : 0,
                    transitionDuration: "0.8s",
                    position: "absolute",
                    bottom: 0,
                    zIndex: 2,
                    left: 16,
                    right: 0,
                    margin: "auto",
                    width: "fit-content",
                  }}
                >
                  <Tooltip title="ผลกระทบถัดไป" placement="bottom">
                    <IconButton
                      aria-label="ChevronLeftIcon"
                      sx={{
                        background: "rgba( 255, 255, 255, 0.7 )",
                        color: "dark",
                        boxShadow: 4,
                        backdropFilter: "blur( 5px )",
                        transform: "rotate(-90deg)",
                        "&:hover": {
                          background: "rgba( 255, 255, 255, 0.9 )",
                        },
                      }}
                      onMouseEnter={() => setHoverOnScroll(true)}
                      onClick={() =>
                        sideScrollTop(scrollTop.current as any, 25, 280, 10)
                      }
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Grid
                  container
                  ref={scrollTop}
                  columnSpacing={2}
                  sx={{
                    width: "calc(100% + 32px) !important",
                    height: "520px",
                    overflow: "hidden",
                    "&::-webkit-scrollbar": { width: 0 },
                    "&::-webkit-scrollbar-thumb": {
                      width: 0,
                    },
                    "&::-webkit-scrollbar-track": {
                      width: 0,
                    },
                    paddingRight: "16px",
                  }}
                >
                  {data.otherEffects.map((e: any) => (
                    <Grid item xs={12} key={`otEf_${e.id}`}>
                      <Grid container>
                        <Grid item xs={12}>
                          <motion.button
                            whileFocus={
                              e.id === clickActive ? { scale: 1.03 } : {}
                            }
                            style={{
                              width: "100%",
                              border: "unset",
                              background: "unset",
                              padding: 0,
                            }}
                          >
                            <BoxImages
                              sx={{
                                backgroundImage: `url(/images/${e.image})`,
                                height: "240px !important",
                                position: "relative",
                                cursor: "pointer",

                                boxShadow:
                                  e.id === clickActive
                                    ? "0 0 0 4px #f2d61d !important"
                                    : "",
                                "&:hover": {
                                  boxShadow: "0 0 0 4px #f2d61d",
                                },
                              }}
                              onClick={() => {
                                if (clickActive === e.id) {
                                  setClickActive(null);
                                  handleClickLocation(data.locations);
                                  locationProp.setPaintProperty(
                                    "water",
                                    "fill-extrusion-color",
                                    "rgba(146, 196, 231, 1)"
                                  );
                                } else {
                                  setClickActive(e.id);
                                  handleClickLocation(e.locations);
                                  locationProp.setPaintProperty(
                                    "water",
                                    "fill-extrusion-color",
                                    e.actions.color
                                  );
                                }
                              }}
                            >
                              <Box
                                component={"div"}
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  background: "white",
                                  width: "100%",
                                  height: "37%",
                                  borderRadius: "0 0 8px 8px",
                                }}
                              />
                              <Box
                                component={"div"}
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  background:
                                    "linear-gradient( -191deg, #00000099, #00000000)",
                                  width: "100%",
                                  height: "22%",
                                  borderRadius: "8px 8px 0 0",
                                }}
                              />
                              <Typography
                                sx={{
                                  position: "absolute",
                                  fontSize: "24px",
                                  top: 0,
                                  left: 0,
                                  padding: "0 17px",
                                  margin: "8px 0",
                                  color: "white",
                                  fontFamily: "KanitLight",
                                  textShadow: "0 0 8px black",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: "1",
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                }}
                              >
                                {e.title}
                              </Typography>
                              <Typography
                                sx={{
                                  position: "absolute",
                                  bottom: 90,
                                  left: 0,
                                  padding: "3px 0",
                                  margin: "3px",
                                  textAlign: "center",
                                  background: "#ff902a",
                                  borderRadius: "8px",
                                  color: "white",
                                  width: "110px",
                                }}
                              >
                                {e.dam}
                              </Typography>
                              <Typography
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  padding: "0 17px",
                                  margin: "8px 0",
                                  color: "#424242",
                                  fontFamily: "KanitLight",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: "3",
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  textAlign: "left",
                                }}
                              >
                                {e.content}
                              </Typography>
                            </BoxImages>
                          </motion.button>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            {data.others.length === 0 ? null : (
              <>
                <Grid item xs={12}>
                  <BoxImages
                    sx={{
                      backgroundImage: `url(/images/${data.others[0].image})`,

                      position: "relative",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                {data.others.map((e: any) => (
                  <Grid key={`other_${e.id}`} item xs={12}>
                    <Typography
                      variant="description"
                      sx={{
                        fontFamily: "KanitLight",
                        color: "#646464",
                        textAlign: "start",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: "KanitLight",
                          fontSize: "20px",
                          color: "#7bc22f",
                          fontWeight: "600",
                          paddingRight: "3px",
                        }}
                      >
                        {e.title}
                      </Typography>
                      {e.content}
                    </Typography>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </ItemPapers>
      </motion.div>
    </Box>
  );
};

export default MapContent;
