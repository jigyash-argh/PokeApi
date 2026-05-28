import { Routes, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { Homepage } from "./components/pages/Homepage";
import { Arena } from "./components/pages/Arena";
import { Navbar } from "./components/ui/Navbar";
export const App=()=>{
  return(
    <>
    <Navbar/>
      <Routes>
      <Route path="/about" element={<About/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/arena" element={<Arena/>}/>
    </Routes>
    </>

  )
}