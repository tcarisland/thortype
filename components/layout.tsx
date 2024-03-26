import Link from 'next/link';
import { useState } from 'react';
import NavLink from '../model/nav-link';
import TopNavbar from "./top-navbar";

const pages: NavLink[] = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "About",
    link: "/about"
  },
  {
    name: "Contact",
    link: "/contact"
  }
]

export default function Layout() {
  const [navbar, setNavbar] = useState(false);
  return (
    <TopNavbar pages={pages}></TopNavbar>
  );
}
