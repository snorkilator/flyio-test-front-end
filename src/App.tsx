import "./App.css";
import Reviews from "./Reviews.tsx"
import Home from "./Home.tsx"

import {Link, Route, Routes } from "react-router-dom";

function App() {
  return (<>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/reviews">Reviews</Link></li>
  </ul>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/reviews" element={<Reviews />}/>
  </Routes>
  </>
  );
}

export default App;
