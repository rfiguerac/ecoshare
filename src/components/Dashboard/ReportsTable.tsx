import { Link } from "react-router-dom";
import type { Report } from "../../domain/interfaces/Report";


type ReportsTableProps = {
  reportsRecived: Report[];
  deleteDonation: (idDonation: number) => void,
  reportRevised: (idReport: number) => void
};

export const ReportsTable = ({reportsRecived, deleteDonation, reportRevised}: ReportsTableProps) => {

  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>Reporter</th>
            <th>Report Type</th>
            <th>Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsRecived.map((report) => (
            <tr key={report.id}>
              <td>{report.reporter}</td>
              <td>{report.reportType}</td>
              <td>{report.description}</td>
              <td className="flex gap-2 justify-center">
                <Link to={`/donation/${report.idDonation}`} className="btn btn-sm btn-info text-info-content">
                  See donation
                </Link>
                <button
                  className="btn btn-sm btn-error text-error-content"
                  onClick={() => {
                   
                      deleteDonation(report.idDonation)
                   
                  }}
                >
                  Delete donation
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    if (report.id) {
                      reportRevised(report.id);
                    }
                  }}
                >
                  Reviwed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}