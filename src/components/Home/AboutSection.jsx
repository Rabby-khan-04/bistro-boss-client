import aboutImg from "@/assets/home/chef-service.jpg";

const AboutSection = () => {
  return (
    <section>
      <div
        style={{ backgroundImage: `url(${aboutImg})` }}
        className="container py-32 px-28 bg-fixed bg-cover bg-center bg-no-repeat"
      >
        <div className="bg-white py-24 px-40 text-center">
          <h2 className="font-cinzel text-5xl font-medium text-neutral">
            Bistro Boss
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, libero accusamus laborum deserunt ratione dolor
            officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
            nihil iusto ducimus incidunt quibusdam nemo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
