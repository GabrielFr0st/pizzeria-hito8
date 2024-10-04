import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/registerpage';
import Login from './pages/loginpage';
import Cart from './pages/cart';
import Pizza from './pages/pizzas';
import Profile from './pages/profile';
import NotFound from './pages/notfound';
import Navbar from './components/navbar';
import { CartProvider } from './context/cartcontext'; 
import { UserProvider, useUser } from './context/UserContext';  // Importar UserProvider y useUser

function App() {
  return (
    <UserProvider>  {/* Envolver toda la app con UserProvider */}
      <CartProvider>
        <Router>
          <Navbar />  {/* El token se maneja dentro del contexto ahora */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<ProtectedRoute isAuth={false} redirectPath="/" element={<Register />} />} />
            <Route path="/login" element={<ProtectedRoute isAuth={false} redirectPath="/" element={<Login />} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />  {/* Pizza obtiene id dinámico */}
            <Route path="/profile" element={<ProtectedRoute isAuth={true} redirectPath="/login" element={<Profile />} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

function ProtectedRoute({ element, isAuth, redirectPath }) {
  const { token } = useUser(); 
  const isAuthenticated = isAuth ? token : !token;

  return isAuthenticated ? element : <Navigate to={redirectPath} />;
}

export default App;
