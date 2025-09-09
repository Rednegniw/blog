# Claude Development Notes

## Project Configuration

- **Package Manager**: This project uses `bun` (not npm/pnpm/yarn)
  - Use `bunx` for running packages
  - Use `bun install` for dependencies
  - Use `bunx shadcn@latest add <component>` for shadcn components

## Build Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build

## Notes

- Astro-based blog with React components
- Uses Tailwind CSS for styling
- shadcn/ui components available