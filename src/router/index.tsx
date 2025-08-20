import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { MainPage } from "../pages/MainPage";
import { NotFound } from "../pages/NotFound";
import { DonationDetailsPage } from "../pages/DonationDetailsPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "../pages/DashboardHomePage";
import { DashboardCategory } from "../pages/DashboardCategoryPage";
import { DashboardDonationsPage } from "../pages/DashboardDonatiosPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="donation/:id" element={<DonationDetailsPage />} />
          <Route path="*" element={<NotFound />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="category" element={<DashboardCategory />} />
            <Route path="donations/:title" element={<DashboardDonationsPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
