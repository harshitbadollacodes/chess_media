export const Username = ({firstName, username}) => {

    return (
        <div className="ml-2">
            <h1 className="text-xl font-bold capitalize">{firstName}</h1>
            <h3 className="text-gray-400 text-l">@{username}</h3>
        </div>
    )
}
