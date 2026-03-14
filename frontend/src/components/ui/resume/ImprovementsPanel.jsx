const ImprovementsPanel = ({ improvements }) => {
  return (
    <div className="bg-card p-6 rounded-xl">
      <h3 className="font-semibold mb-3">Improvements</h3>
      <ul className="list-disc list-inside text-muted-foreground">
        {improvements.map((i, idx) => <li key={idx}>{i}</li>)}
      </ul>
    </div>
  );
};

export default ImprovementsPanel;