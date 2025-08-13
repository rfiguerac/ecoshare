import type { Category } from "../../interfaces/Category"
import { DynamicIcon } from "../DynamicIcon";



interface CardCategoryProps {
  category: Category
  quantity?: number
  bgColor?: string
}

export const CardCategory = (props: CardCategoryProps) => {
  const { title, icon, } = props.category
  return (
    <div className="card border border-gray-200 rounded-lg flex flex-col w-64 md:w-72  p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
      <div className={`w-25 h-25 mx-auto rounded-xl flex items-center justify-center mb-1 p-1 ${props.bgColor}`}>
        <DynamicIcon name={icon} size={50} />
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-gray-600">{props.quantity} Items</p>
      </div>
    </div>
  )
}
