import React from "react";

interface INewsDetailLayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const NewsDetailLayout = ({ children, modal }: INewsDetailLayout) => {
  return (
    <>
    {/* its modal cuz we have the @modal */}
      {modal}
      {children}
    </>
  );
};

export default NewsDetailLayout;
