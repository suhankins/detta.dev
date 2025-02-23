---
layout: ../../layouts/BlogPostLayout.astro
title: 'How the heck do you use combining unicode characters???'
pubDate: 2025-02-23
description: 'Explaining why instead of Â you keep getting A◌̂'
tags:
    - Random stuff
released: true
---

You ever go to [Wikipedia page on Combining Diacritical Marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks), copy the combining characters and paste them after letters only to find it didn't combine anything?

# tl;dr

`◌` is a character too, its hex is `E2 97 8C` and if you remove it, it will work just fine. i.e.

| | Instead of this | It should be this |
|---|---|---|
| Hex | <dfn><abbr title="A">41</abbr></dfn> <dfn><abbr title="◌">E2 97 8C</abbr></dfn> <dfn><abbr title="Combining character  ̂">CC 82</abbr></dfn> | <dfn><abbr title="A">41</abbr></dfn> <dfn><abbr title="Combining character  ̂">CC 82</abbr></dfn> |
| Text | A◌̂ | Â |

You can remove those 3 bytes using something like [HxD](https://mh-nexus.de/en/downloads.php?product=HxD20).

<br />

In JavaScript you can do

```js
'A◌̂'.split('').filter((letter) => letter !== '◌').join('')
```

because `split('')` splits `◌̂` into `◌` and ` ̂`, surprisingly.

<br />

Had to find that out for [my implementation of xkcd 3054](https://scream-cipher.detta.dev/).
