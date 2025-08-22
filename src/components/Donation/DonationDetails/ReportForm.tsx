import { useState } from "react";
import type { Report } from "../../../domain/interfaces/Report";

type ReportFormProps = {
    open: boolean;
    setOpen: (x: boolean) => void,
    idDonationRecived: number,
    idUserRecived: number
};

export const ReportForm = ({ open, setOpen, idDonationRecived, idUserRecived }: ReportFormProps) => {

    const [newReport, setNewReport] = useState<Partial<Report>>({})

    const handleChange = (field: keyof Report, value: string) => {
        setNewReport({ ...newReport, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const reportWithId = {
            ...newReport,
            idDonation: idDonationRecived,
            idUser: idUserRecived,
            createdAt: newReport.createdAt ?? new Date(),
        };

        // codigo de crear reporte
        console.log(reportWithId)
        alert("Report completed");
        setNewReport({})
        setOpen(false);
    };

    return (
        <>
            {open && (
                <dialog id="user_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Make a report
                        </h3>

                        <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text">Report type</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    onChange={(e) => handleChange("reportType", e.target.value)}
                                    required
                                >
                                    <option value="" selected disabled>Select the type of report</option>
                                    <option value="spam">Spam</option>
                                    <option value="contenido_inapropiado">Inappropriate content</option>
                                    <option value="informacion_falsa">False information</option>
                                    <option value="discurso_odio">Hate speech</option>
                                    <option value="acoso">Harassment or bullying</option>
                                    <option value="violencia">Violence or threats</option>
                                    <option value="otro">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Descripción de la categoria"
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Report
                                </button>
                                <button type="button" className="btn" onClick={() => setOpen(false)}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
}