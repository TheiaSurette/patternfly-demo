"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Icon,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { CloseIcon, ResourcesEmptyIcon } from "@patternfly/react-icons";
import { useState } from "react";

export default function TicTacToe() {
  const [squares, setSquares] = useState<number[]>(Array(9).fill(-1));
  const shapes = ["X", "O"];
  const turn = calculateTurn(squares);
  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `${shapes[turn]}'s turn`;

  function calculateTurn(squares: number[]): number {
    return squares.filter((square) => square !== -1).length % 2 === 0 ? 0 : 1;
  }

  function calculateWinner(squares: number[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] !== -1 &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return shapes[squares[a]];
      }
    }
    return null;
  }

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="4xl">
        Tic Tac Toe
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a recreation of the classic game Tic-Tac-Toe.
      </Content>

      <Flex
        direction={{ default: "column" }}
        gap={{ default: "gapMd" }}
        alignItems={{ default: "alignItemsCenter" }}
      >
        <FlexItem>
          <Title headingLevel="h1" size="3xl">
            {status}
          </Title>
        </FlexItem>
        <FlexItem>
          <Grid style={{ width: "300px" }} hasGutter>
            {squares.map((value, index) => (
              <GridItem key={index} span={4}>
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  isClickable
                  isDisabled={value !== -1 || winner !== null}
                  variant="default"
                >
                  <CardHeader
                    selectableActions={{
                      onClickAction: () => {
                        const newSquares = squares.slice();
                        newSquares[index] = turn;
                        setSquares(newSquares);
                      },
                    }}
                  ></CardHeader>
                  <CardBody>
                    <Flex
                      justifyContent={{ default: "justifyContentCenter" }}
                      alignItems={{ default: "alignItemsCenter" }}
                    >
                      <FlexItem>
                        {value === 0 ? (
                          <Icon iconSize="2xl">
                            <CloseIcon />
                          </Icon>
                        ) : value === 1 ? (
                          <Icon iconSize="2xl">
                            <ResourcesEmptyIcon />
                          </Icon>
                        ) : (
                          ""
                        )}
                      </FlexItem>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </FlexItem>
        <FlexItem>
          <Button
            onClick={() => {
              setSquares(Array(9).fill(-1));
            }}
            variant="danger"
          >
            Reset Game
          </Button>
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
