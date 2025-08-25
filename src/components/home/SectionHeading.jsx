export default function SectionHeading  ({ title, subtitle, description, center = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-bold text-darktext mb-4">
        {title}
      </h2>
      {subtitle && (
        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">
          {subtitle}
        </h3>
      )}
      {description && (
        <p className="text-lg text-lighttext max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

