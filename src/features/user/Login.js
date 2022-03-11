import chessBanner from "../../images/chessBanner.jpeg";
import { LoginForm } from "./LoginForm";

export function Login(){

    return (
        <div className="flex flex-col w-full lg:flex-row h-[90vh] items-center">
            <div className="w-full lg:w-1/2">
                <img 
                    className="w-full lg:rounded-xl"
                    src={chessBanner} 
                    alt="knight" 
                />
            </div>

            <div className="w-full lg:w-1/2">
                <LoginForm/>
            </div>
        </div>
    )
}