function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="
      bg-black
      text-white
      py-32
      text-center
    ">

      <div className="container-main px-5">

        <h1 className="
          text-5xl
          md:text-7xl
          font-black
          gradient-text
          mb-8
        ">
          {title}
        </h1>

        <p className="
          text-gray-400
          text-lg
          md:text-xl
          max-w-3xl
          mx-auto
          leading-9
        ">
          {subtitle}
        </p>

      </div>

    </section>
  );
}

export default PageBanner;