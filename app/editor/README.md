# MDX Editor

A powerful side-by-side markdown editor for creating blog posts with live preview, AI-powered content generation, and React Flow visualizations.

## Features

### ✨ Core Features

- **Split-Panel Editor**: Resizable Monaco editor and live MDX preview side-by-side
- **Live Preview**: Real-time MDX compilation with existing blog components
- **Syntax Highlighting**: Full MDX syntax support with Monaco editor
- **Dark Mode**: Automatic dark mode support matching your system preferences

### 🤖 AI Content Generation

- **AI Prompt Panel**: Customizable prompt templates for content generation
- **Visualization Types**: Pre-built templates for:
  - Reasoning Flow diagrams
  - Comparison visualizations
  - Workflow diagrams
  - Architecture diagrams
  - Timeline visualizations
- **React Flow Integration**: Auto-generates interactive React Flow components
- **Smart Templates**: Context-aware content generation based on visualization type

### 💾 Publishing & Export

- **Download MDX Files**: Export your content with proper frontmatter
- **Metadata Management**: Structured metadata form (title, date, author, description, tags)
- **Slug Management**: Easy URL-friendly slug configuration

## Usage

### Setup

1. **Configure WebSocket Port (Optional)**

   Copy the environment configuration:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` if needed (default port is 3001):
   ```env
   WS_PORT=3001
   NEXT_PUBLIC_WS_PORT=3001
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   # Open http://localhost:3000/editor
   ```

### Accessing the Editor

Navigate to `/editor` in your development server at `http://localhost:3000/editor`

### Creating a New Post

1. Enter a URL-friendly slug (e.g., `my-new-post`)
2. Edit content in the left panel
3. See live preview in the right panel
4. Click "Metadata" to add post information
5. Click "Save Draft" to download the MDX file

### Using AI Generation

1. Click "AI Content Generator" to expand the panel
2. Select a visualization type or use custom
3. Modify the prompt template if needed
4. Click "Generate Content"
5. AI-generated content with React Flow visualization will be inserted

### Publishing Workflow

#### Development Mode (Recommended)
1. Create your content in the editor
2. Download the MDX file using "Save Draft"
3. Manually place the file in `app/blog/{slug}/page.mdx`
4. Commit and push with git

#### Production Note
The editor works in static export mode, so "Publish" will download the file rather than auto-commit to git. For automatic git publishing, you would need to:
- Run a local development server with API routes
- Use the server actions in `app/editor/actions.ts`
- Disable static export in `next.config.mjs`

## Architecture

```
/app/editor/
├── page.tsx                    # Main editor page
├── components/
│   ├── EditorPanel.tsx        # Monaco code editor
│   ├── PreviewPanel.tsx       # Live MDX preview
│   ├── AIPromptPanel.tsx      # AI generation controls
│   └── PublishControls.tsx    # Save/publish UI
├── lib/
│   └── client-actions.ts      # Client-side utilities
├── actions.ts                 # Server actions (for dev server)
└── utils/
    └── mdx-compiler.ts        # MDX compilation utilities
```

## Component Details

### EditorPanel
- **Monaco Editor** with MDX syntax highlighting
- Auto-formatting and word wrap
- Line numbers and code folding
- Full keyboard shortcuts

### PreviewPanel
- Runtime MDX compilation using `@mdx-js/mdx`
- Reuses existing blog components from `mdx-components.tsx`
- Error display for compilation issues
- Debounced updates (500ms) for performance

### AIPromptPanel
- Expandable bottom panel
- Template selection dropdown
- Customizable prompt textarea
- Generate button with loading state
- Built-in visualization templates

### PublishControls
- Slug input with validation
- Metadata form (collapsible)
- Save Draft button (downloads file)
- Publish button (downloads with message)
- Status indicators

## Customization

### Adding New Visualization Templates

Edit `app/editor/lib/client-actions.ts` and add to `visualizationTemplates`:

```typescript
'my-custom-viz': `
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

export function MyCustomVisualization() {
  // Your React Flow component
}

<MyCustomVisualization />
`
```

### Changing Default Prompt

Edit the `DEFAULT_PROMPT` constant in `app/editor/components/AIPromptPanel.tsx`

### Modifying Editor Theme

Change Monaco theme in `app/editor/components/EditorPanel.tsx`:

```typescript
theme="vs-dark"  // Options: vs-dark, vs-light, hc-black
```

## Technical Notes

### Static Export Limitation
- The project uses Next.js static export for GitHub Pages
- Server Actions are not available in static export
- Files are downloaded instead of saved directly
- For full git integration, run in development mode

### Dependencies
- `@monaco-editor/react`: Code editor
- `react-resizable-panels`: Split-panel layout
- `gray-matter`: Frontmatter parsing
- `@mdx-js/mdx`: Runtime MDX compilation

### Performance
- Preview compilation is debounced (500ms delay)
- Monaco editor uses automatic layout
- React Flow components are lazy-loaded
- Optimized for files up to 10,000 lines

## Troubleshooting

### Preview Not Updating
- Check for MDX syntax errors in the preview panel
- Ensure React components are properly imported
- Wait for debounce delay (500ms)

### Editor Not Loading
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`

### Build Errors
- Verify no Server Actions are used in production build
- Check that all imports are client-compatible
- Run `npm run build` to test

## Future Enhancements

Potential improvements for future versions:

1. **File Management**
   - Browse existing blog posts
   - Load and edit existing posts
   - File tree navigation

2. **Advanced AI Features**
   - Real Claude API integration
   - Context-aware suggestions
   - Auto-improvement of existing content

3. **Git Integration**
   - Development mode git operations
   - Automatic commit messages
   - Branch management

4. **Collaboration**
   - Multiple cursors
   - Comments and annotations
   - Version history

5. **Enhanced Preview**
   - Mobile device preview
   - Different theme previews
   - Accessibility checker

## License

Part of the learn-ml-visual project.
