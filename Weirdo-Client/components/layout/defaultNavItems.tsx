import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
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
