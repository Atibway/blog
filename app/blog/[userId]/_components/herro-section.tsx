"use client"

import React from "react";
import { Vortex } from "./lamp";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import { User } from "@prisma/client";


export function HelloSection({
  user
}:{user: User}) {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-xl md:text-6xl font-bold text-center">
        Welcome to {user.name}&apos;s Blog!
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
{user?.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link
          href={`/blog/${user.id}/posts`}
          >
          <button className="px-[2.9rem] py-4 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-3xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            My Posts
          </button>
          </Link>
          <Link
          href={`/blog/${user.id}/about`}
          >
          <Button
                    borderRadius="1.75rem"
                    className="dark:bg-slate-900  text-white border-slate-800 w-full text-xl "
                >
                    About &rarr;
                </Button>
          </Link>
        </div>
      </Vortex>
    </div>
  );
}
