import { Link } from "react-router-dom";
import chess from "../images/chess.png";
import { GetPathName } from "../utils/GetPathName";

export function Header() {

    let pathName = GetPathName();

    if(pathName === "") {
        pathName = "Home";
    }

    return (

        <header className="bg-white p-4 sticky top-0 z-50 shadow-lg">
            <div className="custom-container flex justify-between">
                <Link to="/" >
                    <div  className="flex">
                        <img src={chess} alt="Knight" className="w-8"/>
                        <h1 className="ml-2 text-2xl text-l-blue font-bold">Knight Club</h1>
                    </div>
                </Link> 

                <h1 className="font-bold text-2xl capitalize">
                    {pathName}
                </h1>

            </div>
        </header>
    )
}