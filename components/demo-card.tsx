import { DemoCardProps } from "@/app/demos";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core";

export function DemoCard({ title, description, link }: DemoCardProps) {
  return (
    <Card isClickable variant="default">
      <CardHeader
        selectableActions={{
          to: link,
        }}
      >
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>{description}</CardBody>
    </Card>
  );
}
