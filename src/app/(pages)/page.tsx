"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import {
  BenefitsContainer,
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
import { inclusions, features } from "@/constants";

// Styled-components for Features section
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeatureIcon = styled(Image)`
  margin-bottom: 1rem;
`;

const FeatureTitle = styled(SectionSubtitle)`
  margin-bottom: 0.5rem;
`;

export default function Home() {
  return (
    <MainContainer>
      {/* Hero Section */}
      <SectionContainer role="contentinfo" id="hero">
        <HeroContainer>
          <TextContainer>
            <HeroTitle>
              Welcome to PetsHouse <span>All In One Store for Your Pet</span>
            </HeroTitle>
            <Paragraph>
              PetsHouse is your one-stop shop for all pet needs. From food and
              toys to grooming supplies, we offer everything at great prices.
              Join our community and enjoy savings and convenience for your
              beloved pets.
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

      {/* Why Choose Us Section */}
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

      {/* Explore Our Capabilities Section */}
      <SectionContainer id="features">
        <SectionTitle>Explore Our&nbsp;Capabilities</SectionTitle>
        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.title}>
              <FeatureIcon
                src={feature.icon}
                alt={`${feature.title} Icon`}
                width={80}
                height={80}
              />
              <FeatureTitle>{feature.title}</FeatureTitle>
              <Paragraph>{feature.description}</Paragraph>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </SectionContainer>

      {/* Call to Action Section */}
      <SectionContainer id="cta">
        <TextContainer>
          <SectionTitle>Ready to Save&nbsp;More?</SectionTitle>
          <Paragraph>
            Join PetsHouse today and experience the ultimate convenience for you
            and your pet.
          </Paragraph>
          <PrimaryButton>Get Started</PrimaryButton>
        </TextContainer>
      </SectionContainer>
    </MainContainer>
  );
}
