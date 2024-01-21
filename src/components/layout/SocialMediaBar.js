// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faHouse } from "@fortawesome/free-solid-svg-icons";
// import {
//   faLinkedinIn,
//   faInstagram,
//   faTiktok,
// } from "@fortawesome/free-brands-svg-icons";
import SectionHeaders from './SectionHeaders';

export default function Header() {
  return (
    <section className="text-center my-8">
      <SectionHeaders mainHeader="Contact Us" />
      <div className="mt-8">
        <ul className="flex list-none p-0 justify-center">
          <li className="mr-4">
            <a
              href="mailto:jyzhang@middlebury.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              A
              {/* <FontAwesomeIcon icon={faEnvelope} className="social-icon-size" /> */}
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.linkedin.com/company/middlebury-development/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              A
              {/* <FontAwesomeIcon */}
              {/* icon={faLinkedinIn} */}
              {/* className="social-icon-size" */}
              {/* /> */}
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              A
              {/* <FontAwesomeIcon */}
              {/* icon={faInstagram} */}
              {/* className="social-icon-size" */}
              {/* /> */}
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.tiktok.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              A
              {/* <FontAwesomeIcon icon={faTiktok} className="social-icon-size" /> */}
            </a>
          </li>
          <li>
            <a
              href="https://www.yourcompanywebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-800"
            >
              A
              {/* <FontAwesomeIcon icon={faHouse} className="social-icon-size" /> */}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
