---
title: 'Projects'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:

  - block: ds-masthead
    content:
      eyebrow: "Case studies"
      title: "Projects"
      folder: project
      meta_unit: projects
      text: >-
        Design and UX coursework, written up in full — the problem each one set out to
        solve, the constraints, what I actually did, and what I'd credit as the outcome.
    design:
      spacing:
        padding: ['3.5rem', '0', '1.75rem', '0']

  - block: collection
    content: 
      title: ''
      count: 0
      filters: 
        folders: 
          - project 
      archive: 
        enable: false
    design: 
      view: ds-projects
      columns: 3
      spacing:
        padding: ['0.5rem', '0', '4rem', '0']


---
