// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../auth/AuthProvider'; // Import our custom auth
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth(); // Get signOut from our auth context
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Public Class', path: '/public-class' },
    { label: 'My Classes', path: '/my-classes' },
    { label: 'Summary Points', path: '/summary' },
    { label: 'My Orders', path: '/my-orders' },
    { label: 'Certificate', path: '/certificate' },
  ];

  const handleLogout = () => {
    signOut(); // Use signOut from our custom auth
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EA</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">
                Exam
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 justify-end items-center">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700 font-medium">
                    {user?.name || 'Student'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t mt-2">
            <div className="pt-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 px-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Signed in as <span className="font-medium text-gray-700">{user?.name || 'Student'}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-500 hover:text-red-700 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block text-blue-600 hover:text-blue-800 py-2 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-center text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
// // src/components/layout/Header.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useSignOut } from 'react-auth-kit';
// import { logout } from '../../store/slices/authSlice';

// export default function Header () {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const signOut = useSignOut();
//   const navigate = useNavigate();

//   const menuItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Public Class', path: '/public-class' },
//     { label: 'My Classes', path: '/my-classes' },
//     { label: 'Summary Points', path: '/summary' },
//     { label: 'Certificate', path: '/certificate' },
//   ];

//   const handleLogout = () => {
//     signOut();
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center">
//               <img
//                 src="/logo.png"
//                 alt="Logo"
//                 className="h-10 w-auto"
//               />
//               <span className="ml-2 text-xl font-bold text-gray-800">
//                 ExamApp
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex space-x-8">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <span className="text-gray-700">{user?.name}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-blue-600 hover:text-blue-800 px-3 py-2"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden pb-4">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 {item.label}
//               </Link>
//             ))}
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left text-red-500 px-3 py-2"
//               >
//                 Logout
//               </button>
//             ) : (
//               <div className="space-y-2 px-3 py-2">
//                 <Link to="/login" className="block text-blue-600">Login</Link>
//                 <Link to="/register" className="block text-blue-600">Register</Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// // export default Header;