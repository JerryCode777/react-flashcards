import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GroupsProvider } from './context/GroupsContext';
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import {
  Login,
  Register,
  Dashboard,
  Profile,
  Groups,
  Create,
  Flashcards,
} from "./pages";

const PrivateLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route
              element={
                <GroupsProvider>
                  <PrivateLayout />
                </GroupsProvider>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<Create />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:groupId/flashcards" element={<Flashcards />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;
