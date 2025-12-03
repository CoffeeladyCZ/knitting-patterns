import { useGetPatterns } from "../../api/ravelry/hooks";
import { PatternCard } from "./PatternCard";

export const Patterns = () => {
  const { data, isLoading, isError, error } = useGetPatterns();

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 text-start p-4">Patterns</h1>
      <div className="flex flex-wrap gap-4 p-4">
        {data?.patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </>
  );
};
