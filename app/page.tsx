import Link from "next/link";

export default function Home() {
  const posts = [
    {
      slug: "deepagent-autonomous-ai",
      title: "DeepAgent: How the New AI Agent Learns, Thinks, and Builds Its Own Tools",
      description: "Explore how DeepAgent revolutionizes AI agents through autonomous reasoning, memory folding, and tool discovery - creating truly adaptive AI systems with interactive visualizations.",
      date: "2025-11-09",
      tags: ["AI", "Machine Learning", "DeepAgent", "Reinforcement Learning", "Interactive"],
    },
    {
      slug: "mcp-code-execution",
      title: "Code Execution với MCP - Giải Pháp Cho Token Overhead của AI Agents",
      description: "Khám phá cách Code Execution với MCP giảm 98.7% token usage, từ 150,000 xuống 2,000 tokens cho complex workflows. Bao gồm interactive diagrams và so sánh chi tiết.",
      date: "2025-11-09",
      tags: ["AI Agents", "MCP", "Optimization", "Interactive"],
    },
    {
      slug: "welcome",
      title: "Chào mừng đến với Learn ML Visual",
      description: "Bài viết đầu tiên giới thiệu về blog và cách sử dụng MDX với React components.",
      date: "2025-11-09",
      tags: ["Introduction"],
    },
    // Thêm các bài blog khác ở đây
  ];

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Learn ML Visual
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Khám phá Machine Learning qua các visualization tương tác
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Bài viết mới nhất</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 mb-2">
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(post.date).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.tags && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

