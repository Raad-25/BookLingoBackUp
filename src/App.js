import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

// Import Layout and Context Providers
import Layout from './Layout';
import { LanguageProvider } from './components/providers/LanguageContext';

// Import Page Components
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import FindInterpreters from './pages/FindInterpreters';
import InterpretersList from './pages/InterpretersList';
import InterpreterPublicProfile from './pages/InterpreterPublicProfile';
import ConsecutiveInterpretation from './pages/ConsecutiveInterpretation';
import SimultaneousInterpretation from './pages/SimultaneousInterpretation';
import RemoteInterpretation from './pages/RemoteInterpretation';
import DocumentTranslation from './pages/DocumentTranslation';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SupportChat from './pages/SupportChat';

// Import Styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Router>
            <div className="App">
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/find-interpreters" element={<FindInterpreters />} />
                  <Route path="/interpreters" element={<InterpretersList />} />
                  <Route path="/interpreter/:id" element={<InterpreterPublicProfile />} />
                  <Route path="/consecutive-interpretation" element={<ConsecutiveInterpretation />} />
                  <Route path="/simultaneous-interpretation" element={<SimultaneousInterpretation />} />
                  <Route path="/remote-interpretation" element={<RemoteInterpretation />} />
                  <Route path="/document-translation" element={<DocumentTranslation />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<SupportChat />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* 404 Page - Keep this last */}
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </Layout>
              
              {/* Global Toast Notifications */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </Router>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;