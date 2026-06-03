function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="text-center mb-20">

      <h2 className="
        text-5xl
        font-black
        gradient-text
        mb-6
      ">
        {title}
      </h2>

      <p className="
        text-gray-400
        text-lg
        max-w-3xl
        mx-auto
        leading-9
      ">
        {subtitle}
      </p>

    </div>
  );
}

export default SectionTitle;