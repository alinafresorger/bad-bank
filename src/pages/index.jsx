import React from "react";
import { Card } from "../components/context";

export default function Home() {
  return (
    <div className="text-center">
      <Card
        bgcolor="primary"
        txtcolor="white"
        header="Bad Bank Home"
        title="Welcome to the bank with zero security!"
        text=""
        body={<img src="/bank.png" className="img-fluid" alt="Responsive image" />}
      />
    </div>
  );
}
