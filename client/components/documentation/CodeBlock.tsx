"use client";
import { usePreferredColorScheme } from "@/hooks/usePreferredColorScheme";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomOneDark,
  lightfair,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language?: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "javascript",
  children,
}) => {
  const scheme = usePreferredColorScheme();
  const theme = scheme === "dark" ? oneDark : oneLight;

  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      customStyle={{}}
      showLineNumbers={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
