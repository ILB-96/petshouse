import { MainContainer, SectionContainer } from "@/styles/style";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@/models/Category";

const ViewCategoriesPage = async () => {
  const categories = await Category.find();

  return (
    <MainContainer>
      <SectionContainer>
        <Button asChild>
          <Link href="/admin/categories/create">Create Category</Link>
        </Button>
        {categories.map((category) => (
          <div key={category._id}>
            <Button asChild>
              <Link href={`/admin/categories/${category.slug}`}>
                {category.slug}
              </Link>
            </Button>
          </div>
        ))}
      </SectionContainer>
    </MainContainer>
  );
};

export default ViewCategoriesPage;
