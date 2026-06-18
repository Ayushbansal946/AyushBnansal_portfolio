import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ProcessSection from './sections/ProcessSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import CertificatesSection from './sections/CertificatesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';

// Admin Routes
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function PortfolioHome() {
  return (
    <div
      className="bg-bg min-h-screen text-text-main selection:bg-accent selection:text-white relative"
    >
      <div className="fixed inset-0 z-40 pointer-events-none opacity-[0.04] mix-blend-overlay bg-noise" />
      <Navigation />
      <main className="flex flex-col relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ProcessSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificatesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
