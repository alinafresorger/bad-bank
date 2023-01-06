function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = useUserContext();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    e.stopPropagation();
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    else {
      if (password.length < 8) {
        alert("Password must be 8 characters long");
        return;
      }
    }
    // function handle() {
    //   console.log(name, email, password);
    //   const url = `/account/create/${name}/${email}/${password}`;
    //   (async () => {
    //     var res = await fetch(url);
    //     var data = await res.json();
    //     console.log(data);
    //   })();
    //   props.setShow(false);
    // }
    // ctx.setState({
    //   ...ctx.state,
    //   users: [...ctx.state.users, { name, email, password, balance: 100 }],
    // });
    ctx
      .add({ name, email, password })
      .then((user) => {
        setShow(false);
        ctx.addAudit({ action: "new user", email, data: { name } });
      })
      .catch((e) => {
        alert("Cannot create user", e.message);
        setShow(true);
      });
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <>
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={
          show ? (
            <form onSubmit={handleCreate}>
              Name
              <br />
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
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
              <button type="submit" className="btn btn-light" disabled={!name && !email && !password}>
                Create Account
              </button>
              <br />
            </form>
          ) : (
            <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>
                Add another account
              </button>
            </>
          )
        }
      />
      <br />
      <Card bgcolor="primary" header="Login with Google" body={<SignInWithGoogle />} />
    </>
  );
}
