---
title: 'Decoding keycap_config.xml'
pubDate: 2024-02-26
description: 'This is the first post of my new Astro blog.'
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'Placeholder'
tags: ["random stuff"]
---
I was recently playing Valkyria Chronicles, enjoying its fun story, fantastic unique tactical gameplay, and not-so-fantastic voice acting work, until I came back to the Book Mode after yet enough mission and thought "Menu button is Y. Wh(Y)? I'm using Dualshock 4, it should use its cool geometric shapes instead of silly latin latters!".

This is how I ended up spending 3 days trying to decode keycap_config.xml

## What even is keycap_config.xml?

If you look it up on Google right now, you won't get a clear answer just what is keycap_config.xml. It's usually simply listed among other random configuration files created by different Sega games, like Crazy Taxi and Sonic Adventure. And just like its peers, it's usually only mentioned as a file you should delete.

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

Well, it sure contains something related to input devices, and considering that there's no way you can store over 5604 bytes (or possibly bits) of some controller configuration 167 times, it must be something else - images! We found the controller images! But... how do we get a PNG ouf of that text?

## But first let's talk about text

Before I explain how do we turn images into text, let's talk about why is it even required in the first place.

Computers don't know the difference between images, text, or video. To a computer all of it is just numbers, meaning that word `cat` to a computer is exactly the same as numers 99, 97, and 116.

That's because what numbers mean is up to the programmer, and I, the programmer, declare that 99 means `c`, 97 means `a`, and `116` means `t`, and I will treat those numbers as such.

And because everything is just numbers, you can try treating everything as text. Try it now, upload any image here and see what it looks like if you treat it as text. It actually doesn't even have to be an image, you can upload any file you want and I will show you what is looks like if we treat it as text.

(TODO: Write demo in question)

Cool right? So we can just take any image we want, treat that image data as text, and shove it inside of any text we want?

Well, it's actually not that simple.
