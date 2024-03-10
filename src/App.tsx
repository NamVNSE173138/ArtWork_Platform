import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import UploadImageForm from "./page/Upload";

import Admin from "./page/Admin/Admin";
import SignIn from "./page/Authentication/SignIn";
import EmailSignup from "./page/Authentication/EmailSignup";
import SignUp from "./page/Authentication/SignUp";
import Forgot from "./page/Authentication/Forgot";
import Reset from "./page/Authentication/Reset";
import Navigator from "./page/Navigator/Navigator";
import Artwork from "./page/Artwork/Artwork";
import FavoriteList from "./page/FavoriteList/FavoriteList";
import ArtistList from "./page/UserRequest/ArtistList";
import RequestRequirements from "./page/UserRequest/RequestRequirements";
import ArtistProfile from "./components/ArtistProfile/ArtistProfile";
import ArtworkRequest from "./page/ArtworkRequest";
import ProfilePage from "./components/Profile/Profile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigator />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/upload" element={<UploadImageForm />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/artwork/:id" element={<Artwork />} />
      <Route path="/favoriteList" element={<FavoriteList />} />
      <Route path="/request" element={<ArtistList />} />
      <Route path="/request/requirements/:id" element={<RequestRequirements />} />
      <Route path="/artistList/:_id" element={<ArtistProfile />} />
      <Route path="/artworkRequest" element={<ArtworkRequest />} />
    </Routes>
  );
}

export default App;
