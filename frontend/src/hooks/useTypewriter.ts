import { useEffect, useState } from "react";

export function useTypewriter(words: string[], typingSpeed = 65, pause = 1700) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, pause]);

  return words[index].substring(0, subIndex);
}
