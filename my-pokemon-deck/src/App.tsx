import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBarComponent } from "./app/common/components/nav-bar.components";
import { SearchContainer } from "./app/pokemon/components/search/search.container";
import { DeckContainer } from "./app/pokemon/components/deck/deck.container";
import { DetailContainer } from "./app/pokemon/components/detail/detail.container";
import { NotFoundComponent } from "./app/common/components/not-found.components";
import { FooterComponent } from "./app/common/components/footer.components";
import { PokedexContainer } from "./app/pokemon/components/pokedex/pokedex.container";

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column min-vh-100">
        <NavBarComponent />
        <Routes>
          <Route exact path="/" element={<SearchContainer />}></Route>
          <Route exact path="/deck" element={<DeckContainer />}></Route>
          <Route exact path="/detail/:id" element={<DetailContainer />}></Route>
          <Route exact path="/pokedex" element={<PokedexContainer />}></Route>
          <Route path="*" element={<NotFoundComponent />}></Route>
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
