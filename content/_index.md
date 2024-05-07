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
      title: 'Turning Data into Answers:'
      image:
        filename: hero-light.png
      cta:
        label: 'Talk a look at my work ↴'
        url: https://mohamedyosef101.github.io/#publication
      cta_alt:
        label: Send me an email
        url: mailto:mohamedyosef101.outlook.com
      text: |-
        **I Use Data Science to Explore the Unknown**

        <div><br></div>

        I'm curious about how data can help us understand our world better (more importantly: the human brain). 
        My research mainly focuses on deep reinforcement learning, human-AI interaction, and sometimes computational neuroscience.

        <div><br></div>

        <!--Custom spacing-->
        <div class="mb-3"></div>
    design:
      background:
        gradient_end: '#Fefefe'
        gradient_start: '#Fefefe'
        text_color_light: false

  ### BIO ###
  - block: about.biography
    id: bio
    content:
      title: About Me
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

  ### PUBLICATIONS ###
  - block: portfolio
    id: publications
    content:
      title: Publications
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
