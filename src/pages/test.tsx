import { Box, Paper, styled, Typography, Stack } from "@mui/material";
import { NextPage } from "next";
import React, { FC, Fragment, useEffect } from "react";
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
    <Fragment>
      <Grid item xs={12}>
        <Box
          component={"div"}
          sx={{
            height: "150px",
            margin: "8px 0 8px 0",
            width: "100%",
          }}
        >
          <AnimatePresence>
            {mock.val?.showDialog && mock.val?.typeDialog === "data_farming" ? (
              <motion.div
                {...boxAnimation2}
                style={{ width: "100%", height: "100%" }}
              >
                <BoxImages
                  sx={{
                    backgroundImage: `url(/images/${
                      data.farmingArea[
                        mock.val?.indexDialogMain
                          ? Number(mock.val.indexDialogMain)
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
                      background: "linear-gradient(7deg, #0e0e0e, transparent)",
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
                        mock.val?.indexDialogMain
                          ? Number(mock.val.indexDialogMain)
                          : 0
                      ].title
                    }
                  </Typography>
                </BoxImages>
              </motion.div>
            ) : !mock.val?.checkFarmArea ? (
              <motion.div
                {...boxAnimation2}
                style={{ width: "100%", height: "100%" }}
              >
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
                      background: "linear-gradient(7deg, #0e0e0e, transparent)",
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
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ height: "380px" }}>
        <Box component={"div"} sx={{ width: "100%", height: "380px" }}>
          <AnimatePresence>
            {mock.val?.checkFarmArea ? (
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "100%",
                  height: "calc(100% - 135px)",
                  // background: "red",
                  marginBottom: "8px",
                }}
              >
                <AnimatePresence>
                  {mock.val?.showDialog &&
                  mock.val?.typeDialog === "data_farming" ? (
                    <motion.div
                      style={{ width: "100%", height: "100%" }}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.6 }}
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
                                data.farmingArea[
                                  mock.val?.indexDialogMain
                                    ? Number(mock.val.indexDialogMain)
                                    : 0
                                ].amount
                              } ราย`}
                            </Box>
                          </Stack>
                        </Stack>
                        <Typography
                          mt={1}
                          variant="contentReason"
                          sx={{
                            fontSize: "16px",
                            fontFamily: "KanitExtraLight",
                            WebkitLineClamp: "7",
                          }}
                        >
                          {
                            data.farmingArea[
                              mock.val?.indexDialogMain
                                ? Number(mock.val.indexDialogMain)
                                : 0
                            ].content
                          }
                        </Typography>
                      </Stack>
                    </motion.div>
                  ) : (
                    ""
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>

          <Box
            component={"div"}
            sx={{
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
              onClick={() => sideScroll(scrollRef.current as any, 25, 181, -10)}
              onMouseEnter={() =>
                mock.val?.checkFarmArea ? setIsDown(true) : {}
              }
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
              onClick={() => sideScroll(scrollRef.current as any, 25, 181, 10)}
              onMouseEnter={() =>
                mock.val?.checkFarmArea ? setIsDown(true) : {}
              }
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
              sx={
                mock.val?.checkFarmArea
                  ? {
                      position: "relative",
                      // display: checkFarmArea ? "flex" : "",
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
                      // transitionDuration: "0.7s",
                      // transitionDelay: "1s",
                    }
                  : {}
              }
              onMouseEnter={() =>
                mock.val?.checkFarmArea ? setIsDown(true) : {}
              }
              onMouseLeave={() =>
                mock.val?.checkFarmArea ? setIsDown(false) : {}
              }
            >
              {data.farmingArea
                .filter((e: any) => e.no !== "0")
                .map((e: any, index: any) => (
                  <Grid
                    key={`farm_${e.id}`}
                    item
                    xs={4}
                    sx={{ width: "174px !important" }}
                  >
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
                          const checkFarm =
                            mock.val?.clickActive === e.id ? false : true;

                          // setCheckFarmArea(checkFarm);
                          checkFarm ? "" : setIsDown(false);

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
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default TestPage;
