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

// Séche
import PlanSecheProgressive from './pages/PlanSecheProgressive';
import SecheWeeks from './pages/seche/SecheWeeks';
import SecheDays from './pages/seche/SecheDays';
import SecheRecipes from './pages/seche/SecheRecipes';
import SecheShopping from './pages/seche/SecheShopping';
import SecheSport from './pages/seche/SecheSport';
import SecheDrinks from './pages/seche/SecheDrinks';

// Rééquilibrage
import PlanReequilibrage from './pages/PlanReequilibrage';
import ReequWeeks from './pages/reequilibrage/ReequWeeks';
import ReequDays from './pages/reequilibrage/ReequDays';
import ReequRecipes from './pages/reequilibrage/ReequRecipes';
import ReequShopping from './pages/reequilibrage/ReequShopping';
import ReequSuivi from './pages/reequilibrage/ReequSuivi';
import ReequPratique from './pages/reequilibrage/ReequPratique';

// Prise de masse
import PlanPriseMasse from './pages/PlanPriseMasse';
import PriseMasseWeeks from './pages/prise-masse/PriseMasseWeeks';
import PriseMasseJournee from './pages/prise-masse/PriseMasseJournee';
import PriseMasseRecipes from './pages/prise-masse/PriseMasseRecipes';
import PriseMasseShopping from './pages/prise-masse/PriseMasseShopping';
import PriseMasseSport from './pages/prise-masse/PriseMasseSport';
import PriseMasseBoissons from './pages/prise-masse/PriseMasseBoissons';

// Confort digestif
import PlanConfortDigestif from './pages/PlanConfortDigestif';
import DigestifWeeks from './pages/digestif/DigestifWeeks';
import DigestifJournee from './pages/digestif/DigestifJournee';
import DigestifRecipes from './pages/digestif/DigestifRecipes';
import DigestifShopping from './pages/digestif/DigestifShopping';
import DigestifSport from './pages/digestif/DigestifSport';
import DigestifBoissons from './pages/digestif/DigestifBoissons';

// Anti-fatigue
import PlanAntiFatigue from './pages/PlanAntiFatigue';
import FatigueWeeks from './pages/fatigue/FatigueWeeks';
import FatigueJournee from './pages/fatigue/FatigueJournee';
import FatigueRecipes from './pages/fatigue/FatigueRecipes';
import FatigueShopping from './pages/fatigue/FatigueShopping';
import FatigueSport from './pages/fatigue/FatigueSport';
import FatigueBoissons from './pages/fatigue/FatigueBoissons';

// Menu étudiant
import PlanMenuEtudiant from './pages/PlanMenuEtudiant';
import EtudiantWeeks from './pages/etudiant/EtudiantWeeks';
import EtudiantJournee from './pages/etudiant/EtudiantJournee';
import EtudiantRecipes from './pages/etudiant/EtudiantRecipes';
import EtudiantShopping from './pages/etudiant/EtudiantShopping';
import EtudiantSport from './pages/etudiant/EtudiantSport';
import EtudiantBoissons from './pages/etudiant/EtudiantBoissons';

// Repas famille
import PlanRepasFamille from './pages/PlanRepasFamille';
import FamilleWeeks from './pages/famille/FamilleWeeks';
import FamilleJournee from './pages/famille/FamilleJournee';
import FamilleRecipes from './pages/famille/FamilleRecipes';
import FamilleShopping from './pages/famille/FamilleShopping';
import FamilleSport from './pages/famille/FamilleSport';
import FamilleBoissons from './pages/famille/FamilleBoissons';

// Emploi chargé
import PlanEmploiCharge from './pages/PlanEmploiCharge';
import EmploiWeeks from './pages/emploi/EmploiWeeks';
import EmploiJournee from './pages/emploi/EmploiJournee';
import EmploiRecipes from './pages/emploi/EmploiRecipes';
import EmploiShopping from './pages/emploi/EmploiShopping';
import EmploiSport from './pages/emploi/EmploiSport';
import EmploiBoissons from './pages/emploi/EmploiBoissons';

