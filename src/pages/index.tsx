import type { NextPage } from "next";
import { Fragment } from "react";
import MainMap from "../components/mainMap";
import { MockContextProvider } from "../context/DataContext";

const Home: NextPage = () => {
  return (
    <Fragment>
      <MockContextProvider>
        <MainMap />
      </MockContextProvider>
    </Fragment>
  );
};

export default Home;
