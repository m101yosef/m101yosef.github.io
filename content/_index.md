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
      show_education: false
      interests_label: "Focus"
      text: |-
        I build ML systems that make decisions: a recommendation and sentiment service
        that served live predictions inside a campus events app, a RAG chatbot that
        handles client intake and common legal questions for a law firm, and the Python
        backends behind Ertaqy's AI features in production today. Different products,
        same shape: a model, a Python backend, and a decision someone actually acts on.
        Here I write about how machines learn to decide, from statistics up to
        reinforcement learning.

        [Read more »](/about)
    design:
      css_class: light 
      background:
        color: whitesmoke

  - block: why-101
    id: why-101
    design:
      background:
        color: '#fafafa'

  - block: collection
    id: papers
    content:
      title: Start here
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: ds-papers
      columns: 2

  - block: collection
    id: writing
    content:
      title: Latest Writing
      count: 4
      filters:
        folders:
          - publication
      archive:
        enable: true
        text: All writing →
        link: /publications/
    design:
      view: ds-writing
      background:
        color: '#fafafa'

  - block: collection
    id: top-projects
    content:
      title: Top Projects
      count: 3
      filters:
        folders:
          - project
        featured_only: true
      archive:
        enable: true
        text: All projects →
        link: /projects/
    design:
      view: ds-projects
      columns: 3

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
