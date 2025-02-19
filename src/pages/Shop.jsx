import { useParams } from "react-router-dom";
import bannerImg from "@/assets/shop/banner2.jpg";
import PageCover from "@/components/shared/PageCover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import useMenu from "@/hooks/useMenu";
import MenuCard from "@/components/shared/MenuCard";

const Shop = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { category } = useParams();
  const [menu] = useMenu();

  const categories = ["Salad", "Pizza", "Soup", "Dessert", "Drinks"];
  const categorizedMenu = menu.filter((menuItem) => {
    if (activeTab === "all") return menuItem;
    else {
      return menuItem.category === activeTab;
    }
  });

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
              <TabsTrigger className="cursor-pointer" value="all">
                All
              </TabsTrigger>
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

            <TabsContent value="all">
              <div className="grid grid-cols-3 gap-6">
                {menu.map((food) => (
                  <MenuCard key={food._id} food={food} />
                ))}
              </div>
            </TabsContent>

            {categories.map((item, idx) => (
              <TabsContent key={idx} value={item.toLocaleLowerCase()}>
                <div className="grid grid-cols-3 gap-6">
                  {categorizedMenu.map((food) => (
                    <MenuCard key={food._id} food={food} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Shop;
