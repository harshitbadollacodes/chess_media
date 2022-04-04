import chess from "../images/chess.png"

export const ImgLoader = () => {


    return (
        <div className="loader">
            <img 
                src={chess} 
                alt="chess"
                className="w-[40px] h-[40px]"
            />
        </div>
    )
}
