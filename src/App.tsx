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
import ArtistList from "./page/VisualizeRequest/ArtistList";
import RequestRequirements from "./page/VisualizeRequest/RequestRequirements";
import ArtistProfile from "./page/ArtistProfile";
import ArtworkRequest from "./page/ArtworkRequest";
import ProfilePage from "./components/Profile/Profile";
// import NotificationPage from "./page/NotificationPage/NotificationPage";
import CartPage from "./page/Cart/CartPage";
import VisualizeRequest from "./page/VisualizeRequest/RequestHistory";
import RequestApproval from "./page/UserRequestOnArtist/RequestApproval";
import UserRequestOnArtist from "./page/UserRequestOnArtist/UserRequestOnArtist";
import VnPayPayment from "./components/VNPay/VnPayPayment";
import NotFound from "./page/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigator />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/upload" element={<UploadImageForm />} />
      <Route path="/profile/" element={<ProfilePage />} />
      <Route path="/profile/requests" element={<UserRequestOnArtist />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/artwork/:id" element={<Artwork />} />
      <Route path="/favoriteList" element={<FavoriteList />} />
      <Route path="/request" element={<ArtistList />} />
      <Route path="/request/history" element={<VisualizeRequest />} />
      <Route path="/request/requirements/:id" element={<RequestRequirements />} />
      <Route path="/userRequest/approval/:id" element={<RequestApproval />} />
      <Route path="/artistList/:_id" element={<ArtistProfile />} />
      <Route path="/artworkRequest" element={<ArtworkRequest />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order/vnpay_return" element={<VnPayPayment />} />
      {/* <Route path="/notifications" element={<NotificationPage />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
