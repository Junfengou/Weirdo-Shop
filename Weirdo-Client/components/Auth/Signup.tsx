import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSignUpForm } from "./hook/functions";
import { useRecoilValue } from "recoil";
import { signupStatus } from "./Recoil/atoms";
   
export type SignupForm = {
    email: string,
    password: string
  }
  
export default function Signup() {

    const [formSubmitStatus, setFormSubmitStatus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignupForm>({
        email: '',
        password: '',
    });
    const signupFormSubmit = useSignUpForm();
    const signUpStatus = useRecoilValue(signupStatus);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true)
        signupFormSubmit(formData)
        setTimeout(() => {
            setIsLoading(false)
            setFormSubmitStatus(true)
        }, 3000);
        setFormSubmitStatus(prev => !prev)
    };

    return (
    <>
        {
            isLoading ? (<Spinner />) : 
            formSubmitStatus ? (<div>
                <h4 color="blue-gray">
                    {signUpStatus!== null && signUpStatus?.message}
                </h4>
            </div>) 
            : (
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign Up 
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter your details to register.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} size="lg" required />
                        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} size="lg" required />
                        </div>
                        <Checkbox
                        required
                        label={
                            (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree not
                                <a
                                href="#"
                                className="font-medium transition-colors hover:text-blue-500"
                                >
                                &nbsp;to be a jerk
                                </a>
                            </Typography>
                            )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button type="submit" className="mt-6" fullWidth>
                        Register
                        </Button>
                    </form>
                </Card>
            )
        }
    </>
    );
  }