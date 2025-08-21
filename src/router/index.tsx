import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { NotFound } from "../pages/NotFound";
import { DonationDetailsPage } from "../pages/DonationDetailsPage";

import ProfileCreationPage from "../pages/CreateProfilePage";
import LoginPage from "../pages/LoginPage";
import CategoryPage from "../pages/CategoryPage";
import { DonationSearchPage } from "../pages/DonationSearchPage";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "../pages/DashboardHomePage";
import { DashboardCategory } from "../pages/DashboardCategoryPage";
import { DashboardDonationsPage } from "../pages/DashboardDonatiosPage";
import { DashboardUser } from "../pages/DashboardUsersPage";
import { DashboardReports } from "../pages/DashboardReportsPage";

import { donations } from "../data/donations";

import type { JSX } from "react";

//import { useAuthStore } from "../store/authStore";

// Componente para proteger rutas privadas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  //return isAuthenticated ? children : <Navigate to="/login" replace />;
  {
    return <>{children}</>;
  }
}

export default function AppRouter() {
  return (
    <BrowserRouter>
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
          <Route path="category" element={<DashboardCategory />} />
          <Route path="users" element={<DashboardUser />} />
          <Route path="reports" element={<DashboardReports />} />
          <Route
            path="donations/guardadas"
            element={
              <DashboardDonationsPage
                title="Donaciones Guardadas"
                fetchDonations={donations}
              />
            }
          />
          <Route
            path="donations/recibidas"
            element={
              <DashboardDonationsPage
                title="Donaciones Recibidas"
                fetchDonations={donations}
              />
            }
          />
          <Route
            path="donations/mis-donaciones"
            element={
              <DashboardDonationsPage
                title="Mis Donaciones"
                fetchDonations={donations}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
