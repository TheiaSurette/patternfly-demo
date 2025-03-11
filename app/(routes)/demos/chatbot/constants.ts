export const logoAvatar = "/images/logo-small.svg";
export const userAvatar = "/images/user.svg";

export const welcomePrompts = [
  {
    title: "Easter Cookie Recipe",
    message: "Come up with a fun, easy cookie recipe I can use for Easter.",
  },
  {
    title: "Red Hat Interview Tips",
    message: "What are some tips for acing an interview at Red Hat?",
  },
];

export const initialConversations = {
  Today: [{ id: "1", text: "New Conversation" }],
  "This month": [
    {
      id: "2",
      text: "Enterprise Linux installation and setup",
    },
    { id: "3", text: "Troubleshoot system crash" },
  ],
  March: [
    { id: "4", text: "Ansible security and updates" },
    { id: "5", text: "Red Hat certification" },
    { id: "6", text: "Lightspeed user documentation" },
  ],
  February: [
    { id: "7", text: "Crashing pod assistance" },
    { id: "8", text: "OpenShift AI pipelines" },
    { id: "9", text: "Updating subscription plan" },
    { id: "10", text: "Red Hat licensing options" },
  ],
  January: [
    { id: "11", text: "RHEL system performance" },
    { id: "12", text: "Manage user accounts" },
  ],
};

export const footnoteProps = {
  label: "Lightspeed uses AI. Check for mistakes.",
  popover: {
    title: "Verify accuracy",
    description: `While Lightspeed strives for accuracy, there's always a possibility of errors. It's a good practice to verify critical information from reliable sources, especially if it's crucial for decision-making or actions.`,
    bannerImage: {
      src: "https://cdn.dribbble.com/userupload/10651749/file/original-8a07b8e39d9e8bf002358c66fce1223e.gif",
      alt: "Example image for footnote popover",
    },
    cta: {
      label: "Got it",
      onClick: () => {
        alert("Do something!");
      },
    },
    link: {
      label: "Learn more",
      url: "https://www.redhat.com/",
    },
  },
};
