---
title: Meter we Nos (متر ونص)
date: 2024-11-01
summary: A RAG-powered legal intake & Q&A chatbot for an Egyptian law firm — automating client intake and answering common Egyptian law queries in Egyptian Arabic.
status: archived
featured: true

image:
  caption: ""
  focal_point: ""
  preview_only: false

tags:
  - RAG & LLMs
  - Legal Tech
  - LangChain
---

## The problem

Clients seeking legal advice often need fast, reliable answers to common Egyptian law questions before scheduling consultations. Meter we Nos needed an automated intake solution to guide prospective clients, answer frequent legal inquiries, and streamline the firm's initial consultation queue without manual overhead.

## System & Architecture

Built as a contract AI engineering effort using a Retrieval-Augmented Generation (RAG) pipeline:
- **LLM & Embeddings**: Google Gemini (`gemini-1.5-flash`) integrated via LangChain's `RetrievalQA`.
- **Vector Retrieval**: FAISS vector retriever over indexed Egyptian legal document corpora.
- **Frontend & UX**: Customized Streamlit interface optimized for right-to-left Egyptian Arabic text, custom branding, and formatted responses.

## What I did

- Designed and implemented the end-to-end RAG retrieval pipeline and vector indexing for legal document data.
- Structured system prompt guidelines to return precise, Egyptian Arabic legal explanations suited for client communication.
- Built the interactive Streamlit prototype and integrated client intake flows.

## Output & Impact

Delivered a functional RAG chatbot prototype and demo suite (`v0.1`–`v0.3`), proving how LLMs and document retrieval can automate legal intake for boutique law firms.
