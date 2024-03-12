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
          - post
        featured_only: true
    design:
      columns: '2'
      view: card

  ### POSTS ###
  - block: collection
    id: post
    content: 
      title: Posts
      count: 3
      filters: 
        folders: 
          - post
        author: ""
        category: ""
        tag: ""
        exclude_featured: true
        # Page order: descending (desc) or ascending (asc) date.
        order: decs
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
  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - event
  #   design:
  #     columns: '2'
  #     view: compact

  ### TAGS ###
  - block: tag_cloud
    id: tags
    content:
      title: 
    design:
      columns: '1'
---
