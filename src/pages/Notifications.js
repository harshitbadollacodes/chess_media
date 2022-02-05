import { MdDoneOutline } from "react-icons/md";

export function Notifications() {
    return (
        
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <div className="w-full flex flex-col items-center justify-center mt-2 bg-white text-center min-h-[20vh] rounded-lg">
                <MdDoneOutline size={30}/>
                <p className="text-2xl">You are all caught up!</p>
            </div>
        </div>
    );
}
