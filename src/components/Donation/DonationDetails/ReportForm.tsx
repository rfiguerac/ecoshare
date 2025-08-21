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
        alert("Reporte realizado");
        setNewReport({})
        setOpen(false);
    };

    return (
        <>
            {open && (
                <dialog id="user_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Realizar reporte
                        </h3>

                        <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text">Tipo de reporte</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    onChange={(e) => handleChange("reportType", e.target.value)}
                                    required
                                >
                                    <option value="" selected disabled>Selecciona el tipo de reporte</option>
                                    <option value="spam">Spam</option>
                                    <option value="contenido_inapropiado">Contenido inapropiado</option>
                                    <option value="informacion_falsa">Información falsa</option>
                                    <option value="discurso_odio">Discurso de odio</option>
                                    <option value="acoso">Acoso o bullying</option>
                                    <option value="violencia">Violencia o amenazas</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Descripción</span>
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
                                    Reportar
                                </button>
                                <button type="button" className="btn" onClick={() => setOpen(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
}