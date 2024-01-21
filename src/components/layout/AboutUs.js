/* eslint-disable react/no-unescaped-entities */
const { default: SectionHeaders } = require("./SectionHeaders");

export default function Hero() {
  return (
    <section className="text-center my-16">
      <SectionHeaders mainHeader="About Us" />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>
          MiddDev, also known as Middlebury Development, is a student-led
          organization dedicated to developing meaningful products that enhance
          our community. We offer hands-on, project-based learning experiences
          that empower students to apply their liberal arts education to
          real-world software development problems. Our aim is to support our
          members' growth, fostering their development as both skilled engineers
          and effective leaders.
        </p>
        <p>
          Midd-Dash, our latest project, brings MiddXpress offerings directly to
          your dorm! Expect regular updates and enhancements to Midd-Dash
          throughout the academic year as we frequently introduce new features.
          We value your input and feedback. Please share your suggestions with
          us, and we'll do our best to implement them in our development!
        </p>
        <p>
          Interested in the app's development? Join us at our weekly meetings to
          get involved! Learn more by following us!
        </p>
      </div>
    </section>
  );
}
