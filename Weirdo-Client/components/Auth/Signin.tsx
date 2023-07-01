import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Dialog, Input, Typography } from '@material-tailwind/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSignInForm } from './hook/functions';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signinToken } from './Recoil/atoms';
// import { Input, Button } from 'material-tailwind';
export type SignInForm = {
  email: string,
  password: string
}

const Signin: React.FC = () => {
const [dialogState, setDialogState] = React.useState(false);
const [formData, setFormData] = React.useState<SignInForm>({
  email: '',
  password: '',
});
const [signInToken, setSigninToken] = useRecoilState(signinToken);

const signInFormSubmit = useSignInForm();

const handleOpen = () => {
  setFormData({
    email: '',
    password: ''
  });
  setDialogState((cur) => !cur);
}

const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setSigninToken({
    errorMessage: "",
    token: null
  })
};

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  signInFormSubmit(formData)
};

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Sign in</Button>
      <Dialog
        size="xs"
        open={dialogState}
        handler={handleOpen}
        className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          {signInToken?.errorMessage && (
            <Typography>
              { signInToken?.errorMessage }
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} size="lg" required />
              <Input label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} size="lg" required />
              {/* <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                // onClick={handleOpen} 
                variant="gradient" type="submit" fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                  onClick={handleOpen}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}

export default Signin;