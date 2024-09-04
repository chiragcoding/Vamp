// /* eslint-disable no-unused-vars */

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"



import Order from "./pages/Orders"
import Navbar from "./components/Navbar";
import { ShopContextProvider } from "./context/ShopContext";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <ShopContextProvider>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order/>}/>
      </Routes>
      <Footer/>
      </ShopContextProvider>
    </div>
  )
}

export default App
