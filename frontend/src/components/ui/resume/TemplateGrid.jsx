const TemplateGrid = ({ templates, recommendedTemplates, setSelectedTemplate }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(t => {
        const isRecommended = recommendedTemplates.some(r => r.id === t.id);

        return (
          <div
            key={t.id}
            onClick={() => setSelectedTemplate(t)}
            className={`cursor-pointer bg-card rounded-xl shadow hover:-translate-y-1 transition 
            ${isRecommended ? "ring-2 ring-primary" : ""}`}
          >
            <img src={t.image} className="rounded-t-xl h-96 w-full object-cover" />

            <div className="p-4 flex justify-between">
              <h3 className="font-semibold">{t.name}</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {isRecommended ? "Recommended" : t.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateGrid;