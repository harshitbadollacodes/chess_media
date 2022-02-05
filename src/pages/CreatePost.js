import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../features/post/postSlice";

export function CreatePost() {

    const { token } = useSelector(state => state.user);
    const { status } = useSelector(state => state.posts);

    const [postInput, setPostInput] = useState({
        text: "",
    });

    const [imageURL, setImageURL] = useState("");

    console.log(postInput);

    function postInputHandler(e) {
        setPostInput({...postInput, text: e.target.value})
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function postHandler(e) {
        e.preventDefault();

        dispatch(addPost({token, postInput, imageURL}));

        setPostInput({
            text: ""
        });

        if (status === "fulfilled") {
            navigate("/")
        }
    };

    useEffect(() => {
        
    }, [status, navigate]);

    async function uploadImageHandler(e) {
        let image = e.target.files[0];

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "kutumlde");

        const {status, data: {url} } = await axios.post("https://api.cloudinary.com/v1_1/dwrcvgzi0/image/upload", formData);

        if (status === 200) {
            setImageURL(url);
        };
    };


    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">

            <form>
                <input 
                    type="file" 
                    className="custom-file-input my-2 cursor-pointer rounded-lg border border-d-blue p-2"    
                    onChange={(e) => uploadImageHandler(e)} 
                />
            </form>

            <form onSubmit={postHandler}>
                <textarea 
                    className="resize-none text-xl w-full p-6 outline-none min-h-[120px] border-2 border-d-blue rounded-[10px]"
                    placeholder="What's on your mind?"
                    value={postInput.text}
                    required
                    onChange={postInputHandler}
                >
                </textarea>
                
                <input                
                    className={
                        ` ${postInput.text.length === 0 ? "bg-l-blue cursor-not-allowed " : "bg-l-blue cursor-pointer"} btn block ml-auto`
                    }
                    type="submit"
                />

            </form>
        </div>
    )
};