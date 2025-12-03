import { Card } from "../component-library/Card";
import type { Pattern } from "../../api/ravelry/types";
import { Badge } from "../component-library/Badge";

export const PatternCard = ({ pattern }: { pattern: Pattern }) => {
  return (
    <Card className="bg-orange/50 hover:bg-orange/70 gap-2 border-orange/50">
      <Badge
        variant={pattern.free ? "primary" : "secondary"}
        size="sm"
        className="self-end"
      >
        {pattern.free ? "Free" : "Paid"}
      </Badge>
      <Card.Header>
        <Card.Header.Title>{pattern.name}</Card.Header.Title>
        <Card.Content className="flex flex-col gap-2">
          <img
            src={pattern.first_photo?.small_url}
            alt={pattern.name}
            className="w-full h-48 object-cover"
          />
          <p>Designer: {pattern.designer?.name}</p>
        </Card.Content>
      </Card.Header>
    </Card>
  );
};