// Petit budget
import PlanPetitBudget from './pages/PlanPetitBudget';
import BudgetWeeks from './pages/budget/BudgetWeeks';
import BudgetJournee from './pages/budget/BudgetJournee';
import BudgetRecipes from './pages/budget/BudgetRecipes';
import BudgetShopping from './pages/budget/BudgetShopping';
import BudgetSport from './pages/budget/BudgetSport';
import BudgetBoissons from './pages/budget/BudgetBoissons';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    else if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recettes" element={<Recipes />} />
        <Route path="/suivi" element={<Tracking />} />
        <Route path="/plans" element={<MealPlans />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/rendez-vous" element={<Appointment />} />

        {/* Séche */}
        <Route path="/plans/seche-progressive" element={<PlanSecheProgressive />} />
        <Route path="/plans/seche-progressive/semaines" element={<SecheWeeks />} />
        <Route path="/plans/seche-progressive/journees" element={<SecheDays />} />
        <Route path="/plans/seche-progressive/recettes" element={<SecheRecipes />} />
        <Route path="/plans/seche-progressive/courses" element={<SecheShopping />} />
        <Route path="/plans/seche-progressive/sport" element={<SecheSport />} />
        <Route path="/plans/seche-progressive/boissons" element={<SecheDrinks />} />

        {/* Rééquilibrage */}
        <Route path="/plans/reequilibrage-alimentaire" element={<PlanReequilibrage />} />
        <Route path="/plans/reequilibrage-alimentaire/semaines" element={<ReequWeeks />} />
        <Route path="/plans/reequilibrage-alimentaire/journees" element={<ReequDays />} />
        <Route path="/plans/reequilibrage-alimentaire/recettes" element={<ReequRecipes />} />
        <Route path="/plans/reequilibrage-alimentaire/courses" element={<ReequShopping />} />
        <Route path="/plans/reequilibrage-alimentaire/suivi" element={<ReequSuivi />} />
        <Route path="/plans/reequilibrage-alimentaire/conseils" element={<ReequPratique />} />

        {/* Prise de masse */}
        <Route path="/plans/prise-masse-propre" element={<PlanPriseMasse />} />
        <Route path="/plans/prise-masse-propre/semaines" element={<PriseMasseWeeks />} />
        <Route path="/plans/prise-masse-propre/journee-type" element={<PriseMasseJournee />} />
        <Route path="/plans/prise-masse-propre/recettes" element={<PriseMasseRecipes />} />
        <Route path="/plans/prise-masse-propre/courses" element={<PriseMasseShopping />} />
        <Route path="/plans/prise-masse-propre/sport" element={<PriseMasseSport />} />
        <Route path="/plans/prise-masse-propre/boissons" element={<PriseMasseBoissons />} />

        {/* Confort digestif */}
        <Route path="/plans/confort-digestif" element={<PlanConfortDigestif />} />
        <Route path="/plans/confort-digestif/semaines" element={<DigestifWeeks />} />
        <Route path="/plans/confort-digestif/journee-type" element={<DigestifJournee />} />
        <Route path="/plans/confort-digestif/recettes" element={<DigestifRecipes />} />
        <Route path="/plans/confort-digestif/courses" element={<DigestifShopping />} />
        <Route path="/plans/confort-digestif/sport" element={<DigestifSport />} />
        <Route path="/plans/confort-digestif/boissons" element={<DigestifBoissons />} />

        {/* Anti-fatigue */}
        <Route path="/plans/anti-fatigue" element={<PlanAntiFatigue />} />
        <Route path="/plans/anti-fatigue/semaines" element={<FatigueWeeks />} />
        <Route path="/plans/anti-fatigue/journee-type" element={<FatigueJournee />} />
        <Route path="/plans/anti-fatigue/recettes" element={<FatigueRecipes />} />
        <Route path="/plans/anti-fatigue/courses" element={<FatigueShopping />} />
        <Route path="/plans/anti-fatigue/sport" element={<FatigueSport />} />
        <Route path="/plans/anti-fatigue/boissons" element={<FatigueBoissons />} />

        {/* Menu étudiant */}
        <Route path="/plans/menu-etudiant" element={<PlanMenuEtudiant />} />
        <Route path="/plans/menu-etudiant/semaines" element={<EtudiantWeeks />} />
        <Route path="/plans/menu-etudiant/journee-type" element={<EtudiantJournee />} />
        <Route path="/plans/menu-etudiant/recettes" element={<EtudiantRecipes />} />
        <Route path="/plans/menu-etudiant/courses" element={<EtudiantShopping />} />
        <Route path="/plans/menu-etudiant/sport" element={<EtudiantSport />} />
        <Route path="/plans/menu-etudiant/boissons" element={<EtudiantBoissons />} />

        {/* Repas famille */}
        <Route path="/plans/repas-famille" element={<PlanRepasFamille />} />
        <Route path="/plans/repas-famille/semaines" element={<FamilleWeeks />} />
        <Route path="/plans/repas-famille/journee-type" element={<FamilleJournee />} />
        <Route path="/plans/repas-famille/recettes" element={<FamilleRecipes />} />
        <Route path="/plans/repas-famille/courses" element={<FamilleShopping />} />
        <Route path="/plans/repas-famille/sport" element={<FamilleSport />} />
        <Route path="/plans/repas-famille/boissons" element={<FamilleBoissons />} />

        {/* Emploi chargé */}
        <Route path="/plans/emploi-charge" element={<PlanEmploiCharge />} />
        <Route path="/plans/emploi-charge/semaines" element={<EmploiWeeks />} />
        <Route path="/plans/emploi-charge/journee-type" element={<EmploiJournee />} />
        <Route path="/plans/emploi-charge/recettes" element={<EmploiRecipes />} />
        <Route path="/plans/emploi-charge/courses" element={<EmploiShopping />} />
        <Route path="/plans/emploi-charge/sport" element={<EmploiSport />} />
        <Route path="/plans/emploi-charge/boissons" element={<EmploiBoissons />} />

        {/* Petit budget */}
        <Route path="/plans/petit-budget" element={<PlanPetitBudget />} />
        <Route path="/plans/petit-budget/semaines" element={<BudgetWeeks />} />
        <Route path="/plans/petit-budget/journee-type" element={<BudgetJournee />} />
        <Route path="/plans/petit-budget/recettes" element={<BudgetRecipes />} />
        <Route path="/plans/petit-budget/courses" element={<BudgetShopping />} />
        <Route path="/plans/petit-budget/sport" element={<BudgetSport />} />
        <Route path="/plans/petit-budget/boissons" element={<BudgetBoissons />} />

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