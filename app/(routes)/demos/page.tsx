"use client";
import { demos } from "@/app/demos";
import { DemoCard } from "@/components/demo-card";
import {
  Content,
  ContentVariants,
  Gallery,
  PageSection,
  Title,
} from "@patternfly/react-core";
import "@patternfly/react-styles/css/components/Card/card.css";

export default function Demos() {
  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="4xl">
        Demos
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a collection of demos I made while playing around with
        PatternFly React.
      </Content>
      <Gallery hasGutter>
        {demos.map((demo) => (
          <DemoCard
            key={demo.title}
            title={demo.title}
            description={demo.description}
            link={demo.link}
          />
        ))}
      </Gallery>
    </PageSection>
  );
}
