import { axiosHeader } from "@config/axiosConfig";
import axios from "axios";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "@redux-modules/user";
import { saveLocalStorage, toUserType } from "src/lib/loginAction";

function AuthCallbackContainer() {
    const params = useParams();
    const location = useLocation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    if(location.search !== null || location.search !== undefined) {

        const url = `http://localhost:8090/api/v1/login/oauth2/code/${params.platform}/callback${location.search}`;
        console.log(url);
        
        axios.get(url, {
            headers: axiosHeader
        }).then(res => {
            // console.log(res);
            const member = toUserType(res.data);

            console.log('member >>> ', member);
            //redux 저장
            dispatch(init(member));

            //localstorage 저장
            saveLocalStorage(member);

            
        }).catch(err => {
            console.log(err);
        }).then(() => {
            navigator("/");
        });
    }
    
    return <></>;
}

export default AuthCallbackContainer;