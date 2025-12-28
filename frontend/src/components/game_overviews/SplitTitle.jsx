export default function SplitTitle ({ title }) {
  const splitIx = title.indexOf(":");
  if (splitIx !== -1) {
    return (
      <>
        <p className="text-uppercase fw-bold mb-1 lh-1">{title.substring(0, splitIx + 1)}</p>
        <p className="text-uppercase fw-bold mb-1 lh-1 small">{title.substring(splitIx + 1).trim()}</p>
      </>
    );
  } else {
    return (
      <>
        <p className="text-uppercase fw-bold mb-1 lh-1">{title}</p>
      </>
    );
  }
}