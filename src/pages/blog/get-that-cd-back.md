---
layout: ../../layouts/BlogPostLayout.astro
title: 'Retrospective on GET THAT CD BACK'
pubDate: 2025-05-11
description: 'Retrospective on my first person brawler created in 9 days for DiscMaster Jam.'
tags:
    - Game Development
    - Godot
released: true
---

# Contents

# Introduction

On April 21st, Internet Archive and CanDev organized a game jam centered around their [DiscMaster](https://discmaster.textfiles.com/): archive and search engine for a ton of old CDs full of pictures, sounds, music, and other goodies, a lot of which are not preserved online.

The goal was to make a game using only (or mostly) DiscMaster assets in 9 days. Looked really fun to me, so I joined.

I quickly got this idea of a game where you want to share an old game with a friend, and as you are doing so, corporate lawyers are breaking in and stealing your CD, and you have to chase them and beat them all up in the process.

While it's not my first time making something for a game jam, it was still a lot of fun.

Highly recommend playing it before reading the blog post :3

https://punishedbernadetta.itch.io/get-that-cd-back

# Development

## Basics

I started by downloading Kenney's Starter Kit FPS: a template Godot project with basic first person player controls. I removed everything unnecessary from it, like weapon switching, since my game doesn't have any weapons. I reused shooting code for punching, which in retrospect was a mistake, since no one expects punches to land exactly in the center of the screen.

I was briefly considering keeping jumping in the game, even added some tweening to hands to make you put them down while you are in the air, but when I started actually adding enemies, I realized that jumping is completely unnecessary, so it was removed as well.

I was looking for a good model for enemy lawyers, and luckily for me, DiscMaster collection features a lot of Half-life mods, some featuring custom skins for G-Man!

![Picture showing a low-poly man in a black suit and sunglasses, who looks a lot like G-Man from Half-life 1.](get-that-cd-back/_lawyer.png)

I threw together some animations for them. Godot's animation tools, while slightly improved in version 4.4, are still really annoying.

![Clip showing player fighting 3 enemies who walk through each other in a very basic arena](/blog/get-that-cd-back/_day_1.webm)
*Clip from the end of Day 1. Initially enemies could walk through each other, but I thought that looked janky. I had a lot of ideas for complex systems to make enemies go to the sides of each other to surround the player, but making them solid and giving them capsule collision shape worked just as well.*

## Building levels

To build levels for my game I decided to use [Cyclops Level Builder](https://github.com/blackears/cyclopsLevelBuilder). It's a plugin for Godot that adds level editing capabilities similar to those in Hammer editor, used to create maps for Source games. As I had a bit of experience with Hammer, it was a natural fit for me.

Using Cyclops also gave me a direction for my artstyle: GoldSrc. All props through levels built out of brushes, all low-poly, with blurry textures. Would be even closer to GoldSrc aesthetic if I could use prebaked lighting, but Cyclops doesn't allow for that without making the map uneditable.

![Screenshot showing player standing in front of old low-poly computer, with an anime poster to the right.](get-that-cd-back/_pcsetup.png)
*After sharing this screenshot, Lilithpad on DiscMaster discord asked if computer could be destroyed. I thought it was a funny idea, and that's how my game got a Breakable Prop system. That system ended up so versatile, that every interactable thing in the game is actually a breakable prop.*

Speaking of Cyclops limitations, another Cyclops limitation is that Godot's default navigation system doesn't work with Cyclops levels at all. I guess Cyclops blocks aren't considered solid by it? Either way, because of that I actually couldn't even make AI follow you around corners, which surprisingly ended up not being too noticeable anyways.

![Clip showing player fight 2 lawyers in an apartment with a desk and a sofa. After defeating them, player enters brick hallway and fight 3 more enemies, one of them throwing papers like shurikens.](/blog/get-that-cd-back/_day_2.webm)
*In this clip from Day 2 you can witness my first ever location built in Cyclops. I think I nailed the GoldSrc architecture style.*

## Scripted events

As fun as it was to fight enemies who just stand in the open waiting for you to come over and beat them up, I obviously needed fancier ways for enemies to appear. That's how I created the main driving force behind most of the game: Scriptable Spawn system.

It was quite simple: for every scripted sequence, I created a node inside of which I defined every "Animation Object" and enemy that it should trigger. "Animation Objects" could range from doors getting kicked open, to dialogue playing, to taking control away from the player.

```mermaid
flowchart TD
    Start(["Trigger"])
    Start ---> A["'Turn off the lights' animation object"]
    A ---> A_A["Wait 1s"]
    A_A ---> A_B["Turn off the lights"]
    Start ---> B["'Kick open a door' animation object"]
    B ---> B_A["Wait 5s"]
    B_A ---> B_B["Play door kicking animation"]
    Start ---> C["Enemy"]
    C ---> C_A["Wait 6s"]
    C_A ---> C_B["Walk a few meters forward"]
```

It had a few issues, like for every object I had to manually specify its delay, which made it difficult to understand what's the gap between different things activating. I think if I were to improve this system, I'd instead make it a queue, and control all delays with separate delay objects. This way, instead of activating all objects at once and delays being controlled per each object, I could define a timeline of events that should happen.


```mermaid
timeline
    title Improved Event System
    Wait 1s
    'Turn off the lights' animation object : Turn off the lights
    Wait 4s
    'Kick open a door' animation object : Play door kicking animation
    Wait 1s
    Enemy : Walk a few meters forward
```

![Clip showing a scripted sequence, where after player walks a few meters down the hallway, they hear voice saying "Stop that madman" and huge wardrobe gets pushed out of a door to the left, blocking the hallway. A second later, door closer to player gets kicked out, and player proceeds through small rooms fighting enemies.](/blog/get-that-cd-back/_day_4_scripted_sequence.mp4)
*Clip from day 4, showing scripted sequence system in action.*

## Level 2

After fighting your way through an apartment building, next level is set at the Corporation HQ. Initially it was meant to be a series of fights through office cubicles, but then I remembered The Matrix lobby fight - and knew I had to include it.

![Clip showing that same lobby. Player looks behind, revealing glass smashed by a blue car, with a rainy street outside. Player goes forward towards the end of the lobby, presses a button, and it goes dark. Then, one by one lights turn back on.](/blog/get-that-cd-back/_day_5_scripted_light.mp4)
*Clip from day 5. After building the lobby, I thought it would look absolutely epic if lights dramatically turned off and on. It did look awesome!*

Fight in the lobby was very basic: just 8 doors, 4 ranged enemies, and 4 punching enemies. Despite being a simple box with a bunch of bad guys, it ended up playing really well and was a really fun addition to the game.

## Level 3

Third level wasn't initially planned at all. Originally, level 2 was supposed to be a 2 storey neoclassical building with a few generic offices. Though obviously after I decided to make entrance look like lobby from The Matrix, that idea was abandoned.

New level 3 was partially based on Tai Yong Medical level from Deus Ex: Human Revolution. I really loved its warm and friendly color scheme, exactly what I think offices of the most evil corporations look like. Not to mention contrast between the dark colors and oppressive architecture of the previous level.

![Blockout of level 3, showing a reception desk, corridor to the left, and 2 big planters.](get-that-cd-back/_level_3_in_progress.png)

![Final version of level 3, showing same location but now with a wooden floor, marble walls, planters made out of bricks, and quite a few sofas and TVs.](get-that-cd-back/_level_3_final.jpg)

CEO's office was very rushed. Originally, I had ideas to add a lot of details, like trophies saying "BIGGEST ASSHOLE EVER", diplomas of excellency at making money, etc. In the end, I ran out of both time and motivation, so office ended up quite empty. I did try really hard to have nice lights in it, though.

![Screenshot showing CEO's office, with a massive window showing skyscrapers and yellow skies, a huge desk with big sign saying "CEO", and a few sofas and TVs.](get-that-cd-back/_2025-05-11_015330.jpg)

![Screenshot showing player standing in front of a door with a sign "License key required". Door has a huge crack and a "fragile" sticker.](get-that-cd-back/_2025-05-11_015311.jpg)
*I really wanted final door to say "License Key Required", but I was anxious players would think they actually need to find a license key somewhere. My friend suggested adding a huge crack on the door, since players are likely to recognize cracked things as breakable. Even after these changes, I thought players still might not notice it, so I had a silly idea to add a "Fragile" sticker as well.*

## Total Awesomesauce

I wanted game's MacGuffin to be some rare but totally awesome game. Video game so awesome, it could only have one name: "Total Awesomesauce".

![Picture of a disc titled Total Awesomesauce. Its art shows a pirate parrot on a motorcycle with an AK-47 on hellish backdrop, with a demon to the right of it. Disc has a Corporation logo, and text at the bottom that says "By Company That Was Closed 2 Days After Release".](get-that-cd-back/_total_awesomesauce_cd.png)
*Design of the disc was inspired by a game I tried making ages ago while learning Python. It was called "Parrot to Hell": side scrolling shoot-em-up where you play as a parrot on a motorcycle with an AK-47 driving on a Highway to Hell and shooting demons. Game never got past a prototype stage, though its idea is, as some would say, total awesomesauce.*

## Cutscene voice acting

Originally, I was aiming for "50-99% DiscMaster Assets" category, and those 1-50% non-DiscMaster assets were all meant to be voice lines for cutscenes. My idea was to ask my friends to help me voice act for the game, but as end of the jam was getting closer, I realized that my plan had 2 issues:

1. It's surprisingly hard to find time when more than 1 of my friends is free.
2. None of them have the voice I needed for the CEO.

With this realization, me and my friend started brainstorming what are we going to do now.

He suggested doing Banjo & Kazooie style voice acting, where instead of proper dialogue, characters just make speech-like noises. I thought it was a great idea, so I opened DiscMaster website and started looking for some voice similar to what I imagine CEO should sound like. After thinking about it for a bit, I realized that perfect voice would be the same person who gave CEO, and all the lawyers, their models - G-Man from Half-life 1! And I knew DiscMaster has Half-life 1 assets, though apparently only German version of them.

After testing that style of voice acting, we thought it didn't sound great, but my friend had a genius idea: why not just use those German voice lines directly? It's not like too many people would notice that spoken dialogue is complete nonsense. And that's how game got all its voice acting!
After release I asked my Austrian friend to check my game out and he burst out laughing during opening cutscene.

# Conclusions

1. Cyclops Level Builder, while really nice to have, is very clunky. For my next project I should probably learn how to use [func_godot](https://github.com/func-godot) instead, as it allows you to use more mature map editors like [TrenchBroom](https://trenchbroom.github.io/).
2. Feedback for where punches actually hit is really bad, and a lot of players struggled with figuring it out. I should've addressed it earlier and just made whole area in front of the player a hitbox.
3. I think the overall art direction was stellar. With limited time and assets I had, going for GoldSrc mod style was the right move.
4. There definitely should at least be an option to punch final boss. While I think the idea to have "final boss" who taunts you the whole game and then hides like a coward was pretty funny, people still wished they could beat him up.

I also wish I added a timer and other statistics on the end screen, like "Lawyers taught a lesson: X/Y", or "Destructible objects destructed: X/Y". Would add some replayability.

I'm very happy people enjoyed my game. Isn't that what game development is all about: making people happy?

Go play it now! I hope you enjoy it! https://punishedbernadetta.itch.io/get-that-cd-back
