import { Link } from "react-router-dom";
import type { Report } from "../../domain/interfaces/Report";
import { Trash2, CheckCheck } from "lucide-react";


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
            <th>Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsRecived.map((report) => (
            <tr key={report.id}>
              <td>{report.userId}</td>
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
                <Trash2/>
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    if (report.id) {
                      reportRevised(report.id);
                    }
                  }}
                >
                  <CheckCheck />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}