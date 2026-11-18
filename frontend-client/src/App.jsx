// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import LearningDetail from './pages/LearningDetail';
import EvaluationDetail from './pages/EvaluationDetail';
import ModuleDetail from './pages/ModuleDetail';

import PublicClass from './pages/PublicClass';
import DetailClass from './pages/DetailClass';
import MyClasses from './pages/MyClasses';
// import DetailClass from './pages/DetailClass';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/MyOrderDetail';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/learning/:id"
              element={
                <PrivateRoute>
                  <LearningDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluations/:id"
              element={
                <PrivateRoute>
                  <EvaluationDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/modules/:id"
              element={
                <PrivateRoute>
                  <ModuleDetail />
                </PrivateRoute>
              }
            />
            <Route path="/public-class" element={<PublicClass />} />
            <Route path="/public-class/:id" element={<DetailClass />} />
            <Route path="/my-classes" element={<MyClasses />} />
            <Route path="/my-classes/:id" element={<DetailClass />} />
            <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
            <Route path="/my-orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';

// // Import components one by one and test each
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import LearningDetail from './pages/LearningDetail';
// import EvaluationDetail from './pages/EvaluationDetail';
// import ModuleDetail from './pages/ModuleDetail';

// // Log each import to see which one is undefined
// console.log('LandingPage:', LandingPage);
// console.log('LoginPage:', LoginPage);
// console.log('RegisterPage:', RegisterPage);
// console.log('LearningDetail:', LearningDetail);
// console.log('EvaluationDetail:', EvaluationDetail);
// console.log('ModuleDetail:', ModuleDetail);
// console.log('Provider:', Provider);
// console.log('BrowserRouter:', BrowserRouter);
// console.log('store:', store);

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/learning/:id" element={<LearningDetail />} />
//           <Route path="/evaluation/:id" element={<EvaluationDetail />} />
//           <Route path="/module/:id" element={<ModuleDetail />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;
// // import React from 'react';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import { AuthProvider } from 'react-auth-kit';
// // import { store } from './store';
// // import LandingPage from './pages/LandingPage';
// // // import LoginPage from './pages/LoginPage';
// // // import RegisterPage from './pages/RegisterPage';
// // // import LearningDetail from './pages/LearningDetail';
// // // import EvaluationDetail from './pages/EvaluationDetail';
// // // import ModuleDetail from './pages/ModuleDetail';
// // // import PrivateRoute from './components/auth/PrivateRoute';

// // function App() {
// //   return (
// //     <Provider store={store}>
// //       <AuthProvider
// //         authType="cookie"
// //         authName="_auth"
// //         cookieDomain={window.location.hostname}
// //         cookieSecure={false}
// //       >
// //         <BrowserRouter>
// //           <Routes>
// //             <Route path="/" element={<LandingPage />} />
// //             {/* <Route path="/login" element={<LoginPage />} />
// //             <Route path="/register" element={<RegisterPage />} />
// //             <Route path="/learning/:id" element={
// //               <PrivateRoute>
// //                 <LearningDetail />
// //               </PrivateRoute>
// //             } />
// //             <Route path="/evaluation/:id" element={
// //               <PrivateRoute>
// //                 <EvaluationDetail />
// //               </PrivateRoute>
// //             } />
// //             <Route path="/module/:id" element={
// //               <PrivateRoute>
// //                 <ModuleDetail />
// //               </PrivateRoute>
// //             } /> */}
// //           </Routes>
// //         </BrowserRouter>
// //       </AuthProvider>
// //     </Provider>
// //   );
// // }

// // export default App;
// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from './assets/vite.svg'
// // // import heroImg from './assets/hero.png'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <section id="center">
// // //         <div className="hero">
// // //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// // //           <img src={reactLogo} className="framework" alt="React logo" />
// // //           <img src={viteLogo} className="vite" alt="Vite logo" />
// // //         </div>
// // //         <div>
// // //           <h1>Get started</h1>
// // //           <p>
// // //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// // //           </p>
// // //         </div>
// // //         <button
// // //           type="button"
// // //           className="counter"
// // //           onClick={() => setCount((count) => count + 1)}
// // //         >
// // //           Count is {count}
// // //         </button>
// // //       </section>

// // //       <div className="ticks"></div>

// // //       <section id="next-steps">
// // //         <div id="docs">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#documentation-icon"></use>
// // //           </svg>
// // //           <h2>Documentation</h2>
// // //           <p>Your questions, answered</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://vite.dev/" target="_blank">
// // //                 <img className="logo" src={viteLogo} alt="" />
// // //                 Explore Vite
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://react.dev/" target="_blank">
// // //                 <img className="button-icon" src={reactLogo} alt="" />
// // //                 Learn more
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //         <div id="social">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#social-icon"></use>
// // //           </svg>
// // //           <h2>Connect with us</h2>
// // //           <p>Join the Vite community</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://github.com/vitejs/vite" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#github-icon"></use>
// // //                 </svg>
// // //                 GitHub
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://chat.vite.dev/" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#discord-icon"></use>
// // //                 </svg>
// // //                 Discord
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://x.com/vite_js" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#x-icon"></use>
// // //                 </svg>
// // //                 X.com
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#bluesky-icon"></use>
// // //                 </svg>
// // //                 Bluesky
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       </section>

// // //       <div className="ticks"></div>
// // //       <section id="spacer"></section>
// // //     </>
// // //   )
// // // }

// // // export default App
