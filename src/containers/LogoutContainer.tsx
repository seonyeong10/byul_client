import { reset } from "@redux-modules/user";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutContainer() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8090/api/v1/logout", {
            "accessToken": localStorage.getItem("accessToken"),
            "refreshToken": localStorage.getItem("refreshToken")
        }).then(res => {
            dispatch(reset());
            localStorage.clear();
            
            alert(res.data);
            navigator("/");
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return <></>;
}

export default LogoutContainer;