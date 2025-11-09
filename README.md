# Learn ML Visual

Blog về Machine Learning với visualizations tương tác, được xây dựng với Next.js, MDX, và deploy lên GitHub Pages.

## 🚀 Công nghệ sử dụng

- **Next.js 14** - React framework với App Router
- **MDX** - Markdown + React components
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **ReactFlow** - Interactive flow diagrams
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD automation

## 📦 Cài đặt

```bash
# Clone repository
git clone https://github.com/phanngoc/learn-ml-visual.git
cd learn-ml-visual

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 🛠️ Development

### Chạy local

```bash
npm run dev
```

### Build production

```bash
npm run build
```

Build sẽ tạo static files trong thư mục `out/`.

### Lint

```bash
npm run lint
```

## 📝 Viết bài blog mới

1. Tạo folder mới trong `app/blog/[slug]/`
2. Tạo file `page.mdx` với nội dung:

```mdx
export const metadata = {
  title: "Tiêu đề bài viết",
  description: "Mô tả ngắn",
  date: "2025-11-09",
};

# Tiêu đề bài viết

Nội dung của bạn ở đây...
```

3. Thêm bài viết vào danh sách trong `app/page.tsx`

### 🎯 Blog Posts Hiện Có

#### [Code Execution với MCP](http://localhost:3000/blog/mcp-code-execution)
Bài viết chi tiết về cách Code Execution với MCP giảm 98.7% token usage cho AI agents, từ 150,000 xuống 2,000 tokens.

**Features:**
- 📊 Interactive workflow diagrams với ReactFlow
- 🎯 So sánh Traditional vs Code Execution approach
- 💡 7 key benefits với click-to-expand cards
- 📈 Visual metrics và impact charts
- 💻 Code examples thực tế

**Interactive Components:**
- `MCPWorkflowDiagram` - Visualization của 2 workflows với tabs switching
- `BenefitsComparison` - 7 benefits với animations và comparison chart

## 🚀 Deployment

Project này tự động deploy lên GitHub Pages khi push code lên branch `main`.

### Setup GitHub Pages lần đầu

1. Vào **Settings** → **Pages**
2. Source: chọn **GitHub Actions**
3. Push code lên GitHub
4. Workflow sẽ tự động chạy và deploy

Site sẽ có địa chỉ: `https://phanngoc.github.io/learn-ml-visual`

## 📁 Cấu trúc thư mục

```
learn-ml-visual/
├── app/
│   ├── blog/
│   │   ├── mcp-code-execution/     # 🆕 Blog post về MCP
│   │   │   └── page.mdx
│   │   ├── welcome/
│   │   │   └── page.mdx
│   │   └── page.tsx
│   ├── components/                 # 🆕 Interactive React components
│   │   ├── MCPWorkflowDiagram.tsx  # ReactFlow diagram
│   │   ├── BenefitsComparison.tsx  # Benefits showcase
│   │   └── README.md               # Components documentation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── .nojekyll
├── .github/
│   └── workflows/
│       └── deploy.yml
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Tùy chỉnh

### Thêm React components vào MDX

Tạo component trong `app/components/` và import vào file MDX:

```mdx
import MyComponent from "@/app/components/MyComponent";

# Bài viết của tôi

<MyComponent />
```

**Ví dụ thực tế:**

```mdx
import MCPWorkflowDiagram from '@/app/components/MCPWorkflowDiagram';
import BenefitsComparison from '@/app/components/BenefitsComparison';

# Code Execution với MCP

<MCPWorkflowDiagram />

## Key Benefits

<BenefitsComparison />
```

### Styling

Project sử dụng Tailwind CSS. Bạn có thể:
- Thêm custom classes vào `app/globals.css`
- Cấu hình theme trong `tailwind.config.ts`

### Creating Interactive Components

Các best practices khi tạo components:
- ✅ Sử dụng `'use client'` directive cho client-side interactivity
- ✅ Support dark mode với Tailwind classes
- ✅ Implement responsive design (mobile-friendly)
- ✅ Add meaningful animations với Framer Motion
- ✅ Document component trong `app/components/README.md`

**Component template:**

```tsx
'use client';

import React, { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(false);
  
  return (
    <div className="my-8 p-6 rounded-lg bg-white dark:bg-gray-800">
      {/* Your interactive content */}
    </div>
  );
}
```

## 📄 License

MIT License - tự do sử dụng cho mục đích cá nhân và thương mại.

## 👤 Tác giả

**phanngoc**
- GitHub: [@phanngoc](https://github.com/phanngoc)

---

Built with ❤️ using Next.js and MDX

