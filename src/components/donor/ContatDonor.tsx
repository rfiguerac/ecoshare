// src/components/donor/ContatDonor.tsx
import { MessageCircle, Heart, Share2, FlagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ContactDonorProps = {
  setOpen: (x: boolean) => void;
  donationSaved: boolean;
  setDonationSaved: (x: boolean) => void;
  copyUrl: () => void;
  donorId: number; // Nuevo prop para identificar al donante
};

export const ContactDonor = ({
  setOpen,
  donationSaved,
  setDonationSaved,
  copyUrl,
  donorId,
}: ContactDonorProps) => {
  const navigate = useNavigate();

  const handleContactDonor = () => {
    // Lógica para redirigir a la página de chat.
    // Deberías pasar el ID del donante y el ID del usuario actual para crear o encontrar el chat.
    // Por ahora, redirigimos a una URL genérica.
    navigate(`/dashboard/chats?withUser=${donorId}`);
  };

  return (
    <>
      <div className="card bg-base-100 w-90 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Contact Donor</h2>
          <button
            className="btn btn-primary hover:btn-secondary active:btn-accent px-10"
            onClick={handleContactDonor}>
            <MessageCircle size={15} />
            Send Message
          </button>
          <hr className="border-gray-200" />
          <div
            className={`flex items-center gap-2 font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                ${
                  donationSaved
                    ? "text-red-500 bg-red-100 hover:bg-red-200"
                    : "text-gray-600 hover:bg-gray-100"
                } 
                hover:shadow-md hover:scale-105`}
            onClick={() => setDonationSaved(!donationSaved)}>
            <Heart size={16} />
            <p>Save for Later</p>
          </div>
          <div
            className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105"
            onClick={() => copyUrl()}>
            <Share2 size={16} />
            <p>Share with Friends</p>
          </div>
          <div
            className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105"
            onClick={() => setOpen(true)}>
            <FlagIcon size={16} />
            <p>Report Issue</p>
          </div>
        </div>
      </div>
    </>
  );
};
