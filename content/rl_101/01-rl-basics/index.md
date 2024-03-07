---
title: The fundamentals of reinforcement learning explained.
date: '2024-01-22'
summary: Learn the basics of the rising star in the world of AI; reinforcement learning.

share: false
featured: true

authors:
  - admin

tags:
  - Reinforcement Learning

categories:
  - RL 101
---

# Intro

Reinforcement learning is the **rising star** in the world of AI that is impossible to ignore. While other techniques like supervised learning have shed light on narrow domains, reinforcement learning beams with promise to truly **revolutionize how machines learn and [make decisions](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf).**

While DeepMind’s **[AlphaGo](https://youtu.be/WXuK6gekU1Y?si=0MSwFFFaEawDc6dY)** defeating the world Go champion in 2016 remains a landmark achievement, the field of reinforcement learning has progressed even further in recent years. Beyond mastering complex games like **Dota 2** with OpenAI’s bot, reinforcement learning algorithms are **now** making **significant strides in real-world applications**.


# **So, what is Reinforcement learning?**

A machine learning paradigm where an **agent** (the AI) learn form the **environment** by **interacting with it** (through trial and error) and **receiving rewards** (negative or positive) as a feedback for performing actions.

# **The RL process**

![](https://miro.medium.com/v2/resize:fit:700/1*DJLDOROwMqoL9KUKsvc8Fg.png)

**Source**: *[Reinforcement learning: An introduction](https://mitpress.mit.edu/9780262352703/reinforcement-learning/) book by* Richard S. Sutton and Andrew G. Barto.

Agent **observes the current state** of the environment *(to get key information about the situation the agent is in).*

1. Based on the state, the agent **selects an action** according to its current policy.
2. The agent executes the action in the environment. *This changes the state of the environment.*
3. The environment **provides a reward** (a numerical value) to the agent based on the consequences of its action. *Positive rewards encourage the agent and negative rewards discourage it.*
4. The agent **updates its policy** based on this feedback to favor actions the produce higher rewards. *This is done by techniques like [Q-learning](https://medium.com/@mohamedyosef101/how-q-learning-works-in-reinforcement-learning-6d85e0cb6668), [policy gradient](https://medium.com/@mohamedyosef101/reinforcement-learning-policy-gradient-101-de2a48f87e5b), etc.*
5. The **new state** of the environment is observed and the **process repeated**…

> 🎾 The agent’s goal is to maximize its expected return (cumulative reward).
> 

# **Reinforcement Learning Terminology**

!https://miro.medium.com/v2/resize:fit:700/1*VRcT4KHWjGG8zi5t6HAaqQ.png

Image by [MohamedYosef101](https://linkedin.com/in/mohamedyosef101) (the author)

## **What does the agent see? Observations/States**

The **information the agent gets from the environment**. In case of video game, each frame on the screen is like a **state** *s,* giving the agent information about the world (environment). In other cases, such as with a trading agent, the **state** can represent the value of a specific stock, among other possibilities.

An **observation** *o* is a partial description of a state. Sometimes, the agent has full visibility into environment (***fully observed***), while other times, it only sees a partial picture (***partially observed***).

—

## **Making choices: Action Spaces**

**Action** is the **move** or **decision** made by the agent in a given state of the environment. And the **action space** are the set of **all valid moves/actions** in a given environment.

Think of the **action space** as the agent’s toolbox. In a game, it might have a set number of moves (**discrete action space**), like jumping or attacking. In continuous environments, the agent might control a robot’s movement with precise values (**continuous action spaces**).

—

## **Deciding what to do: Policies**

The **policy** is the agent’s brain, deciding what actions to take based on the observed state.

- It can be **[deterministic](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html#deterministic-policies) (***fixed action for each state***)** and denoted by…

https://miro.medium.com/v2/resize:fit:274/0*PquoXM-NKMiO9c3S

- Or it may be **[stochastic](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html#stochastic-policies) (***probability-based***),** like flipping a coin to choose, and denoted by…

https://miro.medium.com/v2/resize:fit:298/0*3YrkFdAOVo_SRIeK

> Remember:“policy” and “agent” are often used interchangeably.
> 

—

## **The feedback Loop: Rewards, Return & Discounting**

The environment (world) provides **rewards** to guide the agent after taking the action. Think of positive points in a game or praise for a good robot behavior.

https://miro.medium.com/v2/resize:fit:315/0*xou8tvahfUJGL2Mb

Instead of individual rewards, we often consider the **return,** which sums up all future rewards. The **discount rate** (gamma) determines how much future rewards matter. A **higher gamma** prioritizes long-term rewards, while a **lower gamma** focuses on immediate rewards.

**Kinds of return:**

**1- Finite-horizon undiscounted return**, which is just the sum of rewards obtained in a fixed window of steps:

https://miro.medium.com/v2/resize:fit:231/0*L0yo7_F01w8T_Tp8

**2- Infinite-horizon discounted return**, which is the sum of all rewards ever obtained by the agent, but discounted by how far off in the future they’re obtained.

https://miro.medium.com/v2/resize:fit:267/0*J_GWyA88CfpEfCMs

—

## **Putting it all together: Trajectories**

A trajectory is a **sequence of states, actions, and rewards** the agent experiences in the world. It’s like playing a game, making choices, and seeing the outcomes — that’s a trajectory!

# **Types of RL tasks**

A task is an **instance** of a problem. In RL, we primarily have two types of tasks; **episodic** and **continuous**.

!https://miro.medium.com/v2/resize:fit:700/1*pCXjbasrMKINOnbXqetUSw.png

Image by [MohamedYosef101](https://linkedin.com/in/mohamedyosef101) (the author)

## **Episodic task**

In this case, we have a **starting** point and an **ending point** (**a terminal state**). This creates an episode: *a list of States, Actions, Rewards, and new States.*

## **Continuing tasks**

Tasks that **continue forever** (**no terminal state**). *In this case, the agent must learn how to choose the best actions and simultaneously interact with the environment.*

# **🛠 The Exploration/Exploitation trade-off**

- **Exploration** is *exploring the environment* by **trying random actions to find information** about the environment.
- **Exploitation** is using **known** information to **maximize** the reward.

!https://miro.medium.com/v2/resize:fit:462/0*5xpDJV7cK7CFK767.png

**Source**: [Exploration-Exploitation Dilemma (opengenus.org)](https://iq.opengenus.org/exploration-exploitation-dilemma/)

# **Two approaches for solving RL problems**

In other words, how can we build the RL agent can **select the actions that maximize its expected return** (cumulative reward).

**The Policy: the agent’s brain**

> The Policy is the function we want to learn, our goal is to find the optimal policy π*, the policy that maximizes expected return when the agent acts according to it. We find this π* through training.
> 

***There are approaches to find this optimal policy* π**:***

- **Directly**, *by teaching the agent to learn which action to take, given the current state:* **[Policy-Based Methods](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#0158).**
- **Indirectly**, *teach the agent to learn which state is more valuable and then take the action that leads to the more valuable states:* **[Value-Based Methods](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7#4b00)**.

# **1. Policy-based methods**

This function will define a mapping from each state to the best corresponding action. Alternatively, it could define **a probability distribution over the set of possible actions at that state.**

**🛠 We have two types of policies:**

- **[Deterministic](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html#deterministic-policies)**: a policy at a given state will always return the same action.

https://miro.medium.com/v2/resize:fit:173/0*lm3iBdCqNMIRmMMT

- **[Stochastic](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html#stochastic-policies)**: outputs a probability distribution over actions.

https://miro.medium.com/v2/resize:fit:303/0*Z8pYYEUDwE2DWn1-

__________________

>> **Additional Reading:**

- [Model-Free Policy Learning](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604)
- [Policy Gradient](https://medium.com/@mohamedyosef101/reinforcement-learning-policy-gradient-101-de2a48f87e5b)

__________________

# **2. Value-based methods**

The value of a state is the **expected discounted return** the agent can get if it starts in that state, and then acts according to our policy.

> “Act according to our policy” just means that our policy is “going to the state with the highest value”.
> 

![](https://miro.medium.com/v2/resize:fit:700/0*-lAh7eNJBR5YVOns.jpg)

***Source**: [Two main approaches for solving RL problems (huggingface.co)](https://huggingface.co/learn/deep-rl-course/unit1/two-methods)*

# Now let’s see value-based methods in a closer look…

**The two primary types of value-based methods are:**

## **a. State-value methods “V(s)”**

Estimate the value of being in a particular state.

**Value function:** V(s) represents the expected long-term reward starting from state s, following the current policy.

**Common algorithms:**

- [Monte Carlo](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604#4911) evaluation
- [Temporal Difference](https://medium.com/@mohamedyosef101/model-free-policy-learning-08d163338604#50ca) (TD) learning, including SARSA and Q-learning

## **b. Action-value methods “Q(s, a)”**

Estimate the value of taking a specific action in a given state.

**Value function:** Q(s, a) represents the expected long-term reward starting from state s, taking action a, and then following the current policy.

**Common algorithms:**

- [Q-learning](https://medium.com/@mohamedyosef101/how-q-learning-works-in-reinforcement-learning-6d85e0cb6668)
- [Deep Q-Networks](https://medium.com/@mohamedyosef101/deep-q-learning-reinforcement-learning-plus-neural-network-c40ce32d034b) (DQN)

!https://miro.medium.com/v2/resize:fit:700/1*gtxTOWsx1cLS2r0paQqTCA.png

**Source**: [Two types of value-based methods (huggingface.co)](https://huggingface.co/learn/deep-rl-course/unit2/two-types-value-based-methods)

# **Outro**

This introduction may have left you with more questions than answers. That’s perfectly normal! Reinforcement learning is a complex and ever-evolving field, and the best way to truly understand it is to get your hands dirty. **Don’t be afraid to experiment**, make mistakes, and learn from them.

## **Up Next …**

**[Markov Decision Processes](https://medium.com/@mohamedyosef101/markov-decision-processes-given-a-model-of-the-world-761fc4147cbf)**; *for now think of it as [Tetris](https://en.wikipedia.org/wiki/Tetris), where you choose the best move in uncertain future based on rewards & past experience.*

## **References**

- Thomas Simonini. (2018). *[Deep Reinforcement Learning course](https://huggingface.co/learn/deep-rl-course/unit0/introduction).* huggingface.
- Emma Brunskill. (2019). *[CS234: Reinforcement Learning](https://youtube.com/playlist?list=PLoROMvodv4rOSOPzutgyCTapiGlY2Nd8u&si=iDTVkCL63ER_LWvm).* Stanford Online.
- Richard Sutton & Andrew Barto. (2018, 2020). *[Reinforcement learning: An introduction](https://mitpress.mit.edu/9780262352703/reinforcement-learning/)*. MIT Press.

# **… تم بحمد الله …**

<div><br></div>

## Read the [full article](https://medium.com/@mohamedyosef101/the-fundamentals-of-reinforcement-learning-explained-f42de0053fc7) on Medium
