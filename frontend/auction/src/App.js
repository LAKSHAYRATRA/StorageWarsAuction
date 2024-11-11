import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactUs from './pages/Contactus';
import AllProducts from './pages/AllProducts';
import ListProduct from './pages/ListProduct';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import AddFunds from './pages/AddFunds'
import NotificationsPage from './pages/Notification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/notification" element={<NotificationsPage />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/add-funds" element={<AddFunds />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
