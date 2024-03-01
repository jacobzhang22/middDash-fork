"use client";

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
