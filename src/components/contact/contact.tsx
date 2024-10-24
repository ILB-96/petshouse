import { Paragraph, SectionContainer, SectionTitle } from "@/styles/style";
import ContactForm from "./contact-form";
import { Icons } from "./icons";
import MailButtons from "./mail-buttons";

import MotionWrap from "@/components/motion-wrap";
const Contact = () => (
  <SectionContainer id="contact">
    <MotionWrap className="grid max-md:grid-rows-[auto_1fr] max-md:space-y-16 md:grid-cols-2">
      <div className="col-start-1">
        <SectionTitle id="contact-heading">
          For More
          <span> Information</span>
        </SectionTitle>
        <Paragraph id="contact-description">
          Ask me anything or just say hey <Icons.smile />
        </Paragraph>
        <MailButtons />
      </div>
      <ContactForm />
    </MotionWrap>
  </SectionContainer>
);
export default Contact;
