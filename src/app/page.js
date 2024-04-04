"use client";

import Link from "next/link";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import AboutUs from "../components/layout/AboutUs";
import SocialMediaBar from "../components/layout/SocialMediaBar";
import Report from "../components/layout/Report";
import LearnMore from "../components/layout/LearnMore";

export default function Home() {
  return (
    <>
      {/* <pre className="text-gray-500 -mt-2"> by MiddDev</pre> */}
      <Hero />
      <div className="w-[600px] mx-auto mb-10 border-black border-[1px] p-5 text-center ">
        MiddDash is a student-run delivery service, operated by MiddDev Club.
        Please be aware that MiddDash is not affiliated with, endorsed by, or
        operated by Middlebury College, the Grille, or any of their affiliates.
        Middlebury College and the Grille assume NO responsibility and and NO
        liability for any aspects of the orders placed through MiddDash,
        including but not limited to the quality of the food, accuracy of the
        order, payment processing, and timeliness of delivery.
        <br />
        <br />
        Please contact{" "}
        <Link href="mailto:midddev@middlebury.edu" className="text-blue-500">
          MiddDev@middlebury.edu
        </Link>{" "}
        with questions or comments.
      </div>
      <HomeMenu />
      <section id="get-started">
        <LearnMore />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="contact">
        <SocialMediaBar />
      </section>
      <section>
        <Report />
      </section>
    </>
  );
}
