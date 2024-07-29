"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  function handleSearch(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      console.log(ev);
      console.log(search);
      router.push("/listing?page=1&title=" + search);
      // setTitle(ev.target.value);
    }
  }
  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">Find your dream job</h1>
      <div className="flex flex-col gap-3">
        <p className=" text-xl mt-8 text-gray-500">
          Discover thousands of job listings from top companies across
          industries, curated to match your skills and aspirations. Our
          intuitive interface makes searching for and posting jobs seamless.
          Join a community of driven individuals who are shaping their futures.{" "}
          <br />
        </p>
        <p className="text-2xl text-center">
          <span className="font-bold text-blue-600">Search for a job now </span>{" "}
          and let&apos;s build your future together.
        </p>
      </div>
      <form className="mt-5 flex flex-col items-center max-w-xl mx-auto">
        <input
          onKeyDown={handleSearch}
          onChange={(ev: any) => {
            console.log(ev.target.value);
            setSearch(ev.target.value);
          }}
          type="search"
          className="border w-full py-3 rounded-2xl px-2"
          placeholder="Search for a job title..."
        />
        <button
          type="button"
          onClick={(ev) => {
            console.log("click");
            router.push("/listing?page=1&title=" + search);
          }}
          className="bg-blue-600 text-white w-full py-2 rounded-md mt-2"
        >
          Search
        </button>
      </form>
    </section>
  );
}
