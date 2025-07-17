"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Link from "next/link";

const SeeAllButton = () => {
  const navigate = useRouter();

  return (
    <Link href={"/templates"} className="flex justify-center mt-8">
      <Button onClick={() => navigate.push("/templates")}>Explore More</Button>
    </Link>
  );
};

export default SeeAllButton;
