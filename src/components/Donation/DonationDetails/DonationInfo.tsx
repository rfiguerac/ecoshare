import { Heart, Share2, MapPin, Tags } from "lucide-react";
import type { Donation } from "../../../domain/interfaces/Donation";
import type { User } from "../../../domain/interfaces/User";
import { useDonationTransaction } from "../../../hooks/donation/useDonationTransaction";
import { useAuthStore } from "../../../store/AuthStore";

interface DonationInfoProps {
  donation: Donation;
  donationSaved: boolean;
  setDonationSaved: (x: boolean) => void;
  copyUrl: () => void;
  direction: string;
  userDonor: User;
}

export const DonationInfo = ({
  donation,
  donationSaved,
  setDonationSaved,
  copyUrl,
  direction,
  userDonor,
}: DonationInfoProps) => {
  const url = "http://localhost:3002/public/uploads/donation";

  const { handleCreateTransaction } = useDonationTransaction();
  const { user } = useAuthStore();

  const handleReserve = () => {
    if (!user) return;
    handleCreateTransaction({
      donationId: donation.id!,
      receiverId: Number(user.id!),
      status: "Reserved",
    });
  };

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-xl mx-auto rounded-lg">
      {/* Carrusel */}
      <div className="carousel w-full rounded-t-lg">
        {donation.images?.map((image, index) => (
          <div
            key={index}
            id={`item${index + 1}`}
            className="carousel-item relative w-full">
            <img
              src={`${url}/${image.imageUrl}`}
              alt={`donation-image-${index}`}
              className="w-full h-64 md:h-80 object-cover rounded-t-lg"
            />

            {/* Botones de navegación */}
            {donation.images!.length > 1 && (
              <div className="absolute flex justify-between transform -translate-y-1/2 left-3 right-3 top-1/2">
                <a
                  href={`#item${index === 0 ? donation.images!.length : index}`}
                  className="btn btn-circle btn-sm">
                  ❮
                </a>
                <a
                  href={`#item${
                    index + 2 > donation.images!.length ? 1 : index + 2
                  }`}
                  className="btn btn-circle btn-sm">
                  ❯
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botones de índice dinámicos */}
      {donation.images && donation.images.length > 1 && (
        <div className="flex w-full justify-center gap-2 py-2">
          {donation.images.map((_, i) => (
            <a
              key={i}
              href={`#item${i + 1}`}
              className="btn btn-xs btn-outline">
              {i + 1}
            </a>
          ))}
        </div>
      )}

      {/* Información */}
      <div className="card-body p-5">
        {/* Acciones */}
        <div className="card-actions justify-end gap-5">
          <Heart
            size={18}
            className={`cursor-pointer rounded-lg transition duration-200 ${
              donationSaved
                ? "text-red-500 hover:text-red-600"
                : "text-gray hover:text-black"
            }`}
            fill={donationSaved ? "currentColor" : "none"}
            onClick={() => setDonationSaved(!donationSaved)}
          />
          <Share2
            size={18}
            className="text-gray cursor-pointer hover:text-black"
            onClick={copyUrl}
          />
        </div>

        <h2 className="card-title mt-4">{donation.title}</h2>
        <p>{donation.description}</p>

        <p className="flex gap-1 items-center text-xs text-[#d9fa1] mt-4">
          <MapPin size={16} />
          {direction}
        </p>

        {/* Info del usuario */}
        <p className="font-bold mt-4">Donated by</p>
        <div className="flex gap-2 items-center">
          {/* <img
            src={userIcon}
            alt="user icon"
            className="w-8 h-8 rounded-full"
          /> */}
          <div className="flex flex-col">
            <p className="font-bold">{userDonor.name}</p>
            <div className="flex"></div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex mt-4 gap-3">
          {donation.status != "Available" && (
            <button
              className={`btn btn-primary hover:btn-secondary active:btn-accent px-10`}
              onClick={handleReserve}
              disabled>
              {donation.status}
              <Tags size={15} />
            </button>
          )}
          {donation.status === "Available" && (
            <button
              className={`btn btn-primary hover:btn-secondary active:btn-accent px-10`}
              onClick={handleReserve}>
              Reserve
              <Tags size={15} />
            </button>
          )}
          <button className="btn">View on Map</button>
        </div>
      </div>
    </div>
  );
};
