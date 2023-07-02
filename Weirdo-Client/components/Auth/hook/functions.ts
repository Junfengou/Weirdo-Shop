import { useSetRecoilState } from "recoil";
import { SignInResult, SignupResult, signinToken, signupStatus } from "../Recoil/atoms";
import { SignInForm } from "../Signin";
import axios from "axios";
import { SignupForm } from "../Signup";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL
});


export const useSignInForm = () => {
    const setSigninTokenState = useSetRecoilState(signinToken);
    const sendSignInForm = async (formData: SignInForm) => {
        await client.post('api/User/login', formData, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            const result: SignInResult = res.data;
            setSigninTokenState({
                errorMessage: result.errorMessage,
                token: result.token
            })
            localStorage.setItem("SignInResult", JSON.stringify(result));
        })
        .catch(err => console.error(err))
    }
    return sendSignInForm;
}

export const useSignUpForm = () => {
    const setSignupStatus = useSetRecoilState(signupStatus);
    const sendSignupForm = async (formData: SignupForm) => {
        await client.post('api/User/register', formData, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            const result: SignupResult = res.data;
            setSignupStatus({
                message: result.message,
            })
        })
        .catch(err => console.error(err))
    }
    return sendSignupForm;
}