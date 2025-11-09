import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      slug: "welcome",
      title: "Chào mừng đến với Learn ML Visual",
      description: "Bài viết đầu tiên giới thiệu về blog và cách sử dụng MDX với React components.",
      date: "2025-11-09",
    },
    // Thêm các bài blog khác ở đây
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Tất cả bài viết</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {post.description}
            </p>
            <time className="text-sm text-gray-500 dark:text-gray-500">
              {new Date(post.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}

