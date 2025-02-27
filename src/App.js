// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import HomePage from "./Components/HomePage.js";
// import ProductListPage from "./Components/ProductListPage.js";
// import Background from "./Components/Background.js";
// import ProductDetailsPage from "./Components/ProductDetailsPage";
// import { CartProvider } from "./Components/Cart";
// import "./App.css";
// import HamburgerIcon from "./Components/HamburgerIcon";

// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent() {
//   const location = useLocation();

//   // Hide Background and HomePage when ProductListPage or ProductDetailsPage is displayed
//   const hideBackground = location.pathname !== "/";

//   return (
//     <>
//       <HamburgerIcon />
//       {!hideBackground && <HomePage />}
//       {!hideBackground && <Background />}

//       <Routes>
//         <Route path="/products" element={<ProductListPage />} />
//         <Route path="/product/:id" element={<ProductDetailsPage />} />
//       </Routes>
//     </>
//   );
// }
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import ProductListPage from "./Components/ProductListPage.js";
import Background from "./Components/Background.js";
import ProductDetailsPage from "./Components/ProductDetailsPage.js";
import { CartProvider } from "./Components/Cart.js";
import "./App.css";
import HamburgerIcon from "./Components/HamburgerIcon.js";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* ✅ Show HamburgerIcon ONLY on the Homepage */}
      {isHomePage && <HamburgerIcon />}

      {/* ✅ Show HomePage & Background ONLY on the Homepage */}
      {isHomePage && <HomePage />}
      {isHomePage && <Background />}

      {/* ✅ Routes for Other Pages */}
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </>
  );
}


