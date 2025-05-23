// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Auth/Login';
// import SignUp from './pages/Auth/SignUp';
// import Home from './pages/Dashboard/Home';
// import Income from './pages/Dashboard/Income';
// import Expense from './pages/Dashboard/Expense';
// import { UserProvider } from './context/UserContext';
// import { Toaster } from 'react-hot-toast';
// import LandingPage from './pages/landingPage/LandingPage';

// function App() {


//   const Root = () => {
//     //check if token exist or not in local storage
//     const isAuthenticated = !!localStorage.getItem("token");

//     // Redirect to dashboard if authentiated, otherwise to login

//     return isAuthenticated ? (
//       <Navigate to="/dashboard" />
//     ) : (
//       <Navigate to="/login" />
//     );
//   };


//   return (
//     <>
//       <UserProvider>
//         <div>
//           <Router>
//             <Routes>
//               <Route path="/" element={<LandingPage />} />
//               {/* <Route path='/' element={<Root />} /> */}
//               <Route path='/login' element={<Login />} />
//               <Route path='/signup' element={<SignUp />} />
//               <Route path='/dashboard' element={<Home />} />
//               <Route path='/income' element={<Income />} />
//               <Route path='/expense' element={<Expense />} />
//             </Routes>
//           </Router>
//         </div>

//         <Toaster
//           toastOptions={{
//             className: '',
//             style: {
//               fontSize: '13px',
//             },
//           }}
//         />


//       </UserProvider>
//     </>
//   )
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/landingPage/LandingPage';

function App() {
  // Check if token exists in local storage to determine if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
              <Route path="/income" element={isAuthenticated ? <Income /> : <Navigate to="/login" />} />
              <Route path="/expense" element={isAuthenticated ? <Expense /> : <Navigate to="/login" />} />
            </Routes>
          </Router>
        </div>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px',
            },
          }}
        />
      </UserProvider>
    </>
  );
}

export default App;
