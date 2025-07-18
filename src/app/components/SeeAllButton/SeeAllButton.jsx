"use client";

import React from "react";
// import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Link from "next/link";

const SeeAllButton = ({ path }) => {
  // const navigate = useRouter();

  return (
    <Link href={path} className="flex justify-center mt-8">
      <Button>Explore More</Button>
    </Link>
  );
};

export default SeeAllButton;
