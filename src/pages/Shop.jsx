import { useParams } from "react-router-dom";
import bannerImg from "@/assets/shop/banner2.jpg";
import PageCover from "@/components/shared/PageCover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useMenu from "@/hooks/useMenu";
import MenuCard from "@/components/shared/MenuCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const [totalMenu, setTotalMenu] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const { category } = useParams();
  const limit = 6;
  const numberOfPages = Math.ceil(totalMenu / limit);
  const pages = [...Array(numberOfPages).keys()];
  const [menu] = useMenu(activeTab, currentPage, limit);

  const categories = ["All", "Salad", "Pizza", "Soup", "Dessert", "Drinks"];

  useEffect(() => {
    setCurrentPage(0);
    axiosSecure
      .get(`/menu/count/${activeTab}`)
      .then((res) => setTotalMenu(res.data.data));
  }, [axiosSecure, activeTab]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  console.log(menu);

  return (
    <main>
      <title>Bistro Boss | Shop</title>
      <PageCover
        heading={"OUR SHOP"}
        subHeading={"Would you like to try a dish?"}
        img={bannerImg}
      />
      <section>
        <div className="container py-32">
          <Tabs
            defaultValue={category}
            className="text-center"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-12">
              {categories.map((item, idx) => (
                <TabsTrigger
                  key={idx}
                  className="cursor-pointer"
                  value={item.toLocaleLowerCase()}
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((item, idx) => (
              <TabsContent key={idx} value={item.toLocaleLowerCase()}>
                <div className="grid grid-cols-3 gap-6">
                  {menu.map((food) => (
                    <MenuCard key={food._id} food={food} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={currentPage === 0}
                    onClick={handlePrev}
                    className="cursor-pointer"
                  />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    disabled={currentPage === pages.length - 1}
                    onClick={handleNext}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
