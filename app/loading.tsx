"use client";
import { Bullseye, PageSection, Spinner } from "@patternfly/react-core";

export default function Loading() {
  return (
    <PageSection isFilled>
      <Bullseye style={{ height: "100%" }}>
        <Spinner size="xl" />
      </Bullseye>
    </PageSection>
  );
}
