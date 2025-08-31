// src/components/donor/ContatDonor.tsx
import { MessageCircle, Heart, Share2, FlagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { chatService } from "../../services/chatService";
import { chatRepositoryImpl } from "../../data/ChatRepository.impl";

type ContactDonorProps = {
  setOpen: (x: boolean) => void;
  donationSaved: boolean;
  setDonationSaved: (x: boolean) => void;
  copyUrl: () => void;
  donorId: number;
};

const service = chatService(chatRepositoryImpl);

export const ContactDonor = ({
  setOpen,
  donationSaved,
  setDonationSaved,
  copyUrl,
  donorId,
}: ContactDonorProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleContactDonor = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
    const createChatDto = {
      userId: Number(user.id),
      donorId: donorId,
    };

    try {
      const chat = await service.createChat(createChatDto);
      navigate(`/dashboard/chats?chatId=${chat.id}`);
    } catch (error) {
      console.error("Failed to create or fetch chat:", error);
    }
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
