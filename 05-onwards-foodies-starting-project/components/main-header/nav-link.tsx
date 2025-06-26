'use client';
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import classes from './nav-link.module.css';

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }:Props) {
  const path  = usePathname();
  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={`${classes.link} ${isActive ? classes.active : ''}`}
    >
      {children}

    </Link>
  );
}