import chessBanner from "../../images/chessBanner.jpeg";
import { SignupForm } from "./SignupForm";

export function Signup() {

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
                <img 
                    className="w-full lg:h-screen"
                    src={chessBanner} 
                    alt="knight" 
                />
            </div>

            <div className="lg:w-1/2">
                <SignupForm/>
            </div>
        </div>
    );
}