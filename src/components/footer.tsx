import Link from "next/link";

import { Icons } from "@/components/icons";
import { FooterContainer } from "@/styles/style";
const Footer = () => (
  <FooterContainer>
    <p className="font-medium">
      <Icons.copyright /> 2024 Israel Barmack
    </p>
    <div className="flex items-center space-x-4">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ILB-96"
        aria-label="Israel Barmack's GitHub Profile"
        className="hover:text-accent-foreground transition-colors duration-300"
      >
        <Icons.github className="size-6" />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/israelbar"
        aria-label="Israel Barmack's LinkedIn Profile"
        className="hover:text-accent-foreground transition-colors duration-300"
      >
        <Icons.linkedin className="size-6" />
      </Link>
    </div>
  </FooterContainer>
);
export default Footer;
