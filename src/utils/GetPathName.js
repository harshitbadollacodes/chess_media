import { useLocation } from "react-router-dom";

export function GetPathName() {
    const { pathname } = useLocation();

    return pathname.split("/")[1];
}

