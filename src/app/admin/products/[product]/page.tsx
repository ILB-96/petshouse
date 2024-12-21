"use client";

import { HeroTitle, MainContainer, SectionContainer } from "@/styles/style";
import { useRouter, useParams } from "next/navigation";
import GenericForm from "@/components/GenericForm/GenericForm";
import { editCompany, findOneCompany } from "@/actions/company";
import { useEffect, useState } from "react";
import { companySchemaZod, ICompany } from "@/models/Company";
import { Icons } from "@/components/icons";

const fields = [
  { name: "name", label: "Company Name*", type: "text" },
  { name: "slug", label: "Company Slug*", type: "text" },
  { name: "url", label: "Company URL", type: "text" },
];

const handleSubmit = async ({ name, slug, url }: ICompany) => {
  const { message } = await editCompany({ name, slug, url });
  return message;
};

const CompanyViewPage = () => {
  const [company, setCompany] = useState<ICompany | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      const slug = params.company;

      if (!slug) {
        router.push("/admin/companies");
        return;
      }
      console.log("slug", slug);

      const company = await findOneCompany(slug as string);
      if (company) {
        setCompany(company);
      } else {
        router.push("/admin/companies");
      }
    };

    fetchCompany();
  }, [params, router]);

  if (!company) {
    return <Icons.Loader />;
  }

  const defaultValues = {
    name: company.name,
    slug: company.slug,
    url: company.url,
  };

  return (
    <MainContainer>
      <SectionContainer>
        <HeroTitle>{company.name}</HeroTitle>
        <GenericForm
          formSchema={companySchemaZod}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </SectionContainer>
    </MainContainer>
  );
};

export default CompanyViewPage;
