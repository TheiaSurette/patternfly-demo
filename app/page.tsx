"use client";
import {
  Content,
  ContentVariants,
  PageSection,
  Title,
} from "@patternfly/react-core";
import Link from "next/link";

export default function Home() {
  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="4xl">
        Hi there!
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a demo app I put together to get familiar with the PatternFly
        design system.
      </Content>
      <Content component={ContentVariants.p} isEditorial>
        It's built with Next.js and PatternFly React. You can find the source
        code{" "}
        <Link href="https://github.com/TheiaSurette/patternfly-demo">here</Link>
      </Content>
      <Content component={ContentVariants.p} isEditorial>
        I have included a few demo pages to show off some various components. I
        hope you enjoy!
      </Content>
    </PageSection>
  );
}
