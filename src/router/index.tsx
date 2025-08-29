import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importa Navigate
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { NotFound } from "../pages/NotFound";
import { DonationDetailsPage } from "../pages/DonationDetailsPage";

import ProfileCreationPage from "../pages/CreateProfilePage";

import CategoryPage from "../pages/CategoryPage";
import { DonationSearchPage } from "../pages/DonationSearchPage";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "../pages/DashboardHomePage";
import { DashboardChatPage } from "../pages/DashboardChatPage";
import { DashboardCategory } from "../pages/DashboardCategoryPage";
import { DashboardDonationsPage } from "../pages/DashboardDonatiosPage";
import { DashboardMyDonations } from "../pages/DashboardMyDonations";
import { DashboardRecievedDonations } from "../pages/DashboardRecievedDonations";
import { DashboardUser } from "../pages/DashboardUsersPage";
import { DashboardReports } from "../pages/DashboardReportsPage";
import { DashboardConfiguration } from "../pages/DashboardConfigurationPage";

import type { JSX } from "react";
import { useAuthStore } from "../store/AuthStore"; // Importa el store de autenticación
import LoginPage from "../pages/LoginPage";
import { DashboardRequestedDonations } from "../pages/DashboardRequestedDonations";
import { ScrollToTop } from "../components/ScrollOnTop";

// Componente para proteger rutas privadas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuthStore(); // Usa el store para obtener el estado de autenticación

  if (loading) {
    // Puedes mostrar un spinner de carga mientras se verifica el token
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al usuario a la página de login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="donation/:id" element={<DonationDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="createProfile" element={<ProfileCreationPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="donationSearch" element={<DonationSearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas protegidas - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path="categories" element={<DashboardCategory />} />
          <Route path="users" element={<DashboardUser />} />
          <Route path="reports" element={<DashboardReports />} />
          <Route path="settings" element={<DashboardConfiguration />} />
          <Route path="chats" element={<DashboardChatPage />} />
          <Route path="donations" element={<DashboardDonationsPage />} />
          <Route path="my-donations" element={<DashboardMyDonations />} />
          <Route
            path="recieved-donations"
            element={<DashboardRecievedDonations />}
          />
          <Route
            path="requested-donations"
            element={<DashboardRequestedDonations />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
