import ContactForm from "@/components/contact/contact-form";
import { MainContainer, SectionContainer, SectionTitle } from "@/styles/style";
import React from "react";

const ContactPage = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactForm />
      </SectionContainer>
    </MainContainer>
  );
};

export default ContactPage;
