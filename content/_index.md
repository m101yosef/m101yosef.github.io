---
# Leave the homepage title empty to use the site title
title: ''
date: 2024-02-14
type: landing

sections:

  - block: hero
    id: hero
    demo: false
    content:
      title: 'Putting data into action'
      username: admin
      image:
        filename: 'hero-img.png'
      cta:
        label: 
        url: 
      cta_alt: 
        label: 
        url: 
      text: |-
        <p style="font-size: 90%; padding-top: 0.1rem;">
        <b> Hi, I’m Mohamed, and this is all about my work in Data Science, AI, and Reinforcement Learning (RL).</b><br><br>
        I specialise in developing machine learning models and advancing research in Reinforcement Learning to solve complex real-world problems. My work bridges data science and AI research, exploring how AI systems can help us make smarter decisions in various industries, better understand the world around us and the world inside us (the brain).
        </p>

    design:
      background:
        gradient_end: '#FEFEFE'
        gradient_start: '#FEFEFE'
        text_color_light: false

  ### BIO ###
  - block: about.biography
    id: bio
    content:
      title: 'About Me'
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin

  ### FEATURED ###
  - block: features
    id: featured
    content:
      title: Featured
      filters:
        folders:
          - publication
        featured_only: true
    design:
      columns: '2'
      view: card

  ### LEARNINGS ###
  - block: collection
    id: reviews
    content:
      title: Lit. Reviews
      filters:
        folders:
          - publication
        publication_type: "review"
    design:
      columns: '2'
      view: compact

  ### PUBLICATIONS ###
  - block: portfolio
    id: publications
    content:
      title: All Publications
      filters:
        folders:
          - publication
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (`filter_button` instances) as you like.
      # To show all items, set `tag` to "*".
      # To filter by a specific tag, set `tag` to an existing tag name.
      # To remove the toolbar, delete the entire `filter_button` block.
      buttons:
        - name: All
          tag: '*'
        - name: Reinforcement Learning
          tag: Reinforcement Learning
        - name: Analytics
          tag: Data Analysis
          tag: Data Science 
        - name: User Experience
          tag: User Experience
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
      view: masonry


  ### TALKS ### 
  - block: collection
    id: talks
    content: 
      title: Talks
      filters: 
        folders: 
          - event
    design: 
      columns: '2'
      view: youtube

  ### TAGS ###
  - block: tag_cloud
    id: tags
    content:
      title: 
    design:
      columns: '1'
---
