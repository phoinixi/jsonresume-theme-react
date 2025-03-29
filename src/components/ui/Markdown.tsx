import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

interface MarkdownProps {
  content?: string;
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  if (!content) return null;

  return (
    <div className={cn('markdown', className)} role="contentinfo" aria-label="Markdown content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};
