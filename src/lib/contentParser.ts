import { Language } from "@/contexts/LanguageContext";

export interface ParsedContent {
  title: string;
  content: string;
  htmlContent: string;
}

export function parseContentByLanguage(
  markdownContent: string,
  language: Language
): ParsedContent {
  const lines = markdownContent.split("\n");
  const contentLines: string[] = [];
  let title = "";

  // Extract title from frontmatter or first heading
  const titleMatch = markdownContent.match(/^title:\s*["']?([^"']+)["']?/m);
  if (titleMatch) {
    title = titleMatch[1];
  }

  let inCurrentLanguageSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for section headers
    if (line.match(/^##\s*English\s*Summary/i)) {
      inCurrentLanguageSection = language === "en";
      continue;
    } else if (line.match(/^##\s*Vietnamese\s*Translation/i)) {
      inCurrentLanguageSection = language === "vi";
      continue;
    } else if (line.match(/^##\s*Real-world\s*Example/i)) {
      // Real-world examples should be shown in both languages
      inCurrentLanguageSection = true;
    } else if (line.match(/^##\s*Ví dụ thực tế/i)) {
      // Vietnamese version of real-world examples
      inCurrentLanguageSection = language === "vi";
    } else if (line.match(/^##\s*Case\s*Study/i)) {
      // Case studies should be shown in both languages
      inCurrentLanguageSection = true;
    } else if (line.match(/^##\s*Nghiên cứu tình huống/i)) {
      // Vietnamese version of case studies
      inCurrentLanguageSection = language === "vi";
    }

    // Add line to content if we're in the current language section
    if (inCurrentLanguageSection && line.trim() !== "") {
      contentLines.push(line);
    }
  }

  // If no specific language sections found, return the original content
  if (contentLines.length === 0) {
    return {
      title,
      content: markdownContent,
      htmlContent: markdownContent,
    };
  }

  // Join the content lines and clean up
  let content = contentLines.join("\n");

  // Remove any remaining section headers that might have been included
  content = content.replace(
    /^##\s*(English Summary|Vietnamese Translation|Real-world Example|Ví dụ thực tế|Case Study|Nghiên cứu tình huống).*$/gim,
    ""
  );

  // Clean up multiple empty lines
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

  // Trim whitespace
  content = content.trim();

  return {
    title,
    content,
    htmlContent: content, // This will be processed by remark later
  };
}

export function getLanguageSpecificTitle(title: string): string {
  // For now, return the original title
  // In the future, you could have separate titles for each language
  return title;
}
