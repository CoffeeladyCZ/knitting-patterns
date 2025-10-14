import { Card } from "./Card";

const patterns = [
  {
    name: "Test Pattern",
    image:
      "https://images4-f-cdn.ravelrycache.com/uploads/BebaBlanket/725912127/webp/IMG_20200531_155343_small_small2.webp#jpg",
    gaude_description: "10 stitches = 4 inches",
  },
  {
    name: "Test Pattern 2",
    image:
      "https://images4-f-cdn.ravelrycache.com/uploads/BebaBlanket/725912127/webp/IMG_20200531_155343_small_small2.webp#jpg",
    gaude_description: "10 stitches = 4 inches",
  },
  {
    name: "Test Pattern 3",
    image:
      "https://images4-f-cdn.ravelrycache.com/uploads/BebaBlanket/725912127/webp/IMG_20200531_155343_small_small2.webp#jpg",
    gaude_description: "10 stitches = 4 inches",
  },
  {
    name: "Test Pattern 4",
    image:
      "https://images4-f-cdn.ravelrycache.com/uploads/BebaBlanket/725912127/webp/IMG_20200531_155343_small_small2.webp#jpg",
    gaude_description: "10 stitches = 4 inches",
  },
];

export const Dashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Knitting Patterns</h1>
      <div className="flex flex-wrap gap-4 p-4">
        {patterns.map((pattern) => (
          <Card key={pattern.name} pattern={pattern} />
        ))}
      </div>
    </>
  );
};
