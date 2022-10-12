import Home from "./pages/Home";
import Demo from "./pages/Demo";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
