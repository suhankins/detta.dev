---
layout: ../../layouts/BlogPostLayout.astro
title: Decoding keycap_config.xml
pubDate: 2024-02-26
description: This is the first post of my new Astro blog.
tags:
  - random
  - stuff
---
I was recently playing Valkyria Chronicles, enjoying its fun story, fantastic unique tactical gameplay, and not-so-fantastic voice acting work, until I came back to the Book Mode after yet enough mission and thought "Menu button is Y. Wh(Y)? I'm using Dualshock 4, it should use its cool geometric shapes instead of silly latin latters!".

This is how I ended up spending 3 days trying to decode keycap_config.xml

## What even is keycap_config.xml?

If you look it up on Google right now, you won't get a clear answer just what is keycap_config.xml. It's usually just listed among other random configuration files created by different Sega games, like Crazy Taxi and Sonic Adventure. And just like its peers, it's usually only mentioned as a file you should delete if you have any issues.

Well, that isn't helpful at all. But XML is just a plain text format, so it shouldn't be too hard to figure out what does it do.

Opening it in text editor reveals that it is indeed a simple XML files, but data it contains is quite odd.

```xml
<?xml version="1.0" ?>
<key_caps>
    <keyboard_primary>
        <k1_0 BinSize="5604">CPsS_oF???oBO???d????SA????...</k1_0>
        <k1_1 BinSize="5604">CPsS_oF???oBO???d????SA????...</k1_1>
        ...
        <k1_167 BinSize="6852">CPsS_oF???oBO???h????cA??...</k1_167>
    </keyboard_primary>
    <xbox>
    ...

```

It sure contains something related to input devices, and considering that there's no way you can store over 5604 bytes (or possibly bits) of some controller configuration 167 times, it must be something else - images! We found the controller images! But... how do we get a PNG ouf of that text?

## But first let's talk about text

Before I explain how do we turn images into text, let's talk about why is it even required in the first place.

Computers don't know the difference between images, text, video, or anything else. To a computer all of it is just numbers, meaning that word `cat` to a computer is exactly the same as numers 99, 97, and 116.

That's because what numbers mean is up to the programmer, and I, the programmer, can declare that 99 means `c`, 97 means `a`, and `116` means `t`, and I will treat those numbers as such.

So we can just take any image we want, treat that image data as text, and shove it inside of any text we want? Well, it's actually not that simple.

It would be a pain if every programmer just decided themselves what number is what letter. You would receive a plain text file from your friend and be unable to read it because numbers they chose for letters are different from those you chose. For that reason, all programmers agreed that for encoding English we will all use the same numbers defined for ASCII.

ASCII is an 7-bit encoding for text. It's pretty good, includes all English letters, uppercase and lowercase, even all numbers and some special symbols. But there are 2 issues:
1. 7-bits per letter means that for text to actually be ASCII, one bit always has to be 0. That means we can't really treat any arbitrary data as ASCII.
2. 33 out of 128 letters used in ASCII are not printable characters. It's either control codes for [teletypes](https://en.wikipedia.org/wiki/Teleprinter), or other control codes that don't actually represent text.

Okay, so directly shoving our data into text won't work. But we still have like 95 characters that are usable actual text. Can we come up with some system to send any data using some of those?

Yes, we can.

## Base64

System commonly used for that purpose is called base64. The idea is quite simple: what if we take 64 letters, decide what 6 bits each of them represents, and then encode our data in them.
