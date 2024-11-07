---
layout: ../../layouts/BlogPostLayout.astro
title: Agent Up In The Sky retrospective
pubDate: 2024-11-07
description: Retrospective on my first Godot game, made in 30 days
tags:
    - Game Development
    - Godot
released: true
---

In August I saw an announcement for Fedijam 2024 - a gamejam event for users of the fediverse. Goal was to create a game within a month, and the theme was "Up in the clouds".

I quickly got an idea that I want it to be a top down shooter where you stop terrorists on a plane - heavily inspired by one mission from Call of Duty: Modern Warfare 3 and [Fights In Tight Spaces](https://store.steampowered.com/app/1265820/Fights_in_Tight_Spaces/).

During this month I learned a lot about Godot, gameplay AI, and game development in general.

# Development

From the beginning, I decided that I want my game to be 3D and made out of voxel, primarily because I'm yet to learn how to do proper 3D modeling, and voxels are easy to understand.

## Player

For the character I quickly settled on generic secret agent: black suit, sunglasses, and bald head, because modeling hard would be hard. Originally he also had a pink tie, which I can't recall the reason for, but that was swapped for a black tie after my friend sent me an [article about Pope's Asia-Pacific trip](https://apnews.com/article/asia-pope-longest-trip-photo-gallery-7509ab7a625fc63d951c05ce5b67a133) and I saw how sharp was Pope's security dressed. Truly that's what a real secret agent should look like!

![](/blog/up-in-the-sky/player.png)

By 3rd of September I had basic movement done, with crouching, walking in every direction, and separate arms and legs animations playing at the same time. All of these mechanics mostly stayed unchanged during development.

<p>
<video controls width="720" muted>
  <source src="/blog/up-in-the-sky/upintheskies_0.webm" type="video/webm" />
  <source src="/blog/up-in-the-sky/upintheskies_0.mp4" type="video/mp4" />
</video>
<em>Note: as you can see in this clip, gun has spread, but at some point in development I decided that having spread didn't add anything to the game and only made me question if I missed my shot because there's some issue with hitboxes, or because I got unlucky</em>
</p>

## Enemies

After player was done, I started working on enemies for us to fight. I based their design on [Generic Bad Dudes](https://steamcommunity.com/sharedfiles/filedetails/?id=2208796176&searchtext=Generic+Bad+Dudes) models by Kommissar Kartofelov for Ravenfield. I really loved that design because of how flexible it is: these could be anarchists fighting the police; eco-terrorists fighting oil PMCs; revolutionary militia overthrowing the state, or anything else you could imagine. Simple, very cliche, but very effective design. Would be perfect for my game considering that I actually had no plot in mind and had no idea why are these terrorists even on board.

For their weapons I chose AK-47. For such a generic Bad Guy design, it only fits to choose the most generic Bad Guy weapon.

![](/blog/up-in-the-sky/enemy.png)

## Gameplay AI

For my game's AI I was investigating what do other games in top down shooter genre do for it. Unfortunately it seemed like they usually just made AI walk around, approach sound when heard, and then stand and shoot player until they die. Definitely would be easy to program, but that didn't sound exciting to me. I wanted my AI to look smart-ish.

I really wanted to choose Goal Oriented Action Planning (GOAP), system used in F.E.A.R., game often praised for fantastic AI (and from personal experience, it does feel pretty smart). The problem was that I could find a lot of theory of how it functions, but I could never really imagine how do I translate this theory into practice.

After looking around some more, I found Behavior Trees, and that system was way more straight forward: even from high-level overview I could already imagine what would it look like in code.
I chose Godot addon [Beehave](https://bitbra.in/beehave/) for behavior tree implementation, as it seemed pretty simple to use and extend.

Most important thing for my AI was what I called "AI points": points all over the map that tell AI where to go when needed, i.e. where's cover, where can player be flanked.

![](/blog/up-in-the-sky/ai_points.png)
_On this screenshot you can see a few of these "AI points". ![](/blog/up-in-the-sky/patrol.png) is a patrol point - when enemies are not alerted, they will go between these. ![](/blog/up-in-the-sky/duck_cover.png) is cover enemy can crouch behind, with ![](/blog/up-in-the-sky/arrow.png) showing from which direction it protects (so if arrow points at player, this cover point will protect enemy from them)._

<br />

Groundwork for AI was laid from 5th to 11th of September, but work on AI continued all the way until release.

<p>
<video controls width="720" muted>
  <source src="/blog/up-in-the-sky/upintheskies_1.webm" type="video/webm" />
  <source src="/blog/up-in-the-sky/upintheskies_1.mp4" type="video/mp4" />
</video>
<em>Clip from 11th of September. AI can now patrol the area, get alerted when they see the player, hide behind cover to reload, and flank player when they're not in sight.</em>
</p>

One of the AI features that a lot of players really liked was enemies pushing food carts to use as cover - that is done with AI points as well! When enemy is alerted, they will check if there's a "pull cart" point next to them, and if there is, pull a cart towards it. Unfortunately, this feature was a late addition to a project, so I don't have in-development footage of it.

## HUD and sound

HUD, or Heads Up Display, or health and ammo displays were inspired by Max Payne and PAYDAY: The Heist: characters silhouette representing health, and weapon's magazine representing ammo.

For sound design it really helped that Godot's animation system allows for a lot of different things to be present on the timeline, including sounds. I collected a bunch of free audio files from freesound.org and added them to animations, to make shooting and reloading sound relatively nice.

<p>
<video controls width="720">
  <source src="/blog/up-in-the-sky/upintheskies_2.webm" type="video/webm" />
  <source src="/blog/up-in-the-sky/upintheskies_2.mp4" type="video/mp4" />
</video>
<em>Clip from 13th of September, showing complete HUD and sound design in action.</em>
</p>

## Level design

On 15th of September I finally started working on first proper level. From the very beginning I had an idea that game would have 3 levels: luggage area, economy/business class, and premium class.

### Economy class

![](/blog/up-in-the-sky/level_1_0.png)
_First I started working on economy class. I very quickly realized that, unfortunaltely, real planes don't make for very interesting arenas, as it's just rows of seats._

<p>
<video controls width="720" muted>
  <source src="/blog/up-in-the-sky/physics_curtains.webm" type="video/webm" />
  <source src="/blog/up-in-the-sky/physics_curtains.mp4" type="video/mp4" />
</video>
<em>Very early on I told my friend that my plane didn't really feel like a plane, and they suggested adding curtains. Not sure if it added to the plane feel, but it definitely made for a fun addition.</em>
</p>

![](/blog/up-in-the-sky/level_1_2.png)
_Screenshot from the final build, showing new lighting, clouds outside the plane, and enemy who got ran over with food cart._

### Premium class

![](/blog/up-in-the-sky/level_2_0.png)
_For next floor, I decided it would make sense if you went the other way, so in previous level you were going up the screen, and on this one you are going down. This introduced some design challenges, for example, I had to make all walls thinner because otherwise it'd be easy to lose player._

![](/blog/up-in-the-sky/level_2_1.png)
_Final area was set in a restaurant. I really wanted to add breakable bottles, so during gunfight there would be glass bottles breaking all over the place, but I had a lot of technical difficulties implementing them. With end of the game jam being near, I decided to abandon breakable bottles idea._

### Tutorial

![](/blog/up-in-the-sky/level_0_0.png)
_For tutorial in luggage area, I wanted to go for dark rooms with dim lighting. I especially liked how much final area stood out, with its bright yellow light highlighting a table with some subtle enviromental storytelling._

# Release

On 31st of September game was officially finished. Game was uploaded to itch.io and soon I started getting my first feedback.

My final thoughts about this project:

-   Fedijam is not the most appropriate place for game's theme
-   I'm very proud of what I managed to make in 1 month with pretty much no prior Godot experience
-   AI pulling carts and taking cover to reload does indeed _feel_ smart
-   Tutorial completely failed at teaching players how to play the game. For example, crouching is taught by making player crouch under something to pass it - something that player actually never does in the game. Instead it should've put player in position where ducking behind something would help them avoid danger.
-   Targeting browsers for the project was a double-edged sword: on one side, it allowed more people to easily try it; on the other, "Compatibility" renderer Godot uses for browsers was really annoying to work with, as it simply doesn't support a lot of new nice features.
-   Godot overall is very nice to work with, even though sometimes it can be buggy.

In the end, I think I made a pretty decent little game. If you want to try it, you can [get it on itch.io](https://punishedbernadetta.itch.io/agent-up-in-the-sky).
There's a new Fedijam scheduled for December and I will definitely participate, and, hopefully, my new game will be even better.
