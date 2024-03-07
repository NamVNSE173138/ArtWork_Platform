import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Upload from "./page/Upload";
import Admin from "./page/Admin/Admin";
import SignIn from "./page/Authentication/SignIn";
import EmailSignup from "./page/Authentication/EmailSignup";
import SignUp from "./page/Authentication/SignUp";
import Forgot from "./page/Authentication/Forgot";
import Reset from "./page/Authentication/Reset";
import Navigator from "./page/Navigator/Navigator";
import Artwork from "./page/Artwork/Artwork";
import FavoriteList from "./page/FavoriteList/FavoriteList";
import ArtistList from "./page/ArtistList";
import ArtistProfile from "./components/ArtistProfile/ArtistProfile";
import ArtworkRequest from "./page/ArtworkRequest";
import ProfilePage from "./components/Profile/Profile";
import NotificationPage from "./page/NotificationPage/test";

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
      <Route path="/upload" element={<Upload />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/artwork/:id" element={<Artwork />} />
      <Route path="/favoriteList" element={<FavoriteList />} />
      <Route path="/artistList" element={<ArtistList />} />
      <Route path="/artistList/:_id" element={<ArtistProfile />} />
      <Route path="/artworkRequest" element={<ArtworkRequest />} />

      <Route path="/notifications" element={<NotificationPage />} />
    </Routes>
  );
}

export default App;
