import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProfileDetails from "./components/ProfileDetails";
import Profile from "./components/Profile";
import ProfileSettings from "./components/ProfileSettings";
import BlogPost from "./components/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <ProfileDetails />
      <ProfileSettings />
      <Profile />
      <BlogPost />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="/blog/:id" element={<BlogPost />} /> {/* Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default App;
