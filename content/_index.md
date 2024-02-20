---
# Leave the homepage title empty to use the site title
title: ''
date: 2024-02-14
type: landing

sections:

  ### BIO ###
  - block: about.biography
    id: bio
    content:
      title: Welcome 👋
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin

  ### FEATURED ###
  - block: collection
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
  
  ### RL 101 ###
  - block: collection
    id: rl101
    content:
      title: RL 101
      subtitle: 'The basics of reinforcement learning'
      text: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        folders:
          - rl_101
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: asc
    design:
      # Choose a layout view
      view: list
      columns: '2'

  ### NOTEBOOKS ###
  - block: collection
    id: notebook
    content: 
      title: Notebooks
      count: 7
      filters: 
        folders: 
          - notebook
        author: ""
        category: ""
        tag: ""
        exclude_featured: true
        order: asc 
    design: 
      view: compact
      columns: '2'


  ### RECENT PUBLICATIONS ### 
  - block: collection
    id: publications
    content:
      title: Recent Publications
      text: |-
        {{% callout note %}}
        Quickly discover relevant content by [filtering publications](./publication/).
        {{% /callout %}}
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      columns: '2'
      view: citation

  ### TALKS ###
  - block: collection
    id: talks
    content:
      title: Recent & Upcoming Talks
      filters:
        folders:
          - event
    design:
      columns: '2'
      view: compact

  ### TAGS ###
  - block: tag_cloud
    content:
      title: 
    design:
      columns: '1'
---
