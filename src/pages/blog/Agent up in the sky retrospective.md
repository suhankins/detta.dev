---
layout: ../../layouts/BlogPostLayout.astro
title: Agent Up In The Sky retrospective
pubDate: 2024-10-03
description: Retrospective on my first Godot game made in 30 days
tags:
  - game_development
---
In August I saw an announcement for Fedijam 2024 - a gamejam event for users of the fediverse. Goal was to create a game within a month, and the theme was "Up in the clouds".

I quickly got an idea that I want it to be a top down shooter where you stop terrorists on a plane - heavy inspired by one mission from Call of Duty: Modern Warfare 3  and [Fights In Tight Spaces](https://store.steampowered.com/app/1265820/Fights_in_Tight_Spaces/).

During this month I definitely learned a lot about Godot, AI in games (not the current hype cycle type of AI, but like enemy AI), and game development in general.

# Development
From the beginning, I decided that I want my game to be 3D and made out of voxel, primarily because I'm yet to learn how to do proper 3D modeling, and voxels are easy to understand.

## Player
For the character I quickly settled on generic secret agent: black suit, sunglasses, and bald head, because modeling hard would be hard. Originally he also had a pink tie, which I can't recall the reason for, but that was swapped for a black tie after my friend sent me an [article about Pope's Asia-Pacific trip](https://apnews.com/article/asia-pope-longest-trip-photo-gallery-7509ab7a625fc63d951c05ce5b67a133) and I saw how sharp was Pope's security dressed. Truly that's what a real secret agent should look like!

By 3rd of September I had basic movement done, with crouching, walking in every direction, and separate arms and legs animations playing at the same time. All of these mechanics mostly stayed unchanged during development.
![[upintheskies_0 1.mp4]]*Note: as you can see in this clip, gun has spread, but at some point in development I decided that having spread didn't add anything to the game and only made me question if I missed because there's some issue with hitboxes, or because I got unlucky*

## Enemies
After player was done, I started working on enemies for us to fight. I based their design on [Generic Bad Dudes](https://steamcommunity.com/sharedfiles/filedetails/?id=2208796176&searchtext=Generic+Bad+Dudes) models by Kommissar Kartofelov for Ravenfield. I really loved that design because of how flexible it is for roleplaying: these could be anarchists fighting the police, eco-terrorists fighting oil PMCs, militias, or anything else you could imagine. Simple, very cliche, but very effective design. Would be perfect for my game considering that I actually had no plot in mind and had no idea why are these terrorists even on board.

For their weapons I chose AK-47. For such a generic Bad Guy design, it only fits to choose the most generic Bad Guy weapon.

## AI (the fun kind)
^ It's titled "the fun kind" because I find generative AI to be boring.

For my game's AI I was investigating what do other games in top down shooter genre do for them, but unfortunately it seemed like it was usually just "walk around, approach sound when heard, stand and shoot player until you die". Definitely would be easy to program, but that just didn't sound exciting to me. I wanted my AI to look smart-ish.

I really wanted to choose Goal Oriented Action Planning (GOAP), system used in F.E.A.R., game often praised for fantastic AI (and from personal experience, it sure feels pretty smart). The problem was that I could find a lot of theory of how it functions, but I could never really imagine how do I translate this theory into practice.

After looking around some more, I found Behavior Trees, and that system was way more straight forward, and even from high-level overview I could already imagine what would it look like in code.
I chose Godot addon [Beehave](https://bitbra.in/beehave/) for behavior tree implementation, as it seemed pretty simple to use and extend.

