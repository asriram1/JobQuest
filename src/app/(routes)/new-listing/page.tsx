import React from "react";
import getCompanies from "@/app/_libs/companies";

export default function page() {
  const companies = getCompanies();
  return (
    <form>
      <div className="grid grid-rows-6">
        <div>
          <input
            type="text"
            className="border w-full"
            placeholder="Job Title"
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </form>
  );
}
