export interface DemoCardProps {
  title: string;
  description: string;
  link: string;
}
export const demos: DemoCardProps[] = [
  {
    title: "Groupi DateTime Picker",
    description:
      "This is a recreation of my datetime picker from Groupi using PatternFly React.",
    link: "/demos/datetime-picker",
  },
  {
    title: "Chatbot",
    description:
      "This is a chatbot I made to show off the capabilities of PatternFly AI",
    link: "/demos/chatbot",
  },
  {
    title: "Tic-Tac-Toe",
    description: "This is a recreation of the classic game Tic-Tac-Toe.",
    link: "/demos/tic-tac-toe",
  },
  {
    title: "Store Page",
    description: "This is a mock e-commerce store page.",
    link: "/demos/store-page",
  },
];
