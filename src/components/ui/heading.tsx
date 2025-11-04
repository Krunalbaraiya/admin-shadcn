import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading = ({ title, className }: HeadingProps) => {
  return (
    <>
      <h2
        className={`text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white ${className}`}
      >
        {title}
      </h2>
    </>
  );
};

export default Heading;
