"use client";
import { IStoreItem, StoreItem } from "@/components/store-item";
import {
  Button,
  Content,
  ContentVariants,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemRow,
  Gallery,
  Modal,
  ModalBody,
  ModalHeader,
  NumberInput,
  PageSection,
  SearchInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import { ShoppingCartIcon, TrashIcon } from "@patternfly/react-icons";
import { useState, useEffect } from "react";
import { getRandomLorem } from "@/actions/lorem";

export default function StorePage() {
  const [storeItems, setStoreItems] = useState<IStoreItem[]>([]);
  const [cart, setCart] = useState<IStoreItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const lorem = (await getRandomLorem())[0].split(" ");
      const items: IStoreItem[] = [];
      for (const _ of Array.from({ length: 15 })) {
        const index = Math.floor(Math.random() * lorem.length - 15);
        items.push({
          name:
            lorem[Math.floor(Math.random() * lorem.length)] +
            " " +
            lorem[Math.floor(Math.random() * lorem.length)],
          description: lorem
            .slice(index >= 0 ? index : 0, index >= 0 ? index + 15 : 15)
            .join(" "),
          price: Math.floor(Math.random() * 100) + 1,
          quantity: 1,
          image: `https://picsum.photos/200/300?random=${Math.random() * 100}`,
        });
      }
      setStoreItems(items);
    };
    fetchItems();
  }, []);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart = (item: IStoreItem) => {
    if (cart.find((cartItem) => cartItem.name === item.name)) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="4xl">
        Store Page
      </Title>
      <Content component={ContentVariants.p} isEditorial>
        This is a mock e-commerce store page.
      </Content>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput />
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={handleModalToggle} icon={<ShoppingCartIcon />}>
              Cart{" "}
              {cart.length > 0
                ? `(${cart.reduce(
                    (acc, item) => acc + (item.quantity || 1),
                    0
                  )})`
                : ""}
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <ModalHeader>
          <Flex
            direction={{ default: "row" }}
            alignItems={{ default: "center" }}
            gap={{ default: "gapLg" }}
          >
            <FlexItem>
              <Title headingLevel="h1" size="2xl">
                Cart
              </Title>
            </FlexItem>
            <FlexItem>
              <Button
                onClick={() => {
                  setCart([]);
                }}
                icon={<TrashIcon />}
                variant="danger"
              >
                Clear Cart
              </Button>
            </FlexItem>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {cart.length > 0 ? (
            <div>
              <DataList style={{ margin: "2rem 0" }} aria-label="Cart">
                {cart.map((item) => (
                  <DataListItem key={item.name}>
                    <DataListItemRow>
                      <DataListCell>
                        <Title headingLevel="h2" size="xl">
                          {item.name}
                        </Title>
                      </DataListCell>
                      <DataListCell>
                        <NumberInput
                          value={item.quantity}
                          onPlus={() => {
                            setCart(
                              cart.map((cartItem) =>
                                cartItem.name === item.name
                                  ? {
                                      ...cartItem,
                                      quantity: (cartItem.quantity || 1) + 1,
                                    }
                                  : cartItem
                              )
                            );
                          }}
                          onMinus={() => {
                            if (item.quantity === 1) {
                              setCart(
                                cart.filter(
                                  (cartItem) => cartItem.name !== item.name
                                )
                              );
                            } else {
                              setCart(
                                cart.map((cartItem) =>
                                  cartItem.name === item.name
                                    ? {
                                        ...cartItem,
                                        quantity: (cartItem.quantity || 1) - 1,
                                      }
                                    : cartItem
                                )
                              );
                            }
                          }}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const quantity = parseInt(target.value);
                            if (quantity < 1) {
                              setCart(
                                cart.filter(
                                  (cartItem) => cartItem.name !== item.name
                                )
                              );
                            } else {
                              setCart(
                                cart.map((cartItem) =>
                                  cartItem.name === item.name
                                    ? {
                                        ...cartItem,
                                        quantity: quantity,
                                      }
                                    : cartItem
                                )
                              );
                            }
                          }}
                        >
                          Quantity
                        </NumberInput>
                      </DataListCell>
                      <DataListCell alignRight>
                        <Title headingLevel="h3" size="lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Title>
                      </DataListCell>
                    </DataListItemRow>
                  </DataListItem>
                ))}
              </DataList>
              <Flex
                direction={{ default: "column" }}
                alignItems={{ default: "alignItemsFlexEnd" }}
              >
                <FlexItem>
                  <Title headingLevel="h2" size="xl">
                    Total: $
                    {cart
                      .reduce(
                        (acc, item) => acc + item.price * (item.quantity || 1),
                        0
                      )
                      .toFixed(2)}
                  </Title>
                </FlexItem>
                <FlexItem>
                  <Button>Checkout</Button>
                </FlexItem>
              </Flex>
            </div>
          ) : (
            <Title headingLevel="h2" size="xl">
              Your cart is empty.
            </Title>
          )}
        </ModalBody>
      </Modal>
      <Gallery hasGutter>
        {storeItems.map((item, index) => (
          <StoreItem
            item={item}
            key={index}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </Gallery>
    </PageSection>
  );
}
