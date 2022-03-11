import { useSelector } from "react-redux"

export const UserDisplayPicture = ({displayPicture}) => {

    const { userDetails } = useSelector(state => state.profile);

    return (
        <img 
            src={displayPicture} 
            className="h-10 w-10 md:h-[3.75rem] md:w-[3.75rem] border-2 rounded-full"
            alt={userDetails.firstName}
        />
    )
}
