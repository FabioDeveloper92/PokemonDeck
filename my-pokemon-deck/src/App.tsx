import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBarComponent } from "./app/common/components/nav-bar.components";
import { SearchContainer } from "./app/pokemon/components/search/search.container";
import { DeckContainer } from "./app/pokemon/components/deck/deck.container";
import { DetailContainer } from "./app/pokemon/components/detail/detail.container";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarComponent />
        <Routes>
          <Route exact path="/" element={<SearchContainer />}></Route>
          <Route exact path="/deck" element={<DeckContainer />}></Route>
          <Route exact path="/detail" element={<DetailContainer />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
