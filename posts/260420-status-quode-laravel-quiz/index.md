---
title: "Laravel Status Quode Quiz"
date: "2026-04-20"
description: "Think you know Laravel's conventions? Test your knowledge of the patterns, defaults, and naming rules that make a Laravel codebase feel predictable."
thumbnail_image: "./cover.png"
---

<script>
  import Quiz from '$lib/components/quiz/Quiz.svelte';
  import quizData from './quiz.json';
</script>

Laravel has a set of conventions and patterns, sometimes invisible, that guide how you're meant to write code, what's commonly known as "the Laravel way." Most of these aren't enforced through strict rules; they live in the default behavior of the framework itself, acting as natural guides for anyone picking it up.

I call this implicit layer [The Status Quode](/blog/260414-status-quode/): the unwritten rules, naming patterns, and structural defaults that make a codebase feel predictable. Laravel manifests its Status Quode through its documentation (which consistently models certain patterns), its `make:` commands stubs (which generate convention-following boilerplate), its default "guess" behavior (where table names, foreign keys, and relationships are inferred without configuration), and tools like Laravel Pint (which bakes style decisions into a formatter).

## The Quiz

How well do you actually know Laravel's Status Quode? Below is a quiz with 13 questions across different categories testing your knowledge of these conventions and defaults. Pick an answer—it locks immediately, and you'll see the explanation behind it.

Your score is saved in your browser, so you can come back where you left off.

<Quiz {quizData} />
