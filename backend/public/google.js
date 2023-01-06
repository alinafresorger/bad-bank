function SignInWithGoogle() {
  const ref = React.useRef();
  const ctx = useUserContext();

  const onLoggedIn = React.useCallback(
    (response) => {
      console.log("Encoded JWT ID token", response);
      ctx.googleLogin({ response });
    },
    [ctx]
  );

  React.useEffect(() => {
    google.accounts.id.initialize({
      client_id: "152320973930-k4cuiof24ni58fofkc8be760v9q73hjl.apps.googleusercontent.com",
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
