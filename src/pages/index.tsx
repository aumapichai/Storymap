import { Box } from "@mui/material";
import type { NextPage } from "next";

import { Fragment } from "react";
import DisplayMain from "../components/displayMain";
import Map from "../components/map";
import { MockContextProvider } from "./DataContext";
import MainMap from "./mainMap";
import Test from "./test";

const Home: NextPage = () => {
  return (
    <Fragment>
      <MockContextProvider>
        {/* <Box sx={{ width: "100vw", height: "100vh", background: "red" }}></Box> */}
        {/* <DisplayMain /> */}
        {/* <Map /> */}
        {/* <Test /> */}
        <MainMap />
      </MockContextProvider>
    </Fragment>
  );
};

export default Home;
