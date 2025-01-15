import { MainContainer, SectionContainer } from "@/styles/style";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Item {
  _id: string;
  [key: string]: string;
}

interface AdminViewPageProps {
  items: Item[];
  href: string;
  hrefKey: string;
  name: string;
}

const AdminViewPage = ({ items, href, hrefKey, name }: AdminViewPageProps) => {
  return (
    <MainContainer className="p-4">
      <SectionContainer className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage {name}</h2>
          <Button
            asChild
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            <Link href={`${href}/create`}>Create {name}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
              >
                <h3 className="text-lg font-medium mb-2">{item[hrefKey]}</h3>
                {/* Additional item details can be shown here */}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    asChild
                    className="flex items-center space-x-1 border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50"
                  >
                    <Link href={`${href}/${item[hrefKey]}`}>
                      <span>Edit</span>
                    </Link>
                  </Button>
                  <Button className="flex items-center space-x-1 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50">
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No {name.toLowerCase()} available.</p>
          )}
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default AdminViewPage;
