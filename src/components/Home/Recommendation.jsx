import SectionTitle from "../shared/SectionTitle";
import useMenu from "@/hooks/useMenu";
import MenuCard from "../shared/MenuCard";
import Spinner from "../shared/Spinner";

const Recommendation = () => {
  const [menu, menuIsLoading] = useMenu("popular", 0, 3);

  if (menuIsLoading) return <Spinner />;
  return (
    <section className="pb-32">
      <div className="container">
        <div>
          <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"Should Try"} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {menu?.map((menuItem) => (
            <MenuCard key={menuItem._id} food={menuItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
