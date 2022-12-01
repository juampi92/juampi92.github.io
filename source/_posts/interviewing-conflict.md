---
extends: _layouts.post
section: content
title: Interviewing Conflict
date: 2022-11-30
description: It is very common to start a technical interview by giving a coding challenge to the candidate and observing their problem-solving skills. Although technical skills are important, most developers face many soft-skill problems on a daily basis.
thumbnail_image: /assets/images/2-interviewing-conflict.jpg
---

## Intro

It is very common to start a technical interview by giving a coding challenge to the candidate and observing their problem-solving skills.

Although technical skills are important, most developers face many soft-skill problems on a daily basis. From reviewing pull requests to making RFCs, developers have to exchange ideas, negotiate, and deal with opinions from different cultures.

It is the aim of this article to present interview strategies that can be used to detect conflicting candidates before hiring them.

![Interviewing Conflict Preview](/assets/images/2-interviewing-conflict.jpg)
Photo by [Diogo Hungria](https://unsplash.com/@hungriadb){target=_blank} on Unsplash

## The price of pride

Developers with experience tend to have big egos.
Pride can make people focus on who is right or wrong, instead of working on what is right for the codebase.
These long discussions tend to be very exhausting for everyone involved, lowering the morale of the developers involved, and preventing them from ever arguing with them again.

## Interviewing for Conflicts

Would it be helpful to be able to identify candidates who will not integrate well with the rest of the team during the interview process?

[It is common practice](https://www.google.com/search?q=interviewing+conflict){target=_blank} in the interview process to explicitly ask the candidate how would they deal with conflict. They are usually asked to describe a situation where they had conflicts with a colleague, and how did they manage to solve the problem. Although the intention is good, this is a theoretical question, and the practice can be far from ideal.

A practice I adopted while interviewing is to focus on generating controlled conflicts and observing how the candidate reacts. Are they immediately defensive or are they considering new ideas? Are they asking questions to understand it better, or are they fixed in their initial solution? Can they recognize the pain points in their solution? Can they comprehend the tradeoffs from both solutions and make an informed decision considering both ideas?

This practice is otherwise known as [devil’s advocate](https://en.wiktionary.org/wiki/devil%27s_advocate#Noun){target=_blank}, and it is not only useful to test the strength of a proposal, but also to test how someone reacts to a difference of opinion from their own.

## Do it yourself

This technique works only if you are going against an idea of their own. It helps if previous to the interview you reviewed a take-home test. Before the interview, we look for opinionated decisions that might have trade-offs with other approaches: are they using a specific pattern? Are they separating their responsibilities correctly? Could they be more decoupled?

Once you’ve recognized these potential points, you should formulate a question that challenges the candidate to find weaknesses in them. You can achieve this by pointing out an edge case or proposing hypothetical scenarios where the solution doesn’t scale correctly.

You should show that you don’t agree with their implementation, but instead of saying why you don’t, you should describe a situation that illustrates its flaws.

The exercise is for them to reflect on their solution, understand the weakness you describe, and propose an alternative that will contemplate both, even if they don’t fully agree. Here, the goal is to get them to analyze the trade-offs of both solutions and engage in a productive discussion.

It sounds simple, but you would be surprised at how many people act defensively against their code and have a hard time letting go of their own implementation.

## Conclusion

Overall, what makes a high-performing team is not only having superhero developers, but having a healthy dynamic between team members.

Team members who can communicate ideas without getting personal and collaborate towards a greater codebase will prove more valuable in the long run.
