import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function Followers() {

    const { profileId } = useParams();
    console.log(profileId);

    const { userDetails } = useSelector(state => state.profile);
    console.log(userDetails);

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            
        </div>
    );
}
