import React from "react";
import { useState } from "react";
import AppMain from "./components/Main/AppMain";

export const Context = React.createContext();

// there will be routing here but for now just a return page

function App() {
  const [signedIn, setSignedIn] = useState(false)


  return (
    <Context.Provider value={[signedIn, setSignedIn]}>
          <AppMain />
    </Context.Provider>

  )
}

export default App;
