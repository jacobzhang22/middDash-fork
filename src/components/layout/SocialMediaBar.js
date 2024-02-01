import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import SectionHeaders from "./SectionHeaders";

export default function Header() {
  return (
    <section className="text-center my-8">
      <SectionHeaders mainHeader="Contact Us" />
      <div className="mt-8">
        <ul className="flex list-none p-0 justify-center">
          <li className="mr-4">
            <a
              href="mailto:midddev@middlebury.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              <FaEnvelope size="1.5em" />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.linkedin.com/company/middlebury-development/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              <FaLinkedin size="1.5em" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
