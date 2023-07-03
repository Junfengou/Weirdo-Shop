import React from "react";
import {
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  
} from "@heroicons/react/24/outline";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <BuildingStorefrontIcon className="w-5 h-5" />,
  },
  {
    label: "Products",
    href: "/products/products",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  // {
  //   label: "Cart",
  //   href: "/cart",
  //   icon: <UserGroupIcon className="w-6 h-6" />,
  // },
  // {
  //   label: "Order",
  //   href: "/order",
  //   icon: <CalendarIcon className="w-6 h-6" />,
  // },
];

export type ProfileItem = {
  label: string;
  icon: any;
  href: string;
};

export const ProfileItems: ProfileItem[] = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    href: "/"
  },
  {
    label: "My Cart",
    icon: ShoppingCartIcon,
    href: "/cart/mycart"
  },
  // {
  //   label: "Inbox",
  //   icon: InboxArrowDownIcon,
  // },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  // },
  {
    label: "Sign Out",
    icon: PowerIcon,
    href: ""
  },
];