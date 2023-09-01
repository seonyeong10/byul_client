import { JwtToken, UserType } from "@config/types/UserType";
import utf8 from "utf8";

export function saveLocalStorage(member: UserType) {
    localStorage.clear();
    localStorage.setItem("grantType", member.grantType);
    localStorage.setItem("accessToken", member.accessToken);
    localStorage.setItem("refreshToken", member.refreshToken);
    localStorage.setItem("refreshTokenExpirationTime", member.refreshTokenExp + '');
}

export function toUserType(data: JwtToken) {
    const token = data.accessToken;
    const payload = token.substring(token.indexOf(".") + 1, token.lastIndexOf("."));
    const dec = JSON.parse(utf8.decode(atob(payload)));

    const member: UserType = {
        id: dec.sub,
        name: dec.name,
        auth: dec.auth,
        grantType: data.grantType,
        accessToken: token,
        accessTokenExp: dec.exp,
        refreshToken: data.refreshToken,
        refreshTokenExp: data.refreshTokenExpirationTime
    }

    return member;
}