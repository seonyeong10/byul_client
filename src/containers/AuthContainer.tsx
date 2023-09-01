import { LoginButton } from "@components/button";
import { AuthForm } from "@components/form";

import Google from "@assets/icons/login/btn_google_light_normal_ios.svg"
import Naver from "@assets/icons/login/btn_naver_light.png";
import axios from "axios";
import { axiosHeader } from "@config/axiosConfig";


function AuthContainer() {
    /**
     * SNS 로그인 페이지로 이동한다.
     */
    const socialLogin = (platform: string) => {
        // GET /api/v1/login/oauth2/code/{platform}
        console.log(platform);

        axios.get(`http://localhost:8090/api/v1/login/oauth2/code/${platform}`, {
            headers: axiosHeader
        }).then(res => {
            console.log(res.data); 
            window.location.href = res.data;           
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <AuthForm name="auth-form">
            <div>
                <LoginButton type='button' onClick={() => socialLogin('google')}><img src={Google}/>구글로 시작하기</LoginButton>
                <LoginButton type='button' onClick={() => socialLogin('naver')}><img src={Naver}/>네이버로 시작하기</LoginButton>
            </div>
        </AuthForm>
    );
}

export default AuthContainer;