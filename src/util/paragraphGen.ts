import words from "./words";

export default function paragraphGen() {
  const numWords = Math.floor(Math.random() * 10) + 1;
  var paragraph = words[Math.floor(Math.random() * words.length)];
  for (let i = 1; i < numWords; i++) {
    paragraph += " " + words[Math.floor(Math.random() * words.length)];
  }

  return paragraph
}