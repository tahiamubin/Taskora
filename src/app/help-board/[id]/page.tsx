import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};

export default page;
