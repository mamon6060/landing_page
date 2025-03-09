import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

const FooterSection = () => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 px-4">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-2xl"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800 text-2xl"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="http://wa.me/88"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 text-2xl"
          aria-label="Whatsapp"
        >
          <FaWhatsapp />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#262626] hover:text-green-800 text-xl"
          aria-label="Whatsapp"
        >
          <FaTiktok />
        </a>
      </div>
      <div className="text-center text-gray-600 text-sm py-4">
        <p>
          Copyright ©2025 okobiz | This website made with
          <a
            href="https://okobiz.com"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Okobiz
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
