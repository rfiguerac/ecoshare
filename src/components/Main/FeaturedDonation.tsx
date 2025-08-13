import type { Donation } from "../../interfaces/Donation";
import { CardDonation } from "./CardDonation";

import { MainCard } from "./MainCard";


const FeaturedDonation = () => {

    const donations: Donation[] = [

        {
            id: 1,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        },
          {
            id: 2,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        },
          {
            id: 3,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        },
          {
            id: 4,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        },
          {
            id: 5,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        },
        {
            id: 6,
            title: "Children's Clothing",
            description: "A large bag of children's clothes, sizes 4-6, in good condition.",
            idDoner: 112,
            idCategory: 1,
            state: "Available",
            imageUrl: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: {
                latitude: 41.3851,
                longitude: 2.1734
            }

        }

        
    ]

    const donation = donations.map((donation) => {

        return (
            <CardDonation donation={donation} key={donation.id} />
        )
    });


    return (

        <MainCard title="Featured Donations" description="Discover amazing items shared by your community." >
            {donation}
        </MainCard>

    )
}

export default FeaturedDonation;