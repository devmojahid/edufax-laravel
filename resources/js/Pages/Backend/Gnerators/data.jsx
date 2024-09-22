import {
  IconBrandDiscord,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGmail,
  IconBrandMedium,
  IconBrandNotion,
  IconBrandSkype,
  IconBrandSlack,
  IconBrandStripe,
  IconBrandWechat,
  IconBrandTrello,
  IconBrandWhatsapp,
  IconBrandZoom,
  IconPencilMinus,
  IconTemplate,
} from "@tabler/icons-react";

export const apps = [
  {
    name: "Ai Writer",
    logo: <IconPencilMinus />,
    connected: true,
    desc: "Create and edit documents with AI-powered writing assistance. Write better, faster, and clearer.",
    url : "/ai/writers"
  },
  {
    name: "Ai Content Template",
    logo: <IconTemplate />,
    connected: true,
    desc: "Create and edit documents with AI-powered writing assistance. Write better, faster, and clearer.",
    url : "/ai/content-templates"
  },
  {
    name: "Ai Chatbot",
    logo: <IconBrandWechat />,
    connected: true,
    desc: "Text with AI-powered chatbots and get instant responses. This chatbot is designed to help you with your queries.",
  },
  {
    name: "Figma",
    logo: <IconBrandFigma />,
    connected: true,
    desc: "View and collaborate on Figma designs in one place.",
  },
  {
    name: "Trello",
    logo: <IconBrandTrello />,
    connected: false,
    desc: "Sync Trello cards for streamlined project management.",
  },
  {
    name: "Slack",
    logo: <IconBrandSlack />,
    connected: false,
    desc: "Integrate Slack for efficient team communication",
  },
  {
    name: "Zoom",
    logo: <IconBrandZoom />,
    connected: true,
    desc: "Host Zoom meetings directly from the dashboard.",
  },
  {
    name: "Stripe",
    logo: <IconBrandStripe />,
    connected: false,
    desc: "Easily manage Stripe transactions and payments.",
  },
  {
    name: "Gmail",
    logo: <IconBrandGmail />,
    connected: true,
    desc: "Access and manage Gmail messages effortlessly.",
  },
  {
    name: "Medium",
    logo: <IconBrandMedium />,
    connected: false,
    desc: "Explore and share Medium stories on your dashboard.",
  },
  {
    name: "Skype",
    logo: <IconBrandSkype />,
    connected: false,
    desc: "Connect with Skype contacts seamlessly.",
  },
  {
    name: "Docker",
    logo: <IconBrandDocker />,
    connected: false,
    desc: "Effortlessly manage Docker containers on your dashboard.",
  },
  {
    name: "GitHub",
    logo: <IconBrandGithub />,
    connected: false,
    desc: "Streamline code management with GitHub integration.",
  },
  {
    name: "GitLab",
    logo: <IconBrandGitlab />,
    connected: false,
    desc: "Efficiently manage code projects with GitLab integration.",
  },
  {
    name: "Discord",
    logo: <IconBrandDiscord />,
    connected: false,
    desc: "Connect with Discord for seamless team communication.",
  },
  {
    name: "WhatsApp",
    logo: <IconBrandWhatsapp />,
    connected: false,
    desc: "Easily integrate WhatsApp for direct messaging.",
  },
];
