
import { ReportsTable } from "../components/Dashboard/ReportsTable";
import { useReports } from "../hooks/report/useReports";

export const DashboardReports = () => {
    const { reports, deleteDonation, reportRevised } = useReports();

    return (
        <div className="container mx-auto p-4 bg-base-100 rounded-box shadow-xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">
                    Report Management
                </h1>
            </div>

            <ReportsTable reportsRecived={reports} deleteDonation={deleteDonation} reportRevised={reportRevised} />
        </div>
    )
}