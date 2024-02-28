import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBarComponent } from "./app/common/components/nav-bar.components";
import { SearchContainer } from "./app/pokemon/search/search.container";
import { DeckContainer } from "./app/pokemon/deck/deck.container";
import { DetailContainer } from "./app/pokemon/detail/detail.container";

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
