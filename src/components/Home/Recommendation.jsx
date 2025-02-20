import SectionTitle from "../shared/SectionTitle";
import useMenu from "@/hooks/useMenu";
import MenuCard from "../shared/MenuCard";

const Recommendation = () => {
  const [menu] = useMenu("popular", 0, 3);
  return (
    <section className="pb-32">
      <div className="container">
        <div>
          <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"Should Try"} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {menu.map((menuItem) => (
            <MenuCard key={menuItem._id} food={menuItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
