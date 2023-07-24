import { ArticleData, SnippetData, CardData } from "@/types/data";

export const articleDataDummy: ArticleData = {
  _id: "1",
  createdAt: new Date(2023, 6, 20),
  title: "AI quiz: Can you tell which person is real?",
  type: "article",
  wordCount: 1000,
  description:
    "How much do you know about Artificial Intelligence? As the technology rapidly advances, test your knowledge of how AI affects life now and its possible impacts in the near future.",
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  tags: [
    { _id: "1", name: "AI" },
    { _id: "2", name: "Technology" },
  ],
  thumbnailImage: undefined,
  updatedAt: new Date(2023, 6, 20),
};

export const snippetDataDummy: SnippetData = {
  _id: "1",
  createdAt: new Date(2023, 6, 20),
  title: "AI quiz: Can you tell which person is real?",
  type: "snippet",
  wordCount: 1000,
  description:
    "How much do you know about Artificial Intelligence? As the technology rapidly advances, test your knowledge of how AI affects life now and its possible impacts in the near future.",
  content:
    "# This is a snippet\n```js\nconst a = 1;\nconst b = 2;\nconst c = a + b;\n```\n```js\nconst a = 1;\nconst b = 2;\nconst c = a + b;\n```\n```js\nconst a = 1;\nconst b = 2;\nconst c = a + b;\n```\n```js\nconst a = 1;\nconst b = 2;\nconst c = a + b;\n```",
  tags: [
    { _id: "1", name: "AI" },
    { _id: "2", name: "Technology" },
  ],
  thumbnailImage: undefined,
  updatedAt: new Date(2023, 6, 20),
};

export const cardDataDummy: CardData = {
  _id: "1",
  createdAt: new Date(2023, 6, 20),
  title: "AI quiz: Can you tell which person is real?",
  type: "article",
  wordCount: 1000,
  description:
    "How much do you know about Artificial Intelligence? As the technology rapidly advances, test your knowledge of how AI affects life now and its possible impacts in the near future.",
  thumbnailImage: undefined,
  updatedAt: new Date(2023, 6, 20),
};
