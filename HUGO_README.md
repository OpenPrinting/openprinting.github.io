# OpenPrinting Hugo Migration

This site has been migrated from Jekyll to Hugo.

## Building and Running

### Prerequisites
Install Hugo (extended version recommended):
- Linux: `sudo snap install hugo` or download from [Hugo releases](https://github.com/gohugoio/hugo/releases)
- macOS: `brew install hugo`
- Windows: `choco install hugo-extended` or `scoop install hugo-extended`

### Development Server
Run the development server:
```bash
hugo server
```

Access the site at `http://localhost:1313`

To access from other devices on your local network:
```bash
hugo server --bind 0.0.0.0
```

### Building the Site
Build the static site:
```bash
hugo
```

The built site will be in the `public/` directory.

## Project Structure

```
.
├── hugo.toml              # Hugo configuration file
├── content/               # All content files
│   ├── _index.html       # Homepage (HTML file)
│   └── documentation/    # Documentation pages
├── layouts/              # HTML templates
│   ├── _default/        # Default templates
│   └── index.html       # Homepage template
└── static/              # Static files (images, CSS, JS)
```

## Content Management

### Adding New Pages
Create markdown files in the `content/` directory:
```bash
hugo new documentation/new-page.md
```

### Using HTML Files
Hugo supports HTML files directly. The homepage (`content/_index.html`) is kept as HTML as requested.

## Migration Notes

- Jekyll's `_config.yml` → Hugo's `hugo.toml`
- Jekyll's `_documentation/` → Hugo's `content/documentation/`
- Jekyll's front matter remains compatible with Hugo
- Hugo uses `.Content` instead of Jekyll's `{{ content }}`
- Hugo templates use Go templating instead of Liquid

## Removed Files
The following Jekyll-specific files can be removed:
- `_config.yml`
- `Gemfile`
- `Gemfile.lock` 
- Jekyll directories: `_includes/`, `_layouts/`, etc. (if not reused)

## Resources
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Quick Start](https://gohugo.io/getting-started/quick-start/)
- [Content Management](https://gohugo.io/content-management/)
