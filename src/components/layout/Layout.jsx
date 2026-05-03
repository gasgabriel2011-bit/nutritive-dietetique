import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/lib/AuthContext';
import { useInstalledAppMode } from '@/lib/appMode';

export default function Layout() {
  const isInstalledApp = useInstalledAppMode();
  const { isAuthenticated } = useAuth();

  if (isInstalledApp && !isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isInstalledApp ? 'bg-[#f7f9f2]' : ''}`}>
      <Navbar />
      <main className={`flex-1 ${isInstalledApp ? 'pb-[env(safe-area-inset-bottom)]' : ''}`}>
        <Outlet />
      </main>
      {!isInstalledApp ? <Footer /> : null}
    </div>
  );
}
