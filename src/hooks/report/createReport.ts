import { useState } from "react";
import type { Report } from "../../domain/interfaces/Report";

export const createReport = (reporterId: number, donationReportedId: number) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<Report>({
        userId: reporterId,
        description: "",
        idDonation: donationReportedId,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.description) newErrors.description = "Description is required";
        return newErrors
    };


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: typeof formData) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        console.log("errores", validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
        }

        //codigo para enviar reporte al servidors 
        console.log("se creado el reporte")
    };

    const resetForm = () => {
        setFormData({
            userId: reporterId,
            description: "",
            idDonation: donationReportedId,
        });
    };


    return {
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm
    }

}