

interface MainCardProps {
    title: React.ReactNode;
    description?: string;
    bgColor?: string
    children?: React.ReactNode
    button?: React.ReactNode
}

export const MainCard = (props: MainCardProps) => {
    return (
        <div className={`card w-full relative shadow-sm mt-5 ${props.bgColor}`}>
              {props.button && (
                <div className="absolute top-5 right-5 z-10 ">
                    {props.button}
                </div>
            )}
            <div className="card-body text-center">
                <h2 className="font-bold tracking-tight text-xl sm:text-2xl md:text-3xl ">{props.title}</h2>
                <p className="mt-2 leading-8 text-gray-600 md:mt-4  text-sm md:text-lg lg:text-xl">{props.description}</p>
            </div>
            <div className="flex space-x-4 overflow-x-auto p-6 md:p-8 no-scrollbar">
                {props.children}
            </div>
        </div>
    )
}
