import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Components/herder';
import Home from './Pages/home';
import Blogs from './Components/blogs';
import Footer from './Components/footer/footer';
import Thongtinsp from './Pages/thongtinsp';
import Nuochoanam from './Pages/nuochoanam';
import Nuochoanu from './Pages/nuochoanu';
import Mypham from './Pages/mypham';
import Combo from './Pages/combo';
import Giohang from './Pages/giohang';
import { Search } from './Pages/seach';
import Login from './Pages/login';
import Lichsudh from './Pages/lichsudh';

function App() {
 

  return (
    <Router>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/nuochoanam" element={<Nuochoanam/>}/>
        <Route path="/thongtinsp/:id" element={<Thongtinsp />} />
        <Route path="/nuochoanu" element={<Nuochoanu />} />
        <Route path="/mypham" element={<Mypham />} />
        <Route path="/combo" element={<Combo />} />
        <Route path="/giohang" element={<Giohang />} />
        <Route path="/search" element={<Search />} />
        <Route path='lichsudh' element={<Lichsudh/>}/>
        {/* Truyền prop onLoginSuccess vào component Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Blogs />
      <Footer />
    </Router>
  );
}

export default App;
