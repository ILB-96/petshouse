import { MainContainer, SectionContainer } from "@/styles/style";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Company } from "@/models/Company";

const ViewCompaniesPage = async () => {
  const companies = await Company.find();

  return (
    <MainContainer>
      <SectionContainer>
        <Button asChild>
          <Link href="/admin/companies/create">Create Company</Link>
        </Button>
        {companies.map((company) => (
          <div key={company._id}>
            <Button asChild>
              <Link href={`/admin/companies/${company.name}`}>
                {company.name}
              </Link>
            </Button>
          </div>
        ))}
      </SectionContainer>
    </MainContainer>
  );
};

export default ViewCompaniesPage;
