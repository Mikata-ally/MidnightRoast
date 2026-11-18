# Midnight Roast

Static website for the Midnight Roast project.

## Shared page components

The common header, footer, and sign-in prompt live in `components/components.js`.
Pages provide mount points for those components and load the component script
before `scripts/index.js`. This keeps the page shell in one place and works when
opening the HTML files directly as well as when serving the site locally.

When adding a page, set `data-root` on `<body>` to `""` at the project root or
`"../"` inside `pages/`. Set `data-active-page` to `home`, `our-story`, `store`,
or `contact` when applicable, add the three component mount points, and include:

```html
<script src="../components/components.js" defer></script>
<script src="../scripts/index.js" defer></script>
```

Use root-relative-to-project paths instead of the `../` prefix for a root page.
