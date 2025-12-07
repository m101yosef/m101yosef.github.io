---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:

  - block: resume-biography-3
    id: bio
    content:
      username: admin
      text: |- 
       I leverage a deep background in Applied Data Science and Machine Learning research to oversee digital infrastructure and architect functional business systems. My focus is on bridging the gap between business goals and technical execution, ensuring technology solves practical problems rather than creating them.
       
       [Read more >>](/about)
    design:
      css_class: light 
      background:
        color: whitesmoke


  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2

  # - block: collection
  #   content:
  #     title: Most Recent
  #     count: 3
  #     order: desc
  #     filters: 
  #       folders: 
  #         - publication
  #     archive: 
  #       enable: true
  #       text: See all publications  ->
  #       link: "/publications"
  #   design: 
  #     background: 
  #       color: whitesmoke
  #     view: date-title-summary

  # - block: collection-2
  #   content:
  #     title: Courses I've had the privilege to teach
  #     filters:
  #       folders:
  #         - teaching
  #     archive: 
  #       enable: true
  #       text: See all courses  ->
  #       link: /teaching
  #   design:
  #     view: article-grid
  #     columns: 3


  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - event
  #   design:
  #     background: 
  #       color: rgb(235, 235, 235)
  #     view: article-grid
  #     columns: 1


  - block: tags-cloud
    content: 
      title: "Explore by topic"
    design: 
      background: 
        color: whitesmoke

  # - block: collection
  #   id: news
  #   content:
  #     title: Recent News
  #     subtitle: ''
  #     text: ''
  #     # Page type to display. E.g. post, talk, publication...
  #     page_type: post
  #     # Choose how many pages you would like to display (0 = all pages)
  #     count: 5
  #     # Filter on criteria
  #     filters:
  #       author: ""
  #       category: ""
  #       tag: ""
  #       exclude_featured: false
  #       exclude_future: false
  #       exclude_past: false
  #       publication_type: ""
  #     # Choose how many pages you would like to offset by
  #     offset: 0
  #     # Page order: descending (desc) or ascending (asc) date.
  #     order: desc
  #   design:
  #     # Choose a layout view
  #     view: date-title-summary
  #     # Reduce spacing
  #     spacing:
  #       padding: [0, 0, 0, 0]
  
 
 
---
