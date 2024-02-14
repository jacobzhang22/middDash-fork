/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";

const { default: SectionHeaders } = require("./SectionHeaders");

export default function LearnMore() {
  return (
    <section className="text-center my-16">
      <SectionHeaders mainHeader="Get Started" />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <Image
          src="/howItWorks.png"
          width={500}
          height={500}
          alt="how it works"
        />
      </div>
    </section>
  );
}
