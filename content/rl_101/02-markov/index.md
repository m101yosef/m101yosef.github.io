---
title: Markov Decision Processes given a model of the world.

# Summary for listings and search engines
summary: In RL, when the agent take actions (or a sequence of actions) which means a sequence of decisions, then at this point we can say that Markov decision processes (MDP) formalizes this interaction.

# Date published
date: '2024-02-08'

share: false


authors:
  - admin

tags:
  - Reinforcement Learning
  - Markov Process

categories:
  - RL 101
---


In the last article, we talked about [the fundamentals of reinforcement learning](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7) and here is a quick review…

**Model**: is a representation of the environment (*world*) and how it change in response to the agent’s actions.

**Policy**: the set of actions that the agent should take.

**Value function**: future rewards from being in a state and/or action when following a particular policy.

## **Today we’ll talk about:**

* [What does Markov process mean?](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf#9584)

* [Markov Reward Processes (MRP)](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf#2253)

* [The Bellman Equation](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf#9776)

* [Markov Decision Processes (MDP)](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf#c2bf)

* [Evaluation and Control in MDPs](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf#6227)

# **What does Markov process mean?**

Now, imagine a sequence of events, like flipping a coin repeatedly. A Markov process assumes that the probability of the next event (heads or tails) **only depends on the current state**, in this case, whether the last flip was heads or tails. The past history holds no additional information. This is called the **[Markov property](https://youtu.be/vbqkzyu2bQ0?si=4GqYMTvis0SFVMhI)**.


<div><br></div>

## read the [full article on Medium](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf)