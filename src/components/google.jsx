import React, { useRef, useCallback, useEffect } from "react";
import { useUserContext } from "./context";

export function SignInWithGoogle() {
  const ref = useRef();
  const ctx = useUserContext();

  const onLoggedIn = useCallback(
    (response) => {
      console.log("Encoded JWT ID token", response);
      ctx.googleLogin({ response });
    },
    [ctx]
  );

  useEffect(() => {
    if (typeof google === "undefined") return; // server rendering

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: onLoggedIn,
    });

    google.accounts.id.renderButton(
      ref.current,
      { theme: "outline", size: "large" } // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }, [onLoggedIn]);

  return (
    <div ref={ref}></div>
    // <button type="button" className="btn btn-light" ref={ref}>
    //   Login with Google
    // </button>
  );
}
