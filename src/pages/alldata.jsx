// function AuditEntry({ data }) {
//   return (
//     <div>
//       <Card
//         bgcolor="primary"
//         title={data.action}
//         text={"By " + (data.email || "Guest")}
//         body={"At " + new Date(data.timestamp).toLocaleString()}
//         status={data.data && "Extra info: " + JSON.stringify(data.data)}
//       />
//     </div>
//   );
// }

// function AllData() {
//   // const ctx = React.useContext(UserContext);
//   const ctx = useUserContext();

//   if (!ctx.state.audit.length) return <Card bgcolor="primary" body="Audit Trail: no data" />;

//   return ctx.state.audit.map((data, i) => <AuditEntry key={i} data={data}></AuditEntry>);

// }
import React, { useState, useEffect } from "react";
import { useUserContext, Card } from "../components/context";

export default function AllData() {
  const [data, setData] = useState("");
  const ctx = useUserContext();

  useEffect(() => {
    // fetch all accounts from API
    ctx.all().then((data) => {
      console.log(data);
      setData(JSON.stringify(data));
    });
  }, [ctx]);

  return (
    <Card>
      <h5> All Data In store:</h5>
      {data}
    </Card>
  );
}
