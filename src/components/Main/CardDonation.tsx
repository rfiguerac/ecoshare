
import type { Donation } from "../../interfaces/Donation.ts"


interface CardDonationProps {
    donation: Donation
    quantity?: number
    bgColor?: string

}

export const CardDonation = (props: CardDonationProps) => {
    const { title, description, state } = props.donation
    return (
        <div className="card border border-gray-200 rounded-lg flex flex-col w-64 md:w-72  shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
            <figure className="relative">
                <div className="absolute top-2 left-2 badge badge-outline bg-">
                    {state}
                </div>
                <img
                    src={props.donation.imageUrl}
                    alt={props.donation.imageUrl} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p className="text-gray-600">{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Clothes</div>
                </div>
                <button className="btn btn-wide bg-[#03C755] text-white border-[#00b544]">
                    Contact
                </button>

            </div>
        </div>
    )
}
