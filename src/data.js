// src/data.js
// Stores in-memoery data collections and provides a reset function so route and tests share consistent state.

// An array of posts
export let posts = [
  { id: 1, title: "Hello World", author: "Alice" },
  { id: 2, title: "Express API", author: "Bob" },
];

// An array of comments
export let comments = [
  { id: 1, postId: 1, text: "Nice post!" },
  { id: 2, postId: 1, text: "Thanks for sharing." },
  { id: 3, postId: 2, text: "Express is awesome." },
];

// A function to reset the posts array
export function resetPosts() {
  posts = [
    { id: 1, title: "Hello World", author: "Alice" },
    { id: 2, title: "Express API", author: "Bob" },
  ];
}

// An array of items
// A Simple in-memory data store for items. In a real application
let items = [
  { id: 1, name: "notebook" },
  { id: 2, name: "pen" },
  { id: 3, name: "ruler" },
  { id: 4, name: "eraser" },
];

export default items;
