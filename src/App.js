import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"
import { useState } from "react";
import AppMain from "./components/Main/AppMain";

export const Context = React.createContext();

// there will be routing here but for now just a return page

function App() {
  // const location = useLocation();
  // const previousLocation = location.state?.previousLocation;
  const [signedIn, setSignedIn] = useState(true)


  return (
    <Context.Provider value={[signedIn, setSignedIn]}>
          <AppMain />
    </Context.Provider>

  )
}

export default App;
