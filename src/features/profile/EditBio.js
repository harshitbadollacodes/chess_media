import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImgLoader } from "../../components/ImgLoader";
import { Loader } from "../../components/Loader";
import { editBio } from "./profileSlice";

export function EditBio() {

    const { userId, token } = useSelector(state => state.user);
    const { userDetails, status } = useSelector(state => state.profile);
    
    const [inputBio, setInputBio] = useState(userDetails.bio);
    const [loader, setLoader] = useState(null);
    const [displayPicture, setDisplayPicture] = useState(userDetails.displayPicture);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function editHandler() {
        dispatch(editBio({
            bio: inputBio, 
            imageURL: displayPicture,
            token
        }));
    };

    function discardHandler() {
        navigate(`/profile/${userId}`);
    };

    async function uploadImageHandler(e) {
        try {
            let image = e.target.files[0];
            setLoader(true);
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "kutumlde");

            const {status, data: {url} } = await axios.post("https://api.cloudinary.com/v1_1/dwrcvgzi0/image/upload", formData);

            if (status === 200) {
                setDisplayPicture(url);
                
            };
        } catch(error) {

        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (status === "bio updated") {
            navigate(`/profile/${userId}`);
        }
    }, [status, navigate, userId]);

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <div className="flex items-center my-4">
                {
                    loader ?
                    <ImgLoader/>
                    :
                    <img 
                        src={displayPicture} 
                        className="h-10 w-10 md:h-20 md:w-20 border-2 rounded-full"
                        alt={userDetails.firstName.split(""[0])}
                    />
                }

                <form className="ml-2">
                    <input 
                        type="file" 
                        className="custom-file-input my-2 cursor-pointer rounded-lg border border-d-blue p-2"
                        onChange={(e) => uploadImageHandler(e)} 
                    />
                </form>
            </div>

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