import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Tag",
    icon: "book",
    link: "tag/",
  },
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Own",
        icon: "pen-to-square",
        prefix: "own/",
        children: [
          {
            text: "AI",
            icon: "pen-to-square",
            link: "ai/",
          },
        ],
      },
      {
        text: "Reference",
        icon: "pen-to-square",
        prefix: "ref/",
        children: [
          {
            text: "temp",
            icon: "pen-to-square",
            link: "ai/",
          },
        ],
      },
    ],
  },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
