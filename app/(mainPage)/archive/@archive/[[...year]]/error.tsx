"use client";

const FilterError = ({error}:any) => {
  return (
    <div>
      <p>An error occurred</p>
      <p>{error.message}</p>
    </div>
  );
};

export default FilterError;
