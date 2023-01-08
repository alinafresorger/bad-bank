import React, { useState } from "react";
import { useUserContext, useCurrentUser, Card } from "../components/context";

export default function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [withdraw, setWithdraw] = useState(0);
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

  function handleWithdraw(e) {
    e.preventDefault();
    console.log(withdraw);

    if (!validate(withdraw, "Enter valid amount")) return;
    else {
      if (withdraw > currentUser.balance) {
        alert("Insufficient funds");
        return;
      } else if (withdraw <= 0 || isNaN(withdraw)) {
        alert("Enter valid amount");
        return;
      }
    }

    // const newUsers = ctx.state.users.reduce((res, user) => {
    //   if (user.email === currentUser.email) {
    //     user.balance = Number(user.balance) - Number(withdraw);
    //     console.log("New balance", user.balance);
    //   }
    //   res.push(user);
    //   return res;
    // }, []);
    // ctx.setState({ ...ctx.state, users: newUsers });
    // ctx.addAudit({ action: "withdraw", email: currentUser.email, data: { withdraw } });
    // // }
    // // ctx.users.push({ });
    // setShow(false);
    ctx
      .withdraw({ amount: withdraw })
      .then((user) => {
        setShow(false);
      })
      .catch((e) => {
        alert("Cannot make deposit", e.message);
        setShow(true);
      });
  }

  function clearForm() {
    setWithdraw(0);
    setShow(true);
  }

  if (!currentUser) return <Card bgcolor="danger" body="Not logged in"></Card>;

  const totalBalance = `Account Balance $ ${currentUser.balance}`;

  return (
    <Card
      bgcolor="info"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <form onSubmit={handleWithdraw}>
            <h5> {totalBalance} </h5>
            <br />
            <br />
            Withdraw Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Withdraw Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!withdraw}>
              Withdraw
            </button>
          </form>
        ) : (
          <>
            <h5>Success, new balance $ {currentUser.balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Withdraw another amount
            </button>
          </>
        )
      }
    />
  );
}
