---
title: Reinforcement Learning - Model-Free Policy Evaluation

# Summary for listings and search engines
summary: Forget the GPS! Forget carefully programmed robots following strict instructions. Think of an AI agent navigating a crowded city, waving through traffic, dealing with unexpected changes, and even discovering new routes — all without a map. AND this what we called model-free policy learning.

# Date published
date: '2024-02-13'

share: false
authors:
  - admin
tags:
  - Reinforcement Learning
  - Policy Evaluation
categories:
  - RL 101
---

# Intro

> Model is a representation of the environment (world) and how it change in response to the agent’s actions.
> 

**Model-Free** means **directly learning form the environment without knowing how it works**. Algorithms like [Q-learning](https://medium.com/@mohamedyosef101/how-q-learning-works-in-reinforcement-learning-6d85e0cb6668) and policy gradient methods are common model-free approaches.

**The main advantage** of model-free policy learning is that it does not require from you to identify and parameterize a [model of the world](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf) (environment) which help you avoid potential errors or restrictions from approximate models.

**The downside is** that without an explicit environment model, model-free agents must rely on extensive real experience to learn policies *(you make the rules)*. They can be less sample efficient compared to model-based methods that can use planning with a [learned world model](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf).

<div><br></div>

# **Model-free policy evaluation (Action Quality)**

> Policy: the set of actions that the agent should take therefore it determine which action that the agent should take.
> 

The idea in policy evaluation is somebody gives you a way to act and then you want to figure out **how good that [policy](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#9d6e) is** (*the expected return of the policy*).

> **Monte Carlo and TD Learning are commonly used for model-free policy evaluation**

<div><br></div>

## Read the [full article on Medium](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604)