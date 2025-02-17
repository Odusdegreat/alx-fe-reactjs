import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div>
      <Header />
      <WelcomeMessage />
      <MainContent />
      <UserProfile />
      <Footer />
      <h1>Welcome to My React App</h1>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
    </div>
  );
}

export default App;
