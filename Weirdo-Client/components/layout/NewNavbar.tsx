"use client"
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse
} from "@material-tailwind/react";
import { navItems } from "./defaultNavItems";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import Signin from "components/Auth/Signin";
import { useRecoilState, useRecoilValue } from "recoil";
import { SignInResult, signinToken } from "components/Auth/Recoil/atoms";

export default function NewNavbar() {

  const [openNav, setOpenNav] = React.useState(false);
  const [signInToken, setSigninToken] = useRecoilState(signinToken);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    if (typeof window !== 'undefined' && window.localStorage) {
      const SigninResultFromLocalStorage = localStorage.getItem('SignInResult') || '';
      if (SigninResultFromLocalStorage !== '') {
        const storedObject: SignInResult = JSON.parse(SigninResultFromLocalStorage);
        if (Object.keys(storedObject).length !== 0) {
          setSigninToken(storedObject);
        }
      }
    }
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
        navItems.map((navItem, index) => (
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                key={index}
            >
              <Link href={navItem.href}>
                {navItem.label} 
              </Link>
                
            </Typography>
        ))
      }
      
    </ul>
  );
 
  return (
    <> 
      <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Link href="/">
                Weirdo 
            </Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {signInToken && Object.keys(signInToken).length !== 0 && signInToken.token !== null ? <ProfileMenu /> : <Signin />}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        </Collapse>
      </Navbar>
    </>
  );
}
