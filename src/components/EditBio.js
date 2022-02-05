import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editBio } from "../features/profile/profileSlice";


export function EditBio() {

    const { userId, token } = useSelector(state => state.user);
    const { userDetails } = useSelector(state => state.profile);
    
    const [inputBio, setInputBio] = useState(userDetails.bio);
    console.log(inputBio);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function editHandler() {
        dispatch(editBio({
            bio: inputBio, 
            token
        }));
        navigate(`/profile/${userId}`);
    };

    function discardHandler() {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <textarea 
                    onChange={(e) => setInputBio(e.target.value)}
                    value={inputBio}
                    className="resize-none text-xl w-full p-6 outline-none min-h-[120px] border-2 border-d-blue rounded-[10px]"
                />
            <button 
                className="btn mt-2"
                onClick={() => editHandler()}
            >
                Save
            </button>
            <button 
                className="btn-cancel mt-2 ml-2"
                onClick={() => discardHandler()}
            >
                Discard
            </button>
        </div>
    )
}
