"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
  GalleryItem,
} from "@patternfly/react-core";
import { CartPlusIcon } from "@patternfly/react-icons";
import Image from "next/image";

export interface IStoreItem {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export function StoreItem({
  item,
  handleAddToCart,
}: {
  item: IStoreItem;
  handleAddToCart: (item: IStoreItem) => void;
}) {
  const { name, price, description } = item;
  return (
    <GalleryItem>
      <Card variant="default">
        <CardHeader>
          <Flex direction={{ default: "column" }}>
            <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
              <Image
                src={item.image}
                alt="Placeholder image"
                width={200}
                height={200}
                style={{
                  borderRadius: "5px",
                  objectFit: "cover",
                  height: "200px",
                }}
              />
            </FlexItem>
            <FlexItem>
              <CardTitle>{name}</CardTitle>
            </FlexItem>
          </Flex>
        </CardHeader>
        <CardBody
          style={{
            maxHeight: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "1rem",
          }}
        >
          {description}
        </CardBody>
        <CardFooter>
          <Flex
            direction={{ default: "row" }}
            alignItems={{ default: "alignItemsCenter" }}
            justifyContent={{ default: "justifyContentSpaceBetween" }}
          >
            <FlexItem>
              <Content component={ContentVariants.p} isEditorial>
                ${price}
              </Content>
            </FlexItem>
            <FlexItem>
              <Button
                onClick={() => {
                  handleAddToCart({
                    name,
                    price: parseFloat(price),
                    quantity: 1,
                  });
                }}
                icon={<CartPlusIcon />}
              >
                Add to Cart
              </Button>
            </FlexItem>
          </Flex>
        </CardFooter>
      </Card>
    </GalleryItem>
  );
}
