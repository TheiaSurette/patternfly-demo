"use client";
import {
  Avatar,
  Card,
  CardBody,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
  PageSection,
  Panel,
  PanelFooter,
  PanelMain,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <PageSection hasBodyWrapper={false}>
      <Flex alignItems={{ default: "alignItemsCenter" }}>
        <FlexItem>
          <Avatar
            style={{ objectFit: "cover", objectPosition: "top" }}
            size="xl"
            src="/images/theia.jpg"
            alt="Theia"
          />
        </FlexItem>
        <FlexItem>
          <Title headingLevel="h1" size="4xl">
            Hi! I&apos;m{" "}
            <Link target="_blank" href="https://tsurette.com">
              Theia.
            </Link>{" "}
            <span>(she/they)</span>
          </Title>
        </FlexItem>
      </Flex>

      <Content component={ContentVariants.p} isEditorial>
        I&apos;m a full-stack engineer with a passion for designing and building
        accessible, user-friendly applications that solve real-world problems.
      </Content>

      <Card>
        <CardBody>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem>
              <Image
                src="/images/groupi.png"
                width={250}
                height={250}
                alt="Groupi"
              />
            </FlexItem>
            <FlexItem flex={{ default: "flex_1" }}>
              <Content component={ContentVariants.p} isEditorial>
                A great example of this is my app{" "}
                <Link target="_blank" href="https://groupi.gg">
                  Groupi
                </Link>
                , which helps people plan events with friends. I built it from
                the ground up to be as frictionless as possible, using Next.js,
                TypeScript, and a number of other technologies.
              </Content>
            </FlexItem>
          </Flex>
        </CardBody>
      </Card>
      <Flex alignItems={{ default: "alignItemsFlexStart" }}>
        <FlexItem>
          <Title headingLevel="h3">
            When I&apos;m not coding, I have a number of hobbies that keep me
            busy, like:
          </Title>
          <Content component={ContentVariants.ul} isEditorial>
            <li>Rock Climbing</li>
            <li>Rollerskating</li>
            <li>Making Music</li>
            <li>Dungeons & Dragons</li>
            <li>Video Games</li>
            <li>LGBTQ+ Advocacy</li>
          </Content>
        </FlexItem>
        <FlexItem>
          <Panel variant="raised">
            <PanelMain>
              <Image
                style={{ borderRadius: "6px 6px 0 0" }}
                objectFit="cover"
                objectPosition="center"
                src="/images/skate.gif"
                width={360}
                height={360}
                alt="Rollerskating"
              />
            </PanelMain>
            <PanelFooter>Skating at Bruised Boutique in Nashua, NH</PanelFooter>
          </Panel>
        </FlexItem>
      </Flex>

      <Title headingLevel="h3">I also have 2 cats. Their names are:</Title>
      <Split hasGutter>
        <SplitItem>
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            direction={{ default: "column" }}
          >
            <FlexItem>
              <Title headingLevel="h3">Television</Title>
            </FlexItem>
            <FlexItem>
              <Avatar
                style={{ objectFit: "cover", objectPosition: "center" }}
                size="xl"
                src="/images/television.jpg"
                alt="Television"
              />
            </FlexItem>
          </Flex>
        </SplitItem>
        <SplitItem>
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            direction={{ default: "column" }}
          >
            <FlexItem>
              <Title headingLevel="h3">Radio</Title>
            </FlexItem>
            <FlexItem>
              <Avatar
                style={{ objectFit: "cover", objectPosition: "center" }}
                size="xl"
                src="/images/radio.jpg"
                alt="Radio"
              />
            </FlexItem>
          </Flex>
        </SplitItem>
      </Split>
    </PageSection>
  );
}
