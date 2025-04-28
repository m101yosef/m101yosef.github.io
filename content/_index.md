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
       **Hi, I’m Mohamed, a data scientist specialising in machine learning and reinforcement learning.**

       I build and deploy data-driven models to solve real-world problems across industries. From time-series forecasting and predictive analytics to reinforcement-learning agents, I turn raw data into clear insights and actionable solutions. My work bridges rigorous analysis with hands-on implementation, helping businesses make smarter decisions, optimise processes and uncover patterns that drive growth.                   
    design:
      css_class: light 
      background:
        color: whitesmoke

  - block: brands
    content: 
      title:
      brands: 
        - name: "Al Zamil Company"
          logo: 'alzamil-logo.png'
          url: "zamilco.com"
        - name: "NineSigma"
          logo: 'nineSigma.png'
          url: "ninesigma.com"
        - name: "MOCKUP"
          logo: 'mockup.png'
          url: 
        - name: "meter w nos"
          logo: 'meterWnos.png'
          url: "facebook.com/meter.w.nos"



  - block: collection
    id: papers
    content:
      title: Featured Items
      filters:
        folders:
          - publication
        featured_only: true
    design:
      background: 
        color: whitesmoke
      view: article-grid
      columns: 3

  - block: collection
    content:
      title: Most Recent
      filters: 
        folders: 
          - publication
      count: 3
      order: desc
      archive: 
        link: "/publications"
    design: 
      view: date-title-summary


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
      title: Explore by topic
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
