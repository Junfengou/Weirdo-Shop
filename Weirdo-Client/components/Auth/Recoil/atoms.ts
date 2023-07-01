import { RecoilState, atom } from "recoil";

export type SignInResult = {
    token: string | null,
    errorMessage: string | null
}

export const signinToken: RecoilState<SignInResult | null> = atom({
    key: "signinToken",
    default: {} as SignInResult | null
})

