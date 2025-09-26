---
layout: post
title: "Welcome to My New Site!"
date: 2024-03-15 12:00:00 -0800
categories: [meta, photography]
tags: [welcome, jekyll, photography, coding]
image: /images/site-preview.jpg
excerpt: "Just launched my new Jekyll-powered site combining my passions for software engineering and photography. Here's what's coming next!"
---

# Welcome to My New Site!

After months of planning and development, I'm excited to launch my new personal website! This site represents the intersection of my two passions: **software engineering** and **photography**.

## What You'll Find Here

This site is built with Jekyll and hosted on GitHub Pages, giving me the flexibility to write posts in Markdown while maintaining full control over the design and functionality.

### Photography

My photography focuses on three main areas:
- **Landscapes** - Capturing the natural world in all its moods
- **Wildlife** - Patient observation of animals in their habitats  
- **Astrophotography** - Technical precision meets cosmic beauty

### Technical Projects

As a software engineer at Amazon, I love building tools that enhance my photography workflow. You'll see posts about:
- Custom weather APIs for shoot planning
- Automation tools for photo organization
- Technical breakdowns of challenging shots

## The Technical Details

This site features some fun technical touches:
- **Breathing background animation** using CSS gradients and transforms
- **Focus text animation** that mimics camera autofocus behavior
- **Masonry layout** for the photography portfolio
- **Dark mode** that preserves your preference

```javascript
// Example: Focus text animation
function triggerFocus() {
    focusElement.classList.add('focusing');
    
    setTimeout(() => {
        currentFocusIndex = (currentFocusIndex + 1) % focusTexts.length;
        const newText = focusTexts[currentFocusIndex];
        focusElement.textContent = newText;
        
        focusElement.classList.remove('focusing');
        focusElement.classList.add('focus-hunt');
    }, 300);
}
```

## What's Coming Next

I have several posts in the pipeline:
- **"Building My Astro Planning Tool"** - Deep dive into the React app I built for astrophotography planning
- **"The Math Behind Focus Stacking"** - Technical explanation of my focus stacking workflow
- **"180 Exposures at -10°F"** - The story behind my latest star trails project

## Get in Touch

I'm always excited to connect with fellow photographers, engineers, or anyone passionate about the intersection of technology and creativity. Feel free to reach out through any of the contact methods in the footer.

Thanks for visiting, and I hope you enjoy exploring the site!

---

*This post was written in Markdown and processed by Jekyll. You can view the source code for this entire site on my [GitHub repository](https://github.com/yourusername/yourusername.github.io).*