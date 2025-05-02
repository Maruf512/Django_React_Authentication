import Card from "@/components/Card";
import React from "react";

const page = ({ params }) => {
  console.log(params.id);
  return (
    <div>
      <Card id={params.id} />
    </div>
  );
};

export default page;
