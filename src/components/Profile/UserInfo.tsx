import { Mail } from "lucide-react"
import type { User } from "../../domain/interfaces/User"
import { chatService } from "../../services/chatService";
import { chatRepositoryImpl } from "../../data/ChatRepository.impl";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

interface UserInfoParams {
  profileUser: User
}
export const UserInfo = ({ profileUser }: UserInfoParams) => {

  const service = chatService(chatRepositoryImpl);
  const navigate = useNavigate();
  const { user } = useAuthStore();


  const handleContactDonor = async () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
    const createChatDto = {
      userId: Number(user.id),
      donorId: Number(profileUser.id),
    };

    try {
      const chat = await service.createChat(createChatDto);
      navigate(`/dashboard/chats?chatId=${chat.id}`);
    } catch (error) {
      console.error("Failed to create or fetch chat:", error);
    }
  };


  return (
    <div className="card bg-white shadow-xl mb-8 border border-gray-200">
      <div className="card-body items-center text-center p-6 sm:p-8">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-16">
            <span className="text-3xl font-semibold">
              {profileUser.name.charAt(0)}
            </span>
          </div>
        </div>
        <h1 className="card-title text-2xl sm:text-3xl font-bold mt-4">{profileUser.name}</h1>
        <p className="text-gray-500 text-sm sm:text-base">{profileUser.email}</p>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary btn-sm sm:btn-md"
            onClick={handleContactDonor}
          >
            <Mail />
            Contactar
          </button>
        </div>
      </div>
    </div>

  )
}