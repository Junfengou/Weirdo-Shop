import { RecoilState, atom } from "recoil";

export type SignInResult = {
    token: string | null,
    errorMessage: string | null
    isAdmin: number | null
    email: string | null
}

export type SignupResult = {
    message: string | null
}

export const signinToken: RecoilState<SignInResult | null> = atom({
    key: "signinToken",
    default: {} as SignInResult | null
})

export const signupStatus: RecoilState<SignupResult | null> = atom({
    key: "signupStatus",
    default: {} as SignupResult | null
})

export const dialogState: RecoilState<boolean> = atom({
    key: "dialogState",
    default: false
})