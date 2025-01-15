import React, { ReactNode } from "react";

interface IProps {
  archive?: ReactNode;
  latest?: ReactNode;
}

const ArchiveLayout = ({ archive, latest }: IProps) => {
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto">
      <header className="font-extrabold text-2xl">News Archive</header>
      <div className=" flex flex-col gap-10 divide-y-2 mt-10">
        <h1 className="">{archive}</h1>
        <h1 className="">{latest}</h1>
      </div>
    </div>
  );
};

export default ArchiveLayout;
