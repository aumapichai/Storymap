import styled from "@emotion/styled";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { AnyPointerEvent } from "framer-motion/types/gestures/PanSession";
import { NextPage } from "next";
import React, { FC, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Element, Events } from "react-scroll";
import { MockContext } from "./DataContext";
import DialogMine from "./dialogMine";
import CloseIcon from "@mui/icons-material/Close";
import { Map, Marker } from "maplibre-gl";

const ItemPapers = styled(Paper)({
  // background: "rgba( 255, 255, 255, 0.85 )",
  background: "white",
  // boxShadow: "0 3px 10px 0 rgba( 31, 38, 135, 0.37 )",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  // backdropFilter: "blur(0px)",
  // webkitBackdropFilter: "blur( 0px )",
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
  const { locationProp } = props;
  const { stateIcon } = props;

  // const [open, setOpen] = React.useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,

    // delay: 1000,
  });

  // const [location, setLocation] = useState(null);

  const [arrayIndex, setArrayIndex] = React.useState(0);

  const controls = useAnimation();

  const [selectedId, setSelectedId] = useState(null);

  const [clickActive, setClickActive] = useState(null);

  const [showDialogMine, setShowDialogMine] = useState(false);
  const [dialogFarm, setDialogFarm] = useState(false);
  const [offset, setOffset] = useState(0);

  const [tranProb, setTranProb] = useState(true);

  useEffect(() => {
    let stateIcon = mock.val?.stateIcon ? true : false;

    if (inView) {
      controls.start("enter");
      setClickActive(null);
      // setShowDialogMine(false);
      // setDialogFarm(false);
      setArrayIndex(0);
      mock.setVal({
        ...mock.val,
        showDialog: false,
        indexDialogMain: 0,
        clickActive: null,
        locationPageMain: {},
      });
      const timer = setTimeout(() => {
        locationProp.flyTo(data.locations);
        props.idForScroll(data.id);
        markerFunc(data.locations.center);
        // const marker = new Marker()
        //   .setLngLat(data.locations.center)
        //   .addTo(locationProp);
        // return () => {
        //   marker.remove();
        // };
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (!inView) {
      controls.start("exit");
      setClickActive(null);
      // setShowDialogMine(false);
      // setDialogFarm(false);
      setArrayIndex(0);
      mock.setVal({
        ...mock.val,
        showDialog: false,
        indexDialogMain: 0,
        clickActive: null,
        locationPageMain: {},
      });
    }
  }, [controls, inView, locationProp]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClickLocation = (e: any) => {
    markerFunc(e.center);
    // const marker1 = new Marker().setLngLat(e.center).addTo(locationProp);
    const timer2 = setTimeout(() => {
      locationProp.flyTo(e);
    }, 700);
    return () => {
      clearTimeout(timer2);
      // marker1.remove();
    };
  };

  const markerFunc = (locationFunc: any) => {
    const marker1 = new Marker({
      color: "#ffa000",
      draggable: false,
    })
      .setLngLat(locationFunc)
      .addTo(locationProp);
    return () => marker1.remove();
  };

  let checkLocationPageMain = mock.val?.locationPageMain
    ? mock.val.locationPageMain
    : {};
  if (Object.keys(checkLocationPageMain).length !== 0) {
    handleClickLocation(checkLocationPageMain);
  }

  const BtnYear = styled(Button)({
    height: 60,
    weight: 60,
    borderRadius: "50%",
    background: "#ff9b57",
    fontSize: "16px",
    fontFamily: "KanitRegular",
    "&:hover": {
      background: "#ff4444",
    },
  });

  const boxAnimation = {
    key: "box",
    initial: {
      y: "50%",
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: "50%",
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

  const setDataContext = (e: any) => {
    let checkActive = mock.val?.clickActive ? mock.val.clickActive : null;
    if (checkActive === e.id) {
      if (mock.val?.showDialog) {
        mock.setVal({
          ...mock.val,
          showDialog: false,
          indexDialogMain: e.index,
          typeDialog: e.type,
          clickActive: null,
          locationPageMain: {},
        });
      } else {
        mock.setVal({
          ...mock.val,
          showDialog: true,
          indexDialogMain: e.index,
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
          indexDialogMain: e.index,
          typeDialog: e.type,
          clickActive: e.id,
          locationPageMain: {},
        });
        setTimeout(() => {
          mock.setVal({
            ...mock.val,
            showDialog: true,
            indexDialogMain: e.index,
            typeDialog: e.type,
            clickActive: e.id,
            locationPageMain: {},
          });
        }, 700);
      } else {
        mock.setVal({
          ...mock.val,
          showDialog: true,
          indexDialogMain: e.index,
          typeDialog: e.type,
          clickActive: e.id,
          locationPageMain: {},
        });
      }
    }
  };
  return (
    <Box
      component={"div"}
      id={data.id}
      sx={{
        height: "100vh",
        position: "relative",
        zIndex: 1,
        background: data.id === 0 ? "white" : "unset",
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
          >
            <Typography variant="titleMain">{data.title}</Typography>
            <Box
              component={"div"}
              sx={{
                backgroundImage: `url(/images/360_F_398324429_sjH.jpg)`,
                width: "100px",
                height: "35px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Stack>
        </ItemPapers>
        <ItemPapers sx={{ px: 3, py: 2, mt: 2 }}>
          {data.descriptions.length === 0 ? (
            ""
          ) : (
            <Typography variant="description" mb={2}>
              {data.descriptionMain}
            </Typography>
          )}

          <Grid container spacing={2}>
            {data.descriptions.length === 0
              ? ""
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
                        onClick={
                          () => {
                            setArrayIndex(index);
                            setDataContext({
                              id: e.id,
                              type: "data_fish",
                              index: index,
                            });
                          }

                          // e.id === clickActive
                          //   ? {}
                          //   : !mock.val?.showDialog
                          //   ? mock.setVal({
                          //       ...mock.val,
                          //       showDialog: true,
                          //       typeDialog: "data_fish",
                          //       indexDialogFish: index,
                          //     })
                          //   : mock.setVal({
                          //       ...mock.val,
                          //       showDialog: false,
                          //       typeDialog: "data_fish",
                          //       indexDialogFish: index,
                          //     });
                          // setTimeout(() => {
                          //   mock.setVal({
                          //     ...mock.val,
                          //     showDialog: true,
                          //     typeDialog: "data_fish",
                          //     indexDialogFish: index,
                          //   });
                          // }, 500);
                        }
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

            {data.farmingArea.length === 0 ? (
              ""
            ) : (
              <>
                <Grid item xs={12}>
                  <BoxImages
                    sx={{
                      backgroundImage: `url(/images/${data.farmingArea[0].image})`,
                      backgroundPosition: "top !important",
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
                      {data.farmingArea[0].title}
                    </Typography>
                  </BoxImages>
                </Grid>

                {data.farmingArea
                  .filter((e: any) => e.no !== "0")
                  .map((e: any, index: any) => (
                    <Grid key={`farm_${e.id}`} item xs={4}>
                      <motion.button
                        whileFocus={
                          mock.val?.clickActive === e.id ? { scale: 1.07 } : {}
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
                            backgroundPosition: "top !important",
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
                            });
                            // e.id === clickActive
                            //   ? {}
                            //   : !mock.val?.showDialog
                            //   ? mock.setVal({
                            //       ...mock.val,
                            //       showDialog: true,
                            //       typeDialog: "data_farming",
                            //       indexDialogFarming: index + 1,
                            //     })
                            //   : mock.setVal({
                            //       ...mock.val,
                            //       showDialog: false,
                            //       typeDialog: "data_farming",
                            //       indexDialogFarming: index + 1,
                            //     });
                            // setTimeout(() => {
                            //   mock.setVal({
                            //     ...mock.val,
                            //     showDialog: true,
                            //     typeDialog: "data_farming",
                            //     indexDialogFarming: index + 1,
                            //   });
                            // }, 500);
                            if (mock.val?.clickActive === e.id) {
                              handleClickLocation(data.locations);
                            } else {
                              handleClickLocation(e.locations);
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
                          {/* <Typography
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: "0 8px",
                            margin: "5px 0",
                            color: "white",
                            fontFamily: "KanitLight",
                            textShadow: "0 0 8px black",
                          }}
                        >
                          {e.amount} ราย
                        </Typography> */}
                        </BoxImages>
                      </motion.button>
                    </Grid>
                  ))}
              </>
            )}

            {data.descriptionProblem.length === 0 ? (
              ""
            ) : (
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
                            setArrayIndex(index);
                            handleClickLocation(
                              data.descriptionProblem[index].locations
                            );
                            setTranProb(false);
                            setTimeout(() => {
                              setTranProb(true);
                            }, 700);
                          }}
                        >
                          {/* <BtnYear
                            sx={{
                              background:
                                arrayIndex === index
                                  ? "#ff4444 !important"
                                  : "",
                            }}
                            variant="contained"
                            onClick={() => {
                              setArrayIndex(index);
                              handleClickLocation(
                                data.descriptionProblem[index].locations
                              );
                              setTranProb(false);
                              setTimeout(() => {
                                setTranProb(true);
                              }, 700);
                            }}
                          > */}
                          ปี {e.yearP}
                          {/* </BtnYear> */}
                        </motion.button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} pt={2} pl={2}>
                  <Box
                    component={"div"}
                    mx={2}
                    sx={{ height: 220, overflow: "hidden" }}
                  >
                    <AnimatePresence>
                      {tranProb && (
                        <motion.div {...boxAnimation3}>
                          <Typography variant="description">
                            {data.descriptionProblem[arrayIndex].descP}
                          </Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </Grid>
              </>
            )}
            {data.reasonProblem.length === 0 ? (
              ""
            ) : (
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
                                  width: "30px",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  background: "#ffa000",
                                  borderRadius: "50%",
                                  color: "white",
                                  marginLeft: "8px",
                                  boxShadow: "0 0 3px 1px #d8d8d8",
                                }}
                              >
                                {e.year}
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
              ? ""
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
            {data.otherEffects.length === 0
              ? ""
              : data.otherEffects.map((e: any) => (
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
                              } else {
                                setClickActive(e.id);
                                handleClickLocation(e.locations);
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
                                // textShadow: "0 0 8px black",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: "3",
                                overflow: "hidden",
                                display: "-webkit-box",
                                // textIndent: "28px",
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
            {data.others.length === 0 ? (
              ""
            ) : (
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
