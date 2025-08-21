import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { NotFound } from "../pages/NotFound";
import { DonationDetailsPage } from "../pages/DonationDetailsPage";
import CreateDonationPage from "../pages/CreateDonationPage";
import ProfileCreationPage from "../pages/CreateProfilePage";
import LoginPage from "../pages/LoginPage";
import CategoryPage from "../pages/CategoryPage";
import { DonationSearchPage } from "../pages/DonationSearchPage";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "../pages/DashboardHomePage";
import { DashboardCategory } from "../pages/DashboardCategoryPage";
import { DashboardDonationsPage } from "../pages/DashboardDonatiosPage";
import { DashboardUser } from "../pages/DashboardUsersPage";

import { donations } from "../components/donations";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="donation/:id" element={<DonationDetailsPage />} />
          <Route path="createDonation" element={<CreateDonationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="CreateProfile" element={<ProfileCreationPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="donationSearch" element={<DonationSearchPage />} />

          <Route path="*" element={<NotFound />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="category" element={<DashboardCategory />} />
            <Route path="users" element={<DashboardUser />} />
            <Route
              path="donations/guardadas"
              element={<DashboardDonationsPage title="Donaciones Guardadas" fetchDonations={donations} />}
            />
            <Route
              path="donations/recibidas"
              element={<DashboardDonationsPage title="Donaciones Recibidas" fetchDonations={donations} />}
            />
            <Route
              path="donations/mis-donaciones"
              element={<DashboardDonationsPage title="Mis Donaciones" fetchDonations={donations} />}
            />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
