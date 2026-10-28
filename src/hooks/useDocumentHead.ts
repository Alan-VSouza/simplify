import { useEffect } from 'react';

function setMetaContent(name: string, property: boolean, content: string) {
  const attr = property ? 'property' : 'name';
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Sets per-page SEO basics (title, description, Open Graph) without pulling
 * in react-helmet for what is otherwise a handful of DOM writes.
 */
export function useDocumentHead(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} | Simplify`;
    document.title = fullTitle;
    setMetaContent('description', false, description);
    setMetaContent('og:title', true, fullTitle);
    setMetaContent('og:description', true, description);
  }, [title, description]);
}
