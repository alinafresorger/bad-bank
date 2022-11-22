function Balance() {
  const [status, setStatus] = React.useState("");
  const ctx = useUserContext();
  const currentUser = useCurrentUser();

  if (!currentUser) return <Card bgcolor="danger" body="Not logged in"></Card>;
  const totalBalance = `Account Balance $ ${currentUser.balance}`;

  return (
    <Card
      bgcolor="success"
      header="Balance"
      status={status}
      body={
        <>
          <h5> {totalBalance} </h5>
        </>
      }
    />
  );
}
