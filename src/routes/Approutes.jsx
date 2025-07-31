
import React from "react";
import {Routes,Route,Navigate,useLocation} from "react-router-dom" //to apply routing functionalities
import { Suspense } from "react"; //fallback ui (loading spiners etc..)
import { useAuth } from "../store/context/AuthContext";
import PrivateRoutes from "./PrivateRoutes"; // route _Guard 
import Navbar from "../components/common/Navbar";

const AuthPage = React.lazy(() => import('../pages/auth/Login')); 
const Home = React.lazy(() => import('../pages/users/Home'));
const About = React.lazy(() => import('../pages/users/About'));
const Contact = React.lazy(() => import('../pages/users/Contact'));
const Blog = React.lazy(() => import('../pages/users/Blog'));
const Shop = React.lazy(() => import('../pages/users/Shop'));
const Cart = React.lazy(() => import('../components/common/Cart'));
const VendorDashboard = React.lazy(() => import('../layouts/vendor/VendorDashboard'));
const AdminDashboard = React.lazy(() => import('..//layouts/admin/AdminLayout'));
const Unauthorized = React.lazy(() => import('../components/common/Unauthorized'));
const PageNotFound = React.lazy(() => import('../components/common/PageNotFound'));
const Orders = React.lazy(() => import('../components/common/Orders'));



const Approutes = () => {
   // access the context of user like authenticated  and role
  let {isAuthenticated,role}=useAuth()
  // uselocation hook to access the current url path
  
  let location=useLocation()
 
  

  let hideNavbar=['/auth']
  let shouldHideNav=hideNavbar.includes(location.pathname) //returns the true or false values

 

  return (
    <>
    {!shouldHideNav && <Navbar/>}
    <Suspense fallback={<div class="spinner-border" ><span class="visually-hidden">Loading...</span></div>}>
     <Routes>
       {/* public Routes */}
        <Route path="/" element={<Navigate to={'/shop'} replace/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/about" element={<About/>}/>

       {/* auth Routes (Roll based access ) */}
       {/* after authatication path will be like localhost:5174/admin  localhost:5174/vendor  localhost:5174/shop */}
       <Route path="/auth" element={
        isAuthenticated?(`/${role=="vendor"?"vendor":role=="admin"?"admin":"shop"}`)
        :(<AuthPage/>)}> 
       </Route>
       {/* protected Route (denied access to pages for all user before login) */}
      <Route element={<PrivateRoutes allowedUser={["public","admin","vendor"]}/>}>
            <Route path="/cart" element={<Cart/>}/>
        </Route>
       {/* Admin Routes */}
        <Route element={<PrivateRoutes allowedUser={["admin"]}/>}>
            <Route path="/admin" element={<AdminDashboard/>}/>
        </Route>
       {/* Vendor Routes */}
        <Route element={<PrivateRoutes allowedUser={["vendor"]}/>}>
            <Route path="/vendor" element={<VendorDashboard/>}/>
        </Route>
       {/* falback Routes */}
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="*" element={<PageNotFound/>}/>
     </Routes>
    </Suspense>
      
    </>
  )
}

export default Approutes
