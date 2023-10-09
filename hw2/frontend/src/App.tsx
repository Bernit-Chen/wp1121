import HeaderBar from "@/components/HeaderBar";
import Home from "@/pages/Home";
import View from "@/pages/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <HeaderBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/View" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
