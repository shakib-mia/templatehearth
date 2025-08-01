"use client";

import React from "react";
// import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Link from "next/link";

const SeeAllButton = ({ path, children }) => {
  // const navigate = useRouter();

  return (
    <Link href={path} className="flex justify-center mt-8">
      <Button>{children}</Button>
    </Link>
  );
};

export default SeeAllButton;
