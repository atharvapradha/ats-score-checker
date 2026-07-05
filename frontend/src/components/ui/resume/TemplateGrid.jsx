const TemplateGrid = ({
  templates,
  recommendedTemplates,
  onSelectTemplate
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((t) => {
        const isRecommended = recommendedTemplates.some(
          (r) => r.id === t.id
        );

        return (
          <div
            key={t.id}
            onClick={() => onSelectTemplate(t)}
            className={`cursor-pointer bg-card rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden
            ${isRecommended ? "ring-2 ring-primary" : ""}`}
          >
            {/* Template Preview */}
            <img
              src={t.image}
              alt={t.name}
              className="rounded-t-xl h-96 w-full object-cover"
            />

            {/* Template Details */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {t.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {t.category}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    isRecommended
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                  }`}
              >
                {isRecommended ? "Recommended" : "Template"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateGrid;