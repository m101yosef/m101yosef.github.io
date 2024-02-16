---
title: Reinforcement Learning - Model-Free Policy Evaluation

# Summary for listings and search engines
summary: Forget the GPS! Forget carefully programmed robots following strict instructions. Think of an AI agent navigating a crowded city, waving through traffic, dealing with unexpected changes, and even discovering new routes — all without a map. AND this what we called model-free policy learning.

# Date published
date: '2024-02-13'


authors:
  - admin
  - محمد يوسف

tags:
  - Reinforcement Learning
  - Policy Evaluation
  - الذكاء الاصطناعي

categories:
  - RL 101
---

# **What does Model-Free mean?**

> Model is a representation of the environment (world) and how it change in response to the agent’s actions.
> 

**Model-Free** means **directly learning form the environment without knowing how it works**. Algorithms like [Q-learning](https://medium.com/@mohamedyosef101/how-q-learning-works-in-reinforcement-learning-6d85e0cb6668) and policy gradient methods are common model-free approaches.

**The main advantage** of model-free policy learning is that it does not require from you to identify and parameterize a [model of the world](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf) (environment) which help you avoid potential errors or restrictions from approximate models.

**The downside is** that without an explicit environment model, model-free agents must rely on extensive real experience to learn policies *(you make the rules)*. They can be less sample efficient compared to model-based methods that can use planning with a [learned world model](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf).

<div><br></div>

## Read the [full article on Medium](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604)