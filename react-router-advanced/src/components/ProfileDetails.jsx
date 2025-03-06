import { Routes, Route, Link } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  return (
    <div>
      <h1>Profile Pages</h1>
      <nav>
        <Link to="details">Profile Details</Link>
      </nav>
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
      </Routes>
    </div>
  );
};
