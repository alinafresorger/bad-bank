import { createContext, useState, useCallback, useMemo, useContext, useLayoutEffect } from "react";

const UserContext = createContext(null);
const LOCALSTORAGEKEY = "bad-bank-user";

const getUser = () => {
  if (typeof localStorage === "undefined") return null;
  if (!localStorage.hasOwnProperty(LOCALSTORAGEKEY)) return null;
  return JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)); // get user info from local storage
};

const saveUser = (user) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(user)); // preserve user between page reloads
};

export async function fetchApi(url, init) {
  if (init.body) {
    init.body = JSON.stringify(init.body);
    init.headers = {
      "Content-Type": "application/json",
    };
    if (!init.method) init.method = "POST";
  }
  const res = await fetch(url, init);
  if (!res.ok) throw new Error("API Error: " + res.statusText);
  return res;
}

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUserRaw] = useState(null);
  const [audit, setAudit] = useState([]);
  // const [users, setUsers] = React.useState([]);

  // const [state, setState] = React.useState({
  //   users: [{ name: "Alina", email: "alina@gmail.com", password: "123123", balance: 100, activity: "" }],
  //   currentUserEmail: null,
  //   audit: [],
  // });

  // on client set user from local storage, server side rendering bypasses this
  useLayoutEffect(() => {
    const user = getUser();
    if (user) setCurrentUserRaw(user);
  }, [setCurrentUserRaw]);

  const setCurrentUser = useCallback(
    (user) => {
      saveUser(user);
      setCurrentUserRaw(user);
    },
    [setCurrentUserRaw]
  );

  const add = useCallback(async ({ name, email, password }) => {
    const res = await fetchApi(`/api/create`, { body: { name, email, password } }); // we put sensitve information in body because in URL is not secure way to send password, body is encrypted
    return res.json();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const res = await fetchApi(`/api/login`, { body: { email, password } });
    const user = await res.json(); // returns JSON with user info
    setCurrentUser(user); // make user current
  }, []);

  const googleLogin = useCallback(async ({ response }) => {
    const res = await fetchApi(`/api/googleLogin`, { body: { token: response.credential } });
    const user = await res.json(); // returns JSON with user info
    setCurrentUser(user); // make user current
  }, []);

  const logout = useCallback(async () => {
    setCurrentUser(null);
  }, []);

  const withdraw = useCallback(
    async ({ amount }) => {
      if (!currentUser) throw new Error("Not looged in");
      const res = await fetchApi(`/api/withdraw`, {
        body: { email: currentUser.email, password: currentUser.password, amount },
      });
      const user = await res.json();
      setCurrentUser(user); // update local user with new balance
    },
    [currentUser]
  );

  const deposit = useCallback(
    async ({ amount }) => {
      if (!currentUser) throw new Error("Not looged in");
      const res = await fetchApi(`/api/deposit`, {
        body: { email: currentUser.email, password: currentUser.password, amount },
      });
      const user = await res.json();
      setCurrentUser(user); // update local user with new balance
    },
    [currentUser]
  );

  const all = useCallback(async () => {
    const res = await fetchApi(`/api/all`);
    return await res.json();
  }, []);

  // TODO This has to be done automatically in backend
  const addAudit = useCallback((entry) => {
    setAudit((audit) => [...audit, { timestamp: Date.now(), ...entry }]);
  }, []);

  const contextValue = useMemo(
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

export function useUserContext() {
  return useContext(UserContext);
}

export function useCurrentUser() {
  const ctx = useUserContext();
  return ctx.currentUser;
}

export function Card(props) {
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
