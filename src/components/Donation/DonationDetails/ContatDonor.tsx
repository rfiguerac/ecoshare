import { MessageCircle, PhoneIcon, Heart, Share2, FlagIcon } from "lucide-react";
export const ContactDonor = () => {
    return <>
        <div className="card bg-base-100 w-90 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Contact Donor</h2>
                <button className="btn btn-primary hover:btn-secondary active:btn-accent px-10"> <MessageCircle size={15} />Send Messege</button>
                <button className="btn px-10 mb-4"> <PhoneIcon size={15} />Request Phone Call</button>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105">
                    <Heart size={16} />
                    <p>Save for Later</p>
                </div>
                 <div className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105">
                    <Share2 size={16} />
                    <p>Share with Friends</p>
                 </div>
                 <div className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105">
                    <FlagIcon size={16} />
                    <p>Report Issue</p>
                 </div>
            </div>
        </div>
    </>
}