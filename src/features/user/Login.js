import chessBanner from "../../images/chessBanner.jpeg";
import { LoginForm } from "../../components/LoginForm";

export function Login(){

    return (
        <div className="flex flex-col lg:flex-row h-[90vh]">
            <div className="w-full lg:w-1/2">
                <img 
                    className="w-full lg:h-screen"
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