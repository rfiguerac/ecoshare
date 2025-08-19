import { Star, MapPin, CalendarDays } from 'lucide-react'
export const AboutDonor = () => {
    return <>
        <div className="card bg-base-100 w-90 shadow-sm mb-4 md:max-h-40">
            <p className='flex-start font-bold mt-4 ml-4'>About the Donor</p>
            <div className="flex items-center gap-4 ml-8">
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Maria González" />
                    </div>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <h2 className="text-xl font-bold">Maria González</h2>
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="flex">
                            <Star size={16} className="star" />
                            <Star size={16} className="star" />
                            <Star size={16} className="star" />
                            <Star size={16} className="star" />
                            <Star size={16} className="star" />
                        </div>
                        <span className="font-semibold text-gray-800">4.8</span>
                        <span className="text-sm">• 127 donations</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={16} />
                        <span className="text-sm">New York, NY</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={16} />
                        <span className="text-sm">Joined January 2024</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}