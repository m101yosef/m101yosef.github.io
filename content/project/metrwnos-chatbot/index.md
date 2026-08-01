---
title: metrwnos chatbot
date: 2024-11-01
summary: A RAG-powered legal intake and Q&A chatbot for an Egyptian law firm, answering common Egyptian law questions in Egyptian Arabic and handling first contact with prospective clients.
status: archived
featured: true

image:
  caption: "Slide 1 from Intlaq Presentation (Nov 2024)"
  focal_point: ""
  preview_only: false

tags:
  - Generative AI
  - RAG & LLMs
  - LangChain
---

## The problem

Most people who contact a law firm are not ready to hire a lawyer yet. They have a question: about a contract, a dispute, an inheritance, and they want a quick, understandable answer before committing to a paid consultation. For a small firm like Meter we Nos, answering those questions manually eats into billable time, and ignoring them loses potential clients.

## Why a chatbot, and why now (Nov 2024)

A year ago this would have been a hard sell. Generic chatbots gave generic answers, and no law firm can afford a bot that improvises legal advice. What changed in 2024 is that retrieval-augmented generation became practical and cheap: the model answers from the firm's own indexed legal documents instead of its imagination, and fast, low-cost models like Gemini Flash make per-query costs negligible.

The business case is simple:

- **First contact runs 24/7.** Prospective clients get an immediate answer in Egyptian Arabic instead of waiting for office hours.
- **Lawyers stop repeating themselves.** The most common questions get consistent answers drawn from the firm's own material, freeing lawyer time for cases that actually need a lawyer.
- **Better-qualified consultations.** By the time someone books a session, the basics are already covered, so the intake queue fills with real cases rather than FAQ traffic.

## System & Architecture

Built as a contract AI engineering project around a Retrieval-Augmented Generation (RAG) pipeline:

- **LLM & Embeddings**: Google Gemini (`gemini-1.5-flash`) through LangChain's `RetrievalQA`.
- **Vector Retrieval**: FAISS index over a corpus of Egyptian legal documents.

## What I did

- Designed and implemented the RAG pipeline end to end: document indexing, vector retrieval, and answer generation.
- Wrote the system prompt so responses come back as clear Egyptian Arabic legal explanations, suitable for talking to clients rather than lawyers.
- Built the Streamlit prototype and the client intake flow around it.

## Demo Walkthrough

The demo below (`v0.3`) shows the chatbot answering Egyptian legal questions and walking through the intake flow:

<video controls width="100%" style="border-radius: 8px; margin-top: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <source src="demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Outcome

Delivered a working prototype through three demo iterations (`v0.1` to `v0.3`), enough to show the firm that document-grounded LLMs can realistically handle legal intake for a boutique practice.
