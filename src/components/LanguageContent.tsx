"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { parseContentByLanguage } from "@/lib/contentParser";
import { useEffect, useState } from "react";

interface LanguageContentProps {
  markdownContent: string;
  title: string;
}

export default function LanguageContent({
  markdownContent,
}: LanguageContentProps) {
  const { language } = useLanguage();
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const processContent = () => {
      const parsedContent = parseContentByLanguage(markdownContent, language);

      // Simple markdown to HTML conversion for client-side
      let html = parsedContent.content
        // Headers
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        // Bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Lists
        .replace(/^\* (.*$)/gim, "<li>$1</li>")
        .replace(/^- (.*$)/gim, "<li>$1</li>")
        // Line breaks
        .replace(/\n/g, "<br>");

      // Wrap list items in ul tags
      html = html.replace(/(<li>.*?<\/li>)/gs, "<ul>$1</ul>");

      setHtmlContent(html);
    };

    processContent();
  }, [markdownContent, language]);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
