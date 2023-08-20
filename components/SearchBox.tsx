"use client";

import { RiSearchLine } from "@/icons";
import IconButton from "./IconButton";
import Input from "./Input";
import { useRef } from "react";

export default function SearchBox() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form className="flex items-center gap-x-colGap">
      <Input type="text" placeholder="Search..." className="grow" ref={ref} />
      <IconButton type="submit">
        <RiSearchLine />
      </IconButton>
    </form>
  );
}