import PageCover from "@/components/shared/PageCover";
import bannerImg from "@/assets/menu/banner3.jpg";
import desertImg from "@/assets/menu/dessert-bg.jpeg";
import pizzaImg from "@/assets/menu/pizza-bg.jpg";
import saladImg from "@/assets/menu/salad-bg.jpg";
import soupImg from "@/assets/menu/soup-bg.jpg";
import OfferedCategory from "@/components/Menu/OfferedCategory";
import MenuCategory from "@/components/Menu/MenuCategory";
import useMenu from "@/hooks/useMenu";

const Menu = () => {
  const [menu] = useMenu();

  const desert = menu.filter((menuItem) => menuItem.category === "dessert");
  const pizza = menu.filter((menuItem) => menuItem.category === "pizza");
  const salad = menu.filter((menuItem) => menuItem.category === "salad");
  const soup = menu.filter((menuItem) => menuItem.category === "soup");
  const offered = menu.filter((menuItem) => menuItem.category === "offered");

  const allMenuDetails = [
    {
      menu: desert,
      heading: "Dessert",
      img: desertImg,
      subHeading:
        "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      menu: pizza,
      heading: "Pizza",
      img: pizzaImg,
      subHeading:
        "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      menu: soup,
      heading: "Soup",
      img: soupImg,
      subHeading:
        "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      menu: salad,
      heading: "Salad",
      img: saladImg,
      subHeading:
        "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    <main>
      <title>Bistro Boss | Menu</title>
      <PageCover
        img={bannerImg}
        heading={"OUR MENU"}
        subHeading={"Would you like to try a dish?"}
      />

      <OfferedCategory offered={offered} />
      {allMenuDetails.map((menuDetails, idx) => (
        <MenuCategory
          key={idx}
          menu={menuDetails.menu}
          heading={menuDetails.heading}
          subHeading={menuDetails.subHeading}
          img={menuDetails.img}
        />
      ))}
    </main>
  );
};

export default Menu;
