import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BenefitsContainer,
  FeatureContainer,
  SectionSubtitle,
  HeroContainer,
  HeroTitle,
  MainContainer,
  Paragraph,
  PrimaryButton,
  SectionContainer,
  SectionTitle,
  TextContainer,
} from "@/styles/style";
import { inclusions } from "@/constants";

export default function Home() {
  return (
    <MainContainer>
      <SectionContainer role="contentinfo" id="hero">
        <HeroContainer>
          <TextContainer>
            <HeroTitle>
              Join Forces&nbsp;to<span>Save&nbsp;More</span>
            </HeroTitle>
            <Paragraph>
              GetBy helps you connect with others who have similar{" "}
              <span>
                purchasing interests to get the best deals and share delivery
                costs.
              </span>
            </Paragraph>
            <PrimaryButton>Get Started</PrimaryButton>
          </TextContainer>
          <Image
            src="/assets/hero.png"
            alt="Hero illustration"
            width={700}
            height={405}
          />
        </HeroContainer>
      </SectionContainer>

      <SectionContainer id="benefits">
        <SectionTitle>Why Choose&nbsp;PetsHouse?</SectionTitle>
        <BenefitsContainer>
          {inclusions.map((benefit) => (
            <div key={benefit.title}>
              <TextContainer>
                <SectionSubtitle>{benefit.title}</SectionSubtitle>
                <Paragraph>{benefit.description}</Paragraph>
                <Image
                  src={benefit.icon}
                  alt={`${benefit.title} Image`}
                  width={200}
                  height={150}
                />
              </TextContainer>
            </div>
          ))}
        </BenefitsContainer>
      </SectionContainer>
      <PrimaryButton>Ready to Save&nbsp;More?</PrimaryButton>
      <SectionContainer id="cta" />
    </MainContainer>
  );
}
