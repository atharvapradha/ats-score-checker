export default function KeywordList({
  title,
  keywords = [],
  type = "matched"
}) {
  const isMatched = type === "matched";

  return (
    <div className="bg-gray-800 rounded-xl p-4 w-full max-w-xl">
      {/* Title */}
      <h3
        className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
          isMatched ? "text-green-400" : "text-red-400"
        }`}
      >
        {isMatched ? "✅" : "❌"} {title}
      </h3>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
        {keywords.length > 0 ? (
          keywords.map((word, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-sm rounded-full border
                ${
                  isMatched
                    ? "bg-green-600/20 text-green-300 border-green-500"
                    : "bg-red-600/20 text-red-300 border-red-500"
                }`}
            >
              {word}
            </span>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No keywords found</p>
        )}
      </div>
    </div>
  );
}
