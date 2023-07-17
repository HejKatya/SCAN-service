import React from "react";
import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import AppMain from "./components/Main/AppMain";
import AppAuthorization from "./components/Authorization/AppAuthorization"
import AppSearch from "./components/Search/AppSearch"
import AppResults from "./components/Results/AppResults"

export const MyContext = React.createContext();

function App() {
  const [signedIn, setSignedIn] = useState(true)

  return (
    <>
     <MyContext.Provider value={[signedIn, setSignedIn]}>
      <Routes>
      <Route path="/" element={<AppMain />}></Route>
      <Route path="/authorization" element={<AppAuthorization />}></Route>
      <Route path="/search" element={<AppSearch />}></Route>
      <Route path="/results" element={<AppResults />}></Route>
    </Routes>
     </MyContext.Provider>
    
    </>
  )
}

export default App;
