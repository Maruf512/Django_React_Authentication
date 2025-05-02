import React from "react";

const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const posts = await res.json();

  console.log(posts);

  return <div>page</div>;
};

export default page;
