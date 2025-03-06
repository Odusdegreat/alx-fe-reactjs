import { Routes, Route, Link } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <Link to="settings">Profile Settings</Link>
      </nav>
      <Routes>
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};
