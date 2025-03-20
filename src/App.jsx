import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import {
  Login,
  Register,
  Dashboard,
  Profile,
  Groups,
  Flashcards
} from "./pages";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:groupId/flashcards" element={<Flashcards />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;