"use client";
import {
  Button,
  CalendarMonth,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
  PageSection,
  Panel,
  PanelMain,
  PanelMainBody,
  TimePicker,
  Title,
} from "@patternfly/react-core";
import { ChevronLeftIcon } from "@patternfly/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DateTimePicker() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const getTimezoneString = () => {
    return `${Intl.DateTimeFormat().resolvedOptions().timeZone} (UTC${
      new Date().getTimezoneOffset() > 0 ? "-" : "+"
    }${Math.abs(new Date().getTimezoneOffset() / 60).toString()})`;
  };

  const onTimeChange = (
    _event: React.FormEvent<HTMLInputElement>,
    time: string
  ) => {
    setTime(time);
  };

  const onDateChange = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    date: Date
  ) => {
    setDate(date);
  };

  const getDateTime = () => {
    // Split time into hours and minutes
    const [hours, minutes] = time.split(":").map((time) => parseInt(time));
    // Create new date object and set time components
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    return dateTime;
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <div>
        <Link href="/demos">
          <Button variant="control" icon={<ChevronLeftIcon />}>
            Overview
          </Button>
        </Link>
      </div>
      <Title headingLevel="h1" size="4xl">
        Groupi DateTime Picker
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a recreation of my datetime picker from Groupi using PatternFly
        React.
      </Content>
      <Flex
        alignItems={{ default: "alignItemsCenter" }}
        direction={{ default: "column" }}
        gap={{ default: "gap2xl" }}
      >
        <FlexItem fullWidth={{ default: "fullWidth" }}>
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            direction={{ default: "column" }}
            gap={{ default: "gap" }}
          >
            <FlexItem fullWidth={{ default: "fullWidth" }}>
              <Flex justifyContent={{ default: "justifyContentSpaceAround" }}>
                <FlexItem>
                  <Title headingLevel="h1" size="4xl">
                    Event Date/Time
                  </Title>
                </FlexItem>
                <FlexItem />
              </Flex>
            </FlexItem>
            <FlexItem>
              <CalendarMonth date={date} onChange={onDateChange} />
            </FlexItem>
            <FlexItem>
              <Flex
                direction={{ default: "column" }}
                alignItems={{ default: "alignItemsCenter" }}
                gap={{ default: "gapXs" }}
              >
                <FlexItem>
                  <Panel variant="bordered">
                    <TimePicker time={time} onChange={onTimeChange} />
                  </Panel>
                </FlexItem>
                <FlexItem>
                  <Content component={ContentVariants.small} isEditorial>
                    {getTimezoneString()}
                  </Content>
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              <Panel variant="secondary">
                <PanelMain>
                  <PanelMainBody>
                    <Title headingLevel="h1">
                      {getDateTime().toLocaleString([], {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </Title>
                  </PanelMainBody>
                </PanelMain>
              </Panel>
            </FlexItem>
            <FlexItem fullWidth={{ default: "fullWidth" }}>
              <Flex justifyContent={{ default: "justifyContentSpaceAround" }}>
                <FlexItem>
                  <Button icon={<ChevronLeftIcon />} variant="secondary">
                    Back
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button>Submit</Button>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </FlexItem>

        <FlexItem>
          <Flex direction={{ default: "column" }} gap={{ default: "gapLg" }}>
            <FlexItem>
              <Title headingLevel="h1">Original</Title>
            </FlexItem>
            <FlexItem>
              <Panel variant="bordered">
                <Image
                  src="/images/groupi-datetime.png"
                  width={1000}
                  height={800}
                  alt="Groupi DateTime Picker"
                />
              </Panel>
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
