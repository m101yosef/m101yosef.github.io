---
title: How Q-Learning works in Reinforcement Learning

# Summary for listings and search engines
summary: We always need to evaluate the quality of a given policy and the Q comes from Quality (the quality of the policy). So, let's see how Q-learning works

# Date published
date: '2024-02-14'


authors:
  - admin
  - محمد يوسف

tags:
  - Reinforcement Learning
  - Q-Learning
  - الذكاء الاصطناعي

categories:
  - RL 101
---

# **What is Q-learning?**

Q-learning is a model-free off-policy reinforcement learning algorithm where the agent (the AI) uses a TD learning approach to train its value-based function.

What! I know that a lot and this definition alone summarizes all of my 3 previous articles. However, let’s break it down:

- **[Model-Free](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604#a9a3)**: model alone is a representation of the world/environment that the agent is in, and model-free means a world where the agent doesn’t know the dynamics or how this world works.
- **[Off-Policy](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604#8857)**: policy is the agent’s brain that makes the decisions while off-policy mean that the agent leaning from others’ policy not his own policy.
- **[TD Learning](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604#50ca):** a way to evaluate the quality of our policy at each time step. **(***think of it as an exam and your grads are updated after each question***)**
- **[Value-Based function](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#4b00):** the value of a state is the **expected discounted return** the agent can get if it starts in that state, and then acts according to our policy.

<div><br></div>

## The [full article on Medium](https://medium.com/@mohamedyosef101/how-q-learning-works-in-reinforcement-learning-6d85e0cb6668)