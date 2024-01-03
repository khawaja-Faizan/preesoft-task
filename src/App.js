import { Routes, Route } from "react-router-dom";

import Login from "./view/Login.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import Home from "./view/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Login} path="/login" />
        <Route Component={ProtectedRoute} path="/" exact>
          <Route Component={Home} path="/" exact />
        </Route>
      </Routes>
    </>
  );
}

export default App;
