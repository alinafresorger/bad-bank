import React, { useState } from "react";
import { useUserContext, useCurrentUser, Card } from "../components/context";
import { SignInWithGoogle } from "../components/google";

export default function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useUserContext();
  const currentUser = useCurrentUser();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);
    if (!validate(email, "email required")) return;
    if (!validate(password, "password required")) return;

    // const user = ctx.state.users.find((user) => user.email === email && user.password === password);

    // if (!user) {
    //   setStatus("Error: User not found");
    //   setTimeout(() => setStatus(""), 3000);
    //   return;
    // }

    // ctx.setState((state) => ({ ...state, currentUserEmail: email }));
    // ctx.addAudit({ action: "login", email });
    // // console.log(email);
    // setShow(false);
    ctx
      .login({ email, password })
      .then(() => setShow(false))
      .catch((e) => {
        alert("Cannot login " + e.message);
        setShow(true);
      });
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
    ctx.logout();
  }

  return (
    <Card
      bgcolor="warning"
      header="Login"
      status={status}
      body={
        show && !currentUser ? (
          <form onSubmit={handleLogin}>
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!email && !password}>
              Login
            </button>
            <SignInWithGoogle />
          </form>
        ) : (
          <>
            <h5>Success, logged in as {currentUser.email}</h5>
            <button type="button" className="btn btn-light" onClick={clearForm}>
              Switch Account
            </button>
          </>
        )
      }
    />
  );
}
