const SuggestionsPanel = ({ suggestions }) => {
  return (
    <div className="bg-card p-6 rounded-xl">
      <h3 className="font-semibold mb-3">Suggestions</h3>
      <ul className="list-disc list-inside text-muted-foreground">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
};

export default SuggestionsPanel;