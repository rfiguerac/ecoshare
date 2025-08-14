import { Heart, Share2, MapPin, MessageCircle} from "lucide-react";

export const DonationInfo = () => {

    return <>
        <div className="card bg-base-100 w-90 shadow-sm mt-4">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <div className=" card-actions justify-end gap-5"> 
                    <Heart size={16} color="grey"/>
                    <Share2 size={16} color="grey"/>
                </div>
                <h2 className="card-title mt-4">Card Title</h2>
                <p className="text-[#d9fa1]">A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className="flex gap-1 items-center text-xs text-[#d9fa1] mt-4"><MapPin size={16}/> 123 Green St, NYC</p>
                <p className="font-bold mt-4">Donated by</p>
                <div className="flex gap-2">
                    <img src="src\assets\user-icono.png" alt="user icon" className="w-8 h-8 rounded-full"/>
                    <p className="font-bold">Maria Gonzáles</p>
                </div>
                <div className="flex mt-4 gap-3">
                    <button className="btn bg-[#28A745] text-white hover:bg-[#218838] px-10"> <MessageCircle size={15}/>Contact Dono</button>
                    <button className="btn"> View on Map</button>
                </div>
            </div>
        </div>
    </>
}