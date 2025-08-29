import { MessageCircle, Heart, Share2, FlagIcon } from "lucide-react";


type ContactDonorProps = {
  setOpen: (x: boolean) => void;
  donationSaved: boolean,
  setDonationSaved: (x:boolean) => void,
  copyUrl :() => void

};
export const ContactDonor = ({setOpen, donationSaved, setDonationSaved, copyUrl}: ContactDonorProps) => {
    return <>
        <div className="card bg-base-100 w-90 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Contact Donor</h2>
                <button className="btn btn-primary hover:btn-secondary active:btn-accent px-10"> <MessageCircle size={15} />Send Messege</button>
                <hr className="border-gray-200" />
                <div 
                className={`flex items-center gap-2 font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
        ${donationSaved ? "text-red-500 bg-red-100 hover:bg-red-200" : "text-gray-600 hover:bg-gray-100"} 
        hover:shadow-md hover:scale-105`}
                onClick={() => setDonationSaved(!donationSaved)}
                >
                    <Heart size={16} />
                    <p>Save for Later</p>
                </div>
                 <div 
                 className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105"
                onClick={() => copyUrl()}
                >
                    <Share2 size={16} />
                    <p>Share with Friends</p>
                 </div>
                 <div 
                 className="flex items-center gap-2 text-gray font-bold ml-4 cursor-pointer p-2 rounded-lg transition duration-200
                hover:bg-gray-100 hover:shadow-md hover:scale-105"
                onClick={() => setOpen(true)}
                >
                    <FlagIcon size={16} />
                    <p>Report Issue</p>
                 </div>
            </div>
        </div>
    </>
}