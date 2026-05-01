import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
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

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

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
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recettes" element={<Recipes />} />
        <Route path="/suivi" element={<Tracking />} />
        <Route path="/plans" element={<MealPlans />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/rendez-vous" element={<Appointment />} />
        <Route path="/plans/seche-progressive" element={<PlanSecheProgressive />} />
        <Route path="/plans/seche-progressive/semaines" element={<SecheWeeks />} />
        <Route path="/plans/seche-progressive/journees" element={<SecheDays />} />
        <Route path="/plans/seche-progressive/recettes" element={<SecheRecipes />} />
        <Route path="/plans/seche-progressive/courses" element={<SecheShopping />} />
        <Route path="/plans/seche-progressive/sport" element={<SecheSport />} />
        <Route path="/plans/seche-progressive/boissons" element={<SecheDrinks />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App