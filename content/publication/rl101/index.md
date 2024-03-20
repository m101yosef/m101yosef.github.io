---
title: "Reinforcement Learning: All the Basics"
authors:
- admin
date: "2024-01-08"
doi: ""
publishDate: "2024-01-22"
share: false

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["Learnings"]

# Publication name and optional abbreviated publication name.
publication: "MohamedYosef101"
publication_short: ""

featured: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
  focal_point: ""
  preview_only: true

# introduction
abstract: This is me summarizing the basics of Reinforcement Learning

# Summary. An optional shortened abstract.
summary: 

tags:
- Reinforcement Learning

links:
- name: "Medium"
  url: ""
- name: ""
  url: ""
url_pdf: ''
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''
---

## What is Reinforcement Learning?
A machine learning paradigm where an **agent,** the AI, learns from the **environment** by interacting with it, through trial and error, and receiving **rewards**, negative or positive, as a feedback for performing actions. Using this feedback, the agent can actively adapt to the environment. 


## The Reinforcement Learning Process
As you may guess, the RL process begins with the agent observing a situation or a state, $S_t$, from the environment (or the world) to get key information about the situation, the state; the agent is in.
1. Based on the state, $S_t$, the agent selects an action, $A_t$, according to its current mindset, policy $\pi$.
2. The agent executes the action in the environment. This changes the situation, the state of the environment.
3. The environment provides a reward, $R_t$  (a numerical value), to the agent based on the consequences of its action. 
4. The agent updates its policy $\pi$ based on this feedback to favor actions the produce higher rewards.
5. The new state of the environment is observed, and the process repeated.

<figure>
  <img alt="RL Process" src="https://miro.medium.com/v2/resize:fit:700/1*DJLDOROwMqoL9KUKsvc8Fg.png">
  <figcaption><b>Source:</b> <a href="https://mitpress.mit.edu/9780262352703/reinforcement-learning/">Reinforcement learning: An introduction</a> book by Richard S. Sutton and Andrew G. Barto</figcaption>
</figure>

<p style="color: crimson; font-weight: bold;">🎯 The agent’s goal is to maximize its expected return (cumulative reward).</p>


## Reinforcement Learning Terminology
The information the agent gets from the environment. In case of video game, each frame on the screen is like a state, *s,* giving the agent information about the world (environment). In other cases, such as with a trading agent, the state can represent the value of a specific stock, among other possibilities.
An observation *o* is a partial description of a state. Sometimes, the agent has full visibility of the environment (**fully observed**), while other times, it only sees a partial picture (**partially observed**).

### Making choices: Action Spaces
**Action** is the move, or decision made by the agent in a given state of the environment. And the **action space** is the set of all valid moves/actions in a given environment. Think of the action space as the agent’s toolbox. In a game, it might have a set number of moves (**discrete action space**), like jumping or attacking. In continuous environments, the agent might control a robot’s movement with precise values (**continuous action spaces**).

### Deciding what to do: Policies

The **policy** is the agent’s brain, deciding what actions to take based on the observed state. Policy can be deterministic or stochastic;

- **Deterministic Policy:** a logical approach where the agent has a specific action to take for each state ***s*** and denoted by $\mu \rightarrow a_t = \mu_\theta(S_t)$. It’s like having a rule that says, “If X happens, do Y”, with no exceptions. The agent follows the same rule every time it’s in the same situation or state.

- **Stochastic Policy:** more flexible. Instead of one action, the agent has a set of actions and chooses one based on probabilities. Here, policy denoted by $\pi \rightarrow a_t \sim \pi_\theta(\cdot|S_t)$. <p style="color: #656565">It’s like flipping a coin to decide what to do. The coin and the flipping have some randomness. You don’t know that you’ll get tail at the first flip and head in the second flip. But what you know is that if you flip the coin many times, you’ll get 50% heads and 50% tails.</p>


### The feedback Loop: Rewards, Return & Discounting

The environment, our agent’s world, provides **rewards** to guide the agent after taking the action. Idea came from points in games; in football, the team gets 3 points for winning and 1 point for a draw and 0 points for losing. In our case, the agent gets the reward based on the current and future state and, of course, the action.

$$
r_t=R(S_t, A_t, S_{t+1})
$$

Instead of individual rewards, we often consider the **return,** which sums up all future rewards. The **discount rate,** gamma $\gamma$, determines how much future rewards matter. A **higher gamma** prioritizes long-term rewards (to take $100 after a year), while a **lower gamma** focuses on immediate rewards (to take $20 now).

**Kinds of return:**

**1- Finite-horizon undiscounted return**, which is just the sum of rewards obtained in a fixed window of steps: $R(\tau)= \sum_{t=0}^{T} r_t$; where tau $\tau$ is the trajectory.

**2- Infinite-horizon discounted return**, which is the sum of all rewards ever obtained by the agent, but discounted by how far off in the future they’re obtained. 

$$
R(\tau)=\sum_{t=0}^{\infty} \gamma^t r_t
$$

> **Important definition**
Horizon: number of time steps in each episode; episode: is the agent’s journey from a clear start to a specific end.
> 

### **Putting it all together: Trajectories**

**Sequence of states, actions, and rewards** the agent experiences in the world. It’s like playing a game, making choices, and seeing the outcomes — that’s a trajectory!

$$
\tau = (S_0, A_0, S_1, A_1, ...)
$$

## Types of Reinforcement Learning tasks

A task is a specific **instance** of a problem. There are mainly two categories of tasks: episodic and continuous. **Episodic** tasks have a clear beginning and specific end, or a terminal state. In contrast, **continuous** tasks are ongoing, lacking a definitive endpoint, which requires the agent to improve the policy continuously while interacting with the environment.

![Image by [MohamedYosef101](https://linkedin.com/in/mohamedyosef101) (the author)](https://miro.medium.com/v2/resize:fit:700/1*pCXjbasrMKINOnbXqetUSw.png)

Image by [MohamedYosef101](https://linkedin.com/in/mohamedyosef101) (the author)

## **The Exploration/Exploitation trade-off**

Sometimes, agents need to explore to learn new things and exploit to use what they know to do well. But the question is still: how to balance between exploration and exploitation?

- **Exploration**: when the agent tries out different things in the environment to learn more about it. It’s like looking around to find new information.
- **Exploitation**: when the agent uses what it already knows to get the best results. It’s like using a map you’ve made to find the quickest route to a treasure.

![**Source**: [Exploration-Exploitation Dilemma (opengenus.org)](https://iq.opengenus.org/exploration-exploitation-dilemma/)](https://miro.medium.com/v2/resize:fit:462/0*5xpDJV7cK7CFK767.png)

**Source**: [Exploration-Exploitation Dilemma (opengenus.org)](https://iq.opengenus.org/exploration-exploitation-dilemma/)

## Two approaches for solving RL problems

The Policy is the function we want to learn. Our goal is to find the optimal policy π*, the policy that maximizes expected return when the agent acts according to it. We find this π* through training.

There are approaches to find this optimal policy *π**:

- **Directly**, by teaching the agent to learn which action to take, given a state; policy-based methods.
- **Indirectly**, teach the agent to learn which state is more valuable and then take the action that leads to more valuable states; value-based methods.