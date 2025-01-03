"use client";
import { styled, css } from "styled-components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
const title1 = css`
  --lineHeightInEms: calc(1em * var(--halfstep));
  --md: var(--lineHeightInEms);

  --sm: calc(var(--lineHeightInEms) * var(--wholestep-dec));
  --xs: calc(var(--lineHeightInEms) * var(--halfstep-dec));
  --2xs: calc(var(--lineHeightInEms) * var(--quarterstep-dec));

  --lg: calc(var(--lineHeightInEms) * var(--wholestep));
  --xl: calc(var(--lg) * var(--wholestep));
  --2xl: calc(var(--xl) * var(--wholestep));

  letter-spacing: -0.022em;
  font-size: calc(1em * var(--wholestep) * var(--halfstep));
  font-weight: 400;
  line-height: var(--halfstep);
`;
const title2 = css`
  --lineHeightInEms: calc(1em * var(--halfstep));
  --md: var(--lineHeightInEms);

  --sm: calc(var(--lineHeightInEms) * var(--wholestep-dec));
  --xs: calc(var(--lineHeightInEms) * var(--halfstep-dec));
  --2xs: calc(var(--lineHeightInEms) * var(--quarterstep-dec));

  --lg: calc(var(--lineHeightInEms) * var(--wholestep));
  --xl: calc(var(--lg) * var(--wholestep));
  --2xl: calc(var(--xl) * var(--wholestep));

  letter-spacing: -0.02em;
  font-size: calc(1em * var(--wholestep));
  font-weight: 400;
  line-height: var(--halfstep);
`;
const MainGridStyle = css`
  --gap: clamp(1rem, 6vw, 3rem);
  display: grid;
  grid-template-columns:
    minmax(var(--gap), 1fr)
    repeat(12, minmax(0, 1fr))
    minmax(var(--gap), 1fr);
`;

const MainStyle = css`
  display: grid;
  grid-template-columns: subgrid;
  grid-column-start: 1;
  grid-column-end: -1;
`;

const ContentStyle = css`
  display: grid;
  grid-template-columns: subgrid;
  grid-column-start: 2;
  grid-column-end: -2;
`;

const SmallShadowStyle = css`
  align-items: flex-start;
  box-shadow: 0 0 1px 0 var(--shadow);
  flex: 0 auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
`;
const ShadowStyle = css`
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.11),
    0 0 1px #727272;
  flex: 0 auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-content: flex-start;
  position: relative;
  z-index: 2;
`;

export const BodyContainer = styled.div`
  ${MainGridStyle}
  background-color: var(--background);
  color: var(--onbackground);
  position: relative;
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  ${MainStyle}
  min-height: 100vh;
  padding-top: var(--xl);
  place-content: start;
`;

export const SectionContainer = styled.section`
  ${ContentStyle}
  padding: var(--lg) 0;
  > * {
    grid-column-start: 1;
    grid-column-end: -1;
  }
`;

export const NavContainer = styled.nav`
  ${MainStyle}
  ${SmallShadowStyle}
  position: sticky;
  background-color: var(--surfacebright);
  padding: var(--md) 0;
  top: 0;
  z-index: 999;
  max-height: 5.5rem;
  align-items: center;
  transition: opacity 100ms linear;
  visibility: visible;

  > button {
    width: fit-content;
    margin-left: auto;
  }
`;
export const LogoLink = styled(Link)`
  margin: 0 1.5rem 0 0;
  width: 5.5rem;
`;
export const ProfileImage = styled(Image)`
  ${ShadowStyle}
  margin: auto;
  border-radius: 999px;
`;

export const NavContent = styled.div`
  ${ContentStyle}
  grid-column-end: -3;
  :nth-child(2) {
    grid-column-start: 3;
  }
  height: fit-content;
`;
export const NavLink = styled(Link)`
  padding: var(--sm);
  margin: auto auto 0 0;
  border-radius: var(--2xl);
  position: relative;
  font-weight: 500;
  &:before {
    content: "";
    position: absolute;
    bottom: 8px;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    border-radius: var(--xl);
    z-index: -1;
    transition: 200ms ease;
  }
  &:hover:before {
    width: 50%;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 8px;
    width: 0;
    right: 8px;
    height: 2px;
    background-color: var(--primary);
    border-radius: var(--xl);
    z-index: -1;
    transition: 250ms ease;
  }
  &:hover:after {
    width: 50%;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: relative;
  gap: var(--sm);
  background-color: var(--surface);
  padding: var(--lg);
  border-radius: var(--md);
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  :not(:first-child) {
    margin-top: var(--sm);
  }
  > img {
    width: 25%;
    height: 25%;
  }
`;

export const PrimaryButton = styled(Button)`
  font-size: 1.5rem;
  width: fit-content;
  display: flex;
  background-color: rgba(var(--primary));
  color: var(--onprimary);
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
  grid-column-start: 7;

  &:hover {
    background-color: var(--primary-inverse);
    color: var(--onprimaryfixed);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const HeroTitle = styled.h1`
  ${title1}
  color: var(--primary);
  text-align: start;
  font-weight: bold;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h2`
  ${title2}
  /* font-size: 2rem; */
  color: var(--primary);
  text-align: start;
  font-weight: 500;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Paragraph = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  color: var(--onsurface);
  text-align: start;
  margin: 1rem 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary);
  text-align: center;
  margin: 1rem 0;
  font-weight: 500;
  /* width: 120%; */

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const BenefitsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  place-content: center;
  gap: 30px;
  padding: 0;
  /* margin: 100px 0; */

  /* @media (max-width: 768px) {
    grid-template-columns: 1fr;
  } */
  > div > img {
    opacity: 80%;
    border-radius: 999px;
    width: 30%;
    height: 30%;
  }
`;

export const FeatureContainer = styled.div`
  padding: var(--lg) 0;
  background-color: var(--surfacebright);
  border-radius: var(--sm);
  display: flex;
  place-items: center;
  justify-content: space-evenly;

  > img {
    opacity: 85%;
    border-radius: 999px;
  }
`;

export const FooterContainer = styled.footer`
  ${MainStyle}
  ${SmallShadowStyle}
  position: relative;
  width: 100%;
  bottom: 0;
  max-height: 3.5rem;
  background-color: var(--surface);
  display: flex;
  justify-content: space-around;
  padding: var(--md) 0;
  z-index: 40;
  margin-top: auto;
`;
export const FilterContainer = styled.div`
  margin-bottom: 1rem;
`;

export const SearchSortContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem; /* Add spacing between search and sort components */
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
