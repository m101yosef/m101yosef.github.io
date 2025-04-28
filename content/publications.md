---
title: 'About'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:

  - block: tags-cloud
    content: 
      title: "  "

  - block: collection
    content: 
      title: Analytics
      count: 0
      filters: 
        tag: "Data Analytics"
    design: 
      view: article-grid
      columns: 3

  - block: collection
    content: 
      title: AI & Deep Learning
      count: 0
      filters: 
        folders: 
          - publication 
        tag: "Deep Learning"
    design: 
      view: article-grid
      columns: 3

  - block: collection
    content: 
      title: Reinforcement Learning
      count: 0
      filters: 
        folders: 
          - publication 
        tag: "Reinforcement Learning"
    design: 
      view: article-grid
      columns: 2
---
