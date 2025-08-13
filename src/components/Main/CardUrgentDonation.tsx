// // src/components/UrgentCardDonation.tsx
// import type { Donation } from "../../interfaces/Donation.ts";

// interface CardUrgentDonationProps {
//     donation: Donation;
// }

// export const CardUrgentDonation = ({ donation }: CardUrgentDonationProps) => {
//     const { title, description, state, imageUrl } = donation;

//     return (
//         <div className="card border-2 border-red-500 rounded-lg flex flex-col w-64 md:w-72 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
//             <figure className="relative">
//                 <div className="absolute top-2 left-2 badge badge-outline bg-red-500 text-white">
//                     Urgent
//                 </div>
//                 <img
//                     src={imageUrl}
//                     alt={title}
//                 />
//             </figure>
//             <div className="card-body items-center text-center">
//                 <h2 className="card-title">{title}</h2>
//                 <p className="text-gray-600">{description}</p>
//                 <div className="card-actions justify-end">
//                     <div className="badge badge-outline">{state}</div>
//                 </div>
//                 <button className="btn btn-wide bg-[#03C755] text-white border-[#00b544]">
//                     Contact
//                 </button>
//             </div>
//         </div>
//     );
// };