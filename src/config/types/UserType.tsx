export interface UserType {
    id: number,
    name: string,
    auth: string,
    grantType: string,
    accessToken: string,
    accessTokenExp: number,
    refreshToken: string,
    refreshTokenExp: number
}

export interface JwtToken {
    accessToken: string,
    grantType: string,
    refreshToken: string,
    refreshTokenExpirationTime: number
}