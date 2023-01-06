const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

const backendUrl = window.location.origin; // http://localhost:3000

async function fetchApi(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error("API Error: " + res.statusText);
  return res;
}

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [audit, setAudit] = React.useState([]);
  // const [users, setUsers] = React.useState([]);

  // const [state, setState] = React.useState({
  //   users: [{ name: "Alina", email: "alina@gmail.com", password: "123123", balance: 100, activity: "" }],
  //   currentUserEmail: null,
  //   audit: [],
  // });

  const add = React.useCallback(async ({ name, email, password }) => {
    const res = await fetchApi(backendUrl + `/account/create/${name}/${email}/${password}`);
    return res.json();
  }, []);

  const login = React.useCallback(async ({ email, password }) => {
    const res = await fetchApi(backendUrl + `/account/login/${email}/${password}`);
    const user = await res.json(); // returns JSON with user info
    setCurrentUser(user); // make user current
  }, []);

  const googleLogin = React.useCallback(async ({ response }) => {
    const res = await fetchApi(backendUrl + `/account/googleLogin/${response.credential}`);
    const user = await res.json(); // returns JSON with user info
    setCurrentUser(user); // make user current
  }, []);

  const logout = React.useCallback(async () => {
    setCurrentUser(null);
  }, []);

  const withdraw = React.useCallback(
    async ({ amount }) => {
      if (!currentUser) throw new Error("Not looged in");
      const res = await fetchApi(
        backendUrl + `/account/withdraw/${currentUser.email}/${currentUser.password}/${amount}`
      );
      const user = await res.json();
      setCurrentUser(user); // update local user with new balance
    },
    [currentUser]
  );

  const deposit = React.useCallback(
    async ({ amount }) => {
      if (!currentUser) throw new Error("Not looged in");
      const res = await fetchApi(
        backendUrl + `/account/deposit/${currentUser.email}/${currentUser.password}/${amount}`
      );
      const user = await res.json();
      setCurrentUser(user); // update local user with new balance
    },
    [currentUser]
  );

  const all = React.useCallback(async () => {
    const res = await fetchApi(backendUrl + `/account/all`);
    return await res.json();
  }, []);

  // TODO This has to be done automatically in backend
  const addAudit = React.useCallback((entry) => {
    setAudit((audit) => [...audit, { timestamp: Date.now(), ...entry }]);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      currentUser,
      add,
      login,
      logout,
      withdraw,
      deposit,
      all,
      addAudit,
      googleLogin,
    }),
    [currentUser, add, login, logout, withdraw, deposit, all, addAudit, googleLogin]
  );
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

function useCurrentUser() {
  const ctx = useUserContext();
  return ctx.currentUser;
}

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }
  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
