import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "Demo",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "AI",
      icon: "lightbulb",
      prefix: "ai/",
      children: [
        "ml knowledge/",
        "nlp/",
        "whisper/",
        "tts/",
        "yolo/",
        "application/",
      ],
    },
    // "intro",
    // {
    //   text: "Slides",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/guide/content/revealjs/demo.html",
    // },
  ],

  "/others/": "structure",

  "/ai/": "structure",

});
