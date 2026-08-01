---
title: 'Publications'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:

  - block: ds-masthead
    content:
      eyebrow: "Technical notes"
      title: "Writing"
      folder: publication
      meta_unit: pieces
      text: >-
        **Practical engineering, written up properly.** Not academic papers —
        these are things I built or worked out (recommendation, forecasting,
        conversational AI, and how machines learn to decide — up to reinforcement
        learning), documented with the structure and rigor of research notes so
        they stay reliable and reusable. Build, teach, iterate.
    design:
      spacing:
        padding: ['3.5rem', '0', '1.75rem', '0']

  - block: collection
    content: 
      title: ''
      count: 0
      filters: 
        folders: 
          - publication 
    design: 
      view: ds-writing
      spacing:
        padding: ['0.5rem', '0', '4rem', '0']

  # - block: collection
  #   content: 
  #     title: Reinforcement Learning
  #     count: 0
  #     filters: 
  #       folders: 
  #         - publication 
  #       tag: "Reinforcement Learning"
  #   design: 
  #     view: article-grid
  #     columns: 2

  - block: tags-cloud
    content: 
      title: "Explore by topic"
    design: 
      background: 
        color: whitesmoke
---
