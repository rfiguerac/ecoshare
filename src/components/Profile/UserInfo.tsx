import { Mail } from "lucide-react"
import type { User } from "../../domain/interfaces/User"

interface UserInfoParams{
    user: User
}
export const UserInfo = ({ user }: UserInfoParams) =>{

    return(
           <div className="card bg-white shadow-xl mb-8 border border-gray-200">
          <div className="card-body items-center text-center p-6 sm:p-8">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-16">
                <span className="text-3xl font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <h1 className="card-title text-2xl sm:text-3xl font-bold mt-4">{user.name}</h1>
            <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary btn-sm sm:btn-md"
              >
                <Mail/>
                Contactar
              </button>
            </div>
          </div>
        </div>

    )
}