# Quick Reference: Hugo Commands

## Development
```bash
# Start development server
hugo server

# Start with network access
hugo server --bind 0.0.0.0

# Start with drafts visible
hugo server -D

# Start with live reload
hugo server --disableFastRender
```

## Building
```bash
# Build for production
hugo

# Build with minification
hugo --minify

# Build drafts
hugo -D

# Clean public directory before build
hugo --cleanDestinationDir
```

## Content Management
```bash
# Create new page
hugo new content/page-name.md

# Create new documentation page
hugo new documentation/new-doc.md

# Create new post
hugo new posts/my-post.md
```

## Useful Commands
```bash
# Check Hugo version
hugo version

# List all content
hugo list all

# Check for errors
hugo --verbose

# Generate man pages
hugo gen man
```

## File Locations
- **Config**: `hugo.toml`
- **Content**: `content/`
- **Templates**: `layouts/`
- **Static files**: `static/`
- **Build output**: `public/`

## URLs
- **Dev server**: http://localhost:1313
- **Network access**: http://0.0.0.0:1313 or http://[your-ip]:1313
