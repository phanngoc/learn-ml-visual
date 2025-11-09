export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {children}
    </article>
  );
}

