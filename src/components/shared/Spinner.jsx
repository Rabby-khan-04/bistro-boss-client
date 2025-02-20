const Spinner = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container">
        <h2 className="text-[200px] font-bold text-title text-center flex items-center justify-center">
          <span>L</span>
          <div className="size-40 rounded-full border-[30px] border-dashed border-secondary animate-spin"></div>
          <span>ading</span>
        </h2>
      </div>
    </section>
  );
};

export default Spinner;
