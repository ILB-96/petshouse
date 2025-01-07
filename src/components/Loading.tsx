import React from "react";
import { Icons } from "./icons";
import { MainContainer, SectionContainer } from "@/styles/style";

const Loading = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-center w-full animate-spin">
          <Icons.loader />;
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default Loading;
