# isaccKim.github.io

Personal ML portfolio of Seokwon Kim — served at https://isacckim.github.io

Plain HTML/CSS/JS (no build step). Edit `index.html` and push.

```
index.html              # all content
assets/css/style.css    # styles (light/dark theme tokens at the top)
assets/js/main.js       # theme toggle, filters, BibTeX, figure lightbox
assets/img/profile.jpg  # profile photo
assets/img/pub/*.webp   # paper main figures (thumbnails + lightbox)
```

## Add a new paper

1. Put the main figure in `assets/img/pub/<name>.webp` (≈1600px wide is plenty).
2. In `index.html`, copy one `<article class="pub">` block inside `.pubs` and edit it.
   `data-tags="3d"` or `data-tags="med"` controls the filter tabs.
3. Add a line to **News**.
