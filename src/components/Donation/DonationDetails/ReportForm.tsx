import { createReport } from "../../../hooks/report/crateReport";

type ReportFormProps = {
    open: boolean;
    setOpen: (x: boolean) => void,
    idDonationRecived: number,
    idUserRecived: number
};

export const ReportForm = ({ open, setOpen, idDonationRecived, idUserRecived }: ReportFormProps) => {
    const {formData, errors, isSubmitting, handleChange, handleSubmit, resetForm} = createReport(idUserRecived, idDonationRecived)

    const handleClose = () => {
        resetForm();
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
                             <fieldset disabled={isSubmitting}></fieldset>
                            <div>
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    name="description"
                                    placeholder="Descripción de la categoria"
                                    value={formData.description}
                                    onChange={handleChange} 
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Report
                                </button>
                                <button type="button" className="btn" onClick={() => handleClose()}>
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