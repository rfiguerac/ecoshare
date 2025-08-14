import { MessageCircle, PhoneIcon, Heart, Share2, FlagIcon } from "lucide-react";
export const ContactDonor = () => {
    return <>
        <div className="card bg-base-100 w-90 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Contact donor</h2>
                <button className="btn bg-[#28A745] text-white hover:bg-[#218838] px-10"> <MessageCircle size={15}/>Send Messege</button>
                <button className="btn px-10 mb-4"> <PhoneIcon size={15}/>Request Phone Call</button>
                <hr className="border-gray-200"/>
                <p className="flex items-center gap-2 text-gray-600 font-bold ml-4"><Heart size={16}/> Save for Later</p>
                <p className="flex items-center gap-2 text-gray-600 font-bold ml-4"><Share2 size={16}/>Share with Friends</p>
                <p className="flex items-center gap-2 text-gray-600 font-bold ml-4"><FlagIcon size={16}/> Report Issue</p>
            </div>
        </div>
    </>
}