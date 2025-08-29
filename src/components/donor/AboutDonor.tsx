import { Star, CalendarDays } from 'lucide-react'
import type { User } from '../../domain/interfaces/User';
import { useDonationStore } from '../../store/DonationStore';

interface AboutDonorProps {
    user: User;
}

export const AboutDonor = ({ user }: AboutDonorProps) => {

    const { donationPagination, fetchDonations } = useDonationStore();
    
    const userDonations = donationPagination.data.reduce((totalDonations, donacionActual) => {
        if (String(donacionActual.donorId) === String(user.id)) {
            return totalDonations + 1;
        }
        return totalDonations;
    }, 0)
    return <>
        <div className="card bg-base-100 w-90 shadow-sm mb-4 md:max-h-40">
            <p className='flex-start font-bold mt-4 ml-4'>About the Donor</p>
            <div className="flex items-center gap-4 ml-8">
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                        <img src={user.avatarUrl} alt={user.name} />
                    </div>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < Math.round(user.rating) ? "star fill-yellow-400" : "star"}
                                />
                            ))}
                        </div>
                        <span className="font-semibold text-gray-800">{user.rating}</span>
                        <span className="text-sm">• {userDonations}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={16} />
                        <span className="text-sm">Joined {user.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}