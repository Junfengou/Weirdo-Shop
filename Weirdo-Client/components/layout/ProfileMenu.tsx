import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {ProfileItems} from "./defaultNavItems"
import React from 'react'
import { useRecoilState } from 'recoil';
import { signinToken } from 'components/Auth/Recoil/atoms';

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [signInToken, setSigninToken] = useRecoilState(signinToken);

    const closeMenu = () => setIsMenuOpen(false);

    const resetSigninToken = () => {
      setIsMenuOpen(false)
      setSigninToken({
        errorMessage: null,
        token: null
      });
      localStorage.removeItem("SignInResult")
    }
   
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {ProfileItems.map(({ label, icon }, key) => {
            const isLastItem = key === ProfileItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={label === "Sign Out" ? resetSigninToken : closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
}

export default ProfileMenu