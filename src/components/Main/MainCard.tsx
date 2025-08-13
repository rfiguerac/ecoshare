

interface MainCardProps {
    title: string;
    description?: string;
    bgColor?: string
    children?: React.ReactNode
}

export const MainCard = (props: MainCardProps) => {
    return (
        <div className="card w-full shadow-sm">
            <div className="card-body text-center">
                <h2 className="font-bold tracking-tight text-xl sm:text-2xl md:text-3xl ">{props.title}</h2>
                <p className="mt-2 leading-8 text-gray-600 md:mt-4  text-sm md:text-lg lg:text-xl">{props.description}</p>
            </div>
            <div className="flex space-x-4 overflow-x-auto p-6 md:p-8 scrollbar-hide">
                {props.children}
            </div>
        </div>
    )
}
