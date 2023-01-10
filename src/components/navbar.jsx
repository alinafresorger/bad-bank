import React from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useCurrentUser } from "./context";
import Link from "next/link";
import { useRouter } from "next/router";

export function MyNavLink({ children, ...props }) {
  const { pathname } = useRouter();
  return (
    <li className={"nav-item" + (pathname == props.href ? " active" : "")}>
      <Link className="nav-link" as={props.href} {...props}>
        {children}
      </Link>
    </li>
  );
}

export function NavBar() {
  const currentUser = useCurrentUser();
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <MyNavLink href="/" title="Home">
              Home
            </MyNavLink>
            <MyNavLink href="/createaccount" title="Create new account">
              Create Account
            </MyNavLink>
            <MyNavLink href="/login" title="Login">
              {currentUser ? `Switch Account (${currentUser.name})` : "Login"}
            </MyNavLink>
            {currentUser && (
              <>
                <MyNavLink href="/deposit" title="Deposit to account">
                  Deposit
                </MyNavLink>
                <MyNavLink href="/withdraw" title="Withdraw from account">
                  Withdraw
                </MyNavLink>
                <MyNavLink href="/balance" title="Check balance">
                  Balance
                </MyNavLink>
              </>
            )}
            <MyNavLink href="/swagger" title="Swagger">
              Swagger
            </MyNavLink>
            {/* <MyNavLink href="/alldata" title="Check activity">
              All Data
            </MyNavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
