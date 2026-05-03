import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { APP_START_PATH, useInstalledAppMode } from '@/lib/appMode';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Tracking from './pages/Tracking';
import MealPlans from './pages/MealPlans';
import Blog from './pages/Blog';
import Appointment from './pages/Appointment';
import PlanSecheProgressive from './pages/PlanSecheProgressive';
import SecheWeeks from './pages/seche/SecheWeeks';
import SecheDays from './pages/seche/SecheDays';
import SecheRecipes from './pages/seche/SecheRecipes';
import SecheShopping from './pages/seche/SecheShopping';
import SecheSport from './pages/seche/SecheSport';
import SecheDrinks from './pages/seche/SecheDrinks';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/login';
import SignUp from './pages/signUp';
import ReequWeeks from './pages/reequilibrage/ReequWeeks';
import ReequDays from './pages/reequilibrage/ReequDays';
import ReequRecipes from './pages/reequilibrage/ReequRecipes';
import ReequShopping from './pages/reequilibrage/ReequShopping';
import ReequSuivi from './pages/reequilibrage/ReequSuivi';
import ReequPratique from './pages/reequilibrage/ReequPratique';
import PlanReequilibrage from './pages/PlanReequilibrage';

const RequireInstalledAppAuth = ({ isInstalledApp, isAuthenticated, children }) => {
  const location = useLocation();

  if (isInstalledApp && !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
};

const WebOnlyRoute = ({ isInstalledApp, isAuthenticated, children }) => {
  if (!isInstalledApp) {
    return children;
  }

  return <Navigate to={isAuthenticated ? APP_START_PATH : "/login"} replace />;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated } = useAuth();
  const isInstalledApp = useInstalledAppMode();

  const appRoute = (element) => (
    <RequireInstalledAppAuth isInstalledApp={isInstalledApp} isAuthenticated={isAuthenticated}>
      {element}
    </RequireInstalledAppAuth>
  );

  const webOnlyRoute = (element) => (
    <WebOnlyRoute isInstalledApp={isInstalledApp} isAuthenticated={isAuthenticated}>
      {element}
    </WebOnlyRoute>
  );

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={isInstalledApp ? APP_START_PATH : "/"} replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to={isInstalledApp ? APP_START_PATH : "/"} replace /> : <SignUp />}
      />
      <Route element={<Layout />}>
        <Route path="/" element={webOnlyRoute(<Home />)} />
        <Route path="/recettes" element={appRoute(<Recipes />)} />
        <Route path="/suivi" element={appRoute(<Tracking />)} />
        <Route path="/plans" element={appRoute(<MealPlans />)} />
        <Route path="/plans/seche-progressive" element={appRoute(<PlanSecheProgressive />)} />
        <Route path="/plans/seche-progressive/semaines" element={appRoute(<SecheWeeks />)} />
        <Route path="/plans/seche-progressive/journees" element={appRoute(<SecheDays />)} />
        <Route path="/plans/seche-progressive/recettes" element={appRoute(<SecheRecipes />)} />
        <Route path="/plans/seche-progressive/courses" element={appRoute(<SecheShopping />)} />
        <Route path="/plans/seche-progressive/sport" element={appRoute(<SecheSport />)} />
        <Route path="/plans/seche-progressive/boissons" element={appRoute(<SecheDrinks />)} />
        <Route path="/plans/reequilibrage-alimentaire" element={appRoute(<PlanReequilibrage />)} />
        <Route path="/plans/reequilibrage-alimentaire/semaines" element={appRoute(<ReequWeeks />)} />
        <Route path="/plans/reequilibrage-alimentaire/journees" element={appRoute(<ReequDays />)} />
        <Route path="/plans/reequilibrage-alimentaire/recettes" element={appRoute(<ReequRecipes />)} />
        <Route path="/plans/reequilibrage-alimentaire/courses" element={appRoute(<ReequShopping />)} />
        <Route path="/plans/reequilibrage-alimentaire/suivi" element={appRoute(<ReequSuivi />)} />
        <Route path="/plans/reequilibrage-alimentaire/conseils" element={appRoute(<ReequPratique />)} />
        <Route path="/blog" element={appRoute(<Blog />)} />
        <Route path="/rendez-vous" element={webOnlyRoute(<Appointment />)} />
        <Route path="*" element={appRoute(<PageNotFound />)} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
