import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Tag",
    icon: "book",
    link: "tag/",
  },
  {
    text: "AI",
    icon: "lightbulb",
    link: "/ai/",
  },
  {
    text: "Android",
    icon: "mobile",
    link: "/android/",
  },
  {
    text: "iOS",
    icon: "mobile",
    link: "/ios/",
  },
  {
    text: "Other",
    icon: "book",
    // link: "/others/",
    children: [
              {
                text: "Python",
                link: "python/"
              },
              {
                text: "Unity",
                link: "unity/",
              },
              {
                text: "Others",
                link: "others/",
              },
            ],
  },
  // {
  //   text: "Posts",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Own",
  //       icon: "pen-to-square",
  //       prefix: "own/",
  //       children: [
  //         {
  //           text: "AI",
  //           icon: "pen-to-square",
  //           link: "ai/",
  //         },
  //         {
  //           text: "Others",
  //           icon: "pen-to-square",
  //           link: "others/",
  //         },
  //       ],
  //     },
  //     {
  //       text: "Reference",
  //       icon: "pen-to-square",
  //       prefix: "ref/",
  //       children: [
  //         {
  //           text: "temp",
  //           icon: "pen-to-square",
  //           link: "ai/",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
