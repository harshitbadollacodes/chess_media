import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost } from "./postSlice";

export const EditPost = () => {
    
    const { postId } = useParams();
    
    const { token } = useSelector(state => state.user);
    const { posts, status } = useSelector(state => state.posts);

    const post = posts.find(post => post._id === postId);

    const [postInput, setPostInput] = useState({
        text: post.postContent
    });    

    const [imageURL, setImageURL] = useState("");
    

    function postInputHandler(e) {
        setPostInput({...postInput, text: e.target.value})
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function postHandler(e) {
        e.preventDefault();

        dispatch(editPost({ token, postId, postInput, imageURL }));

        setPostInput({
            text: ""
        });

        if (status === "fulfilled") {
            navigate("/");
        }

    };

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

            <h1 className="text-xl font-bold">
                Image Preview
            </h1>

            <img 
                src={imageURL || post.image} 
                className="my-2"
                alt="I"
            />

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
                    value="Update"
                />

            </form>

        </div>

    )
};
