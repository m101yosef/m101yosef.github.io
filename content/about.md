---
title: 'About'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:

  - block: resume-biography-3
    content: 
      username: admin
      text: ''
      # Show a "Currently" highlight (not Education) — the full Education
      # entry lives in the resume-experience timeline below, so this avoids
      # duplicating it.
      show_education: false

  - block: resume-experience
    content:
      username: admin
      # Hugo date format
      date_format: 'Jan 2006'
      # Education or Experience section first?
      is_education_first: false

  - block: badges
    content: 
      title: Certifications
    design: 
      background: 
        color: whitesmoke

  # - block: resume-skills
  #   content:
  #     title: Skills & Hobbies
  #     username: admin
  #   design:
  #     show_skill_percentage: false
  #     background: 
  #       color: whitesmoke


  # - block: resume-awards
  #   content:
  #     title: Awards
  #     username: admin
  # - block: resume-languages
  #   content:
  #     title: Languages
  #     username: admin
---
