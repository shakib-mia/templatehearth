"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Input from "../Input/Input";

const SearchTemplate = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const keyword = e.target.keyword.value.trim();
    if (!keyword) return;

    // redirect to /templates?search=keyword
    router.push(`/templates?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input placeholder={`Press "Enter" to search`} name="keyword" />
    </form>
  );
};

export default SearchTemplate;
