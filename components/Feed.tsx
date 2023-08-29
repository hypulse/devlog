const FEED: React.FC<FeedProps> = ({
  _id,
  title,
  summary,
  wordCount,
  content,
  state,
  createdAt,
  updatedAt,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e1e4e8",
        borderRadius: "10px",
        padding: "16px",
        transition: "background-color 0.3s",
        cursor: "pointer",
        marginBottom: "20px",
        ":hover": {
          backgroundColor: "#f6f8fa",
        },
      }}
    >
      {/* Post Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>{title}</h2>
        <span style={{ fontSize: "12px", color: "#586069" }}>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Content Preview */}
      {summary && (
        <p style={{ marginTop: "10px", color: "#586069" }}>{summary}</p>
      )}
      {content && (
        <pre
          style={{
            marginTop: "10px",
            backgroundColor: "#f6f8fa",
            padding: "10px",
            borderRadius: "5px",
            overflowX: "auto",
          }}
        >
          <code>{content}</code>
        </pre>
      )}

      {/* Footer Info */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "#586069",
        }}
      >
        {wordCount && <span>{wordCount} words</span>}
        <div>
          {state === "draft" && (
            <span style={{ color: "#ffc107", marginRight: "10px" }}>Draft</span>
          )}
          {state === "published" && (
            <span style={{ color: "#28a745" }}>Published</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FEED;
