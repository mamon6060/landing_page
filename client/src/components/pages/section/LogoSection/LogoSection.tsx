import Image from "next/image";
import logo from "@/src/assets/logo/logoblack.png";
const LogoSection = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-center mt-8">
        <div className="">
          {/* <img
            decoding="async"
            src={logo}
            className="attachment-thumbnail size-thumbnail wp-image-309849 w-full h-full"
            alt=""
            srcSet={logo}
            sizes="(max-width: 150px) 100vw, 150px"
          /> */}
          <Image src={logo} width={160} height={250} alt="logo"></Image>
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
