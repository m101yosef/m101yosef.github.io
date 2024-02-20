---
title: The basics of policy gradient in reinforcement learning

# Summary for listings and search engines
summary: There are two approaches for solving any RL problem; value-based methods and policy-based methods. Policy gradient is a policy-based…

# Date published
date: '2024-02-19'

share: false
authors:
  - admin
tags:
  - Reinforcement Learning
  - Policy Gradient
categories:
  - RL 101
---

# Intro

In a [previous article](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#f5a1), I mentioned that there are two approaches for solving any reinforcement learning problem; value-based methods and policy-based methods.

**In [value-based](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#4b00)** learning algorithms *like [Deep Q-learning](https://medium.com/@mohamedyosef101/deep-q-learning-reinforcement-learning-plus-neural-network-c40ce32d034b)*, you need a value function in order to find the optimal policy which then lead to the maximum reward (*indirect approach*).

But in **[policy-based](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#0158) methods** *like policy gradient*, you directly optimize the policy without value function. Policy gradient aims to tweak the policy parameters such that the agent’s actions lead to higher rewards over time.

### So, ….

**Policy Gradient** is a **policy-based learning technique for training policies directly** without a value function with a goal to reach the highest long-term reward.

<div><br></div>

## The [full article on Medium](https://medium.com/@mohamedyosef101/reinforcement-learning-policy-gradient-101-de2a48f87e5b)