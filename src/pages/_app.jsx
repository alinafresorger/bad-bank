import React from "react";
import { NavBar } from "../components/navbar";
import { UserContextProvider } from "../components/context";

import "./_app.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <NavBar />
      <div className="d-flex justify-content-center">
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}
