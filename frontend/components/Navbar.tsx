"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "@/context/AuthContext";

// Styled Components
const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: ${(props: { active: boolean }) => (props.active ? "#0070f3" : "#333")};
    text-decoration: ${(props: { active: boolean }) =>
      props.active ? "underline" : "none"};
    font-weight: ${(props: { active: boolean }) =>
      props.active ? "bold" : "normal"};
    &:hover {
      color: #0070f3;
    }
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #0070f3;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;

  &:hover {
    color: #005bb5;
  }
`;

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <Nav>
      <NavList>
        <NavItem active={isActive("/")}>
          <Link href="/">Home</Link>
        </NavItem>
        {isAuthenticated ? (
          <>
            <NavItem active={isActive("/dashboard")}>
              <Link href="/dashboard">Dashboard</Link>
            </NavItem>
            <NavItem active={isActive("/profile")}>
              <Link href="/profile">Profile</Link>
            </NavItem>
            <NavItem active={isActive("/settings")}>
              <Link href="/settings">Settings</Link>
            </NavItem>
            <li>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </li>
          </>
        ) : (
          <>
            <NavItem active={isActive("/login")}>
              <Link href="/login">Login</Link>
            </NavItem>
            <NavItem active={isActive("/register")}>
              <Link href="/register">Register</Link>
            </NavItem>
          </>
        )}
      </NavList>
    </Nav>
  );
}