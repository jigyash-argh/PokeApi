import { Routes, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { Homepage } from "./components/pages/Homepage";
import { Arena } from "./components/pages/Arena";
export const App=()=>{
  return(
    <Routes>
      <Route path="/about" element={<About/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<Arena/>}/>
    </Routes>
  )
}