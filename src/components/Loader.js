import chess from "../images/chess.png"


export function Loader() {
    return (
        <div className="flex w-full h-[100vh] justify-center items-center">
            <div className="loader">
                <img 
                    src={chess} 
                    alt="chess"
                    className="w-[40px] h-[40px]"
                />
            </div>
        </div>
    );
}

