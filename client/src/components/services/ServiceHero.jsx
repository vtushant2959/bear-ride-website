function ServiceHero({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10">

      <h1 className="text-5xl font-black mb-4">
        {title}
      </h1>

      <p className="text-xl text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}

export default ServiceHero;