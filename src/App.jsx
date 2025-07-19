import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import Museuims from "./pages/Museuims";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="museuims" element={<Museuims />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
