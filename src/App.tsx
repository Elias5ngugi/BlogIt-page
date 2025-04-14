import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Authx/AuthContext'; 
import LandingPage from './Pages/LandingPage/LandingPage';
import SignUpPage from './Pages/SignUp/SignUpPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import BlogListingPage from './Pages/BlogListing/BlogListingPage';
import WritePage from './Pages/WritePage/WritePage';
import ArticlePage from './Pages/ArticlePage/ArticlePage';
import MyBlogsPage from './Pages/MyBlogsPage/MyBlogsPage';
import MyProfilePage from './Pages/MyProfile/MyProfilePage';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider> 
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          
          {/* Protected routes */}
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <WritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myblogs"
            element={
              <ProtectedRoute>
                <MyBlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
