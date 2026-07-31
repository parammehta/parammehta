# Utilities Reference

All utilities live in `src/utils/`. Import via the `baseUrl`:

```js
import { clamp } from 'utils/clamp';
import { cssProps, classes, media } from 'utils/style';
```

---

## clamp

```js
clamp(value, boundOne, boundTwo?)
```

Clamps a number within bounds. With two bounds, clamps between them (order-agnostic). With one bound, clamps to a maximum of `boundOne`.

```js
clamp(15, 0, 10);  // 10
clamp(-5, 0, 10);  // 0
clamp(15, 10);     // 10
```

---

## date

```js
formatDate(date)
```

Formats a date string or Date object using `toLocaleDateString` with full month name, 2-digit day, and numeric year.

```js
formatDate('2024-03-15');  // "March 15, 2024"
```

---

## delay

```js
await delay(1000);
```

Returns a promise that resolves after the given milliseconds. Async sleep utility.

---

## image

### loadImageFromSrcSet

```js
const chosenSrc = await loadImageFromSrcSet({ src, srcSet, sizes });
```

Creates a temporary `Image` element, waits for it to load, and resolves with the browser-chosen `currentSrc` from the srcSet.

### srcSetToString

```js
srcSetToString([{ src: '/img.jpg', width: 800 }]);
// "/img.jpg 800w"
```

Converts a structured srcSet array to a standard srcSet string. Passes strings through unchanged.

### generateImage

```js
const blobUrl = await generateImage(800, 600);
```

Creates a transparent PNG blob URL of the given dimensions using a canvas. Defaults to 1x1.

### resolveSrcFromSrcSet

```js
const realSrc = await resolveSrcFromSrcSet({ srcSet, sizes });
```

Resolves which source the browser would pick from a srcSet. Works by generating transparent placeholder images at each width, letting the browser choose, and mapping back to the real URL. Useful for non-HTML contexts like Three.js textures.

---

## mdx

Server-side utility for MDX blog posts.

- `POSTS_PATH` — absolute path to `src/posts` directory
- `postFilePaths` — array of `.md`/`.mdx` filenames found at build time

---

## style

### media

Breakpoint map:

```js
{
  desktop: 2080,
  laptop: 1680,
  tablet: 1040,
  mobile: 696,
  mobileS: 400,
}
```

### pxToNum / numToPx

```js
pxToNum('16px');  // 16
numToPx(16);      // '16px'
```

### pxToRem

```js
pxToRem(32);  // '2rem'  (divides by 16)
```

### msToNum / numToMs

```js
msToNum('300ms');  // 300
numToMs(300);      // '300ms'
```

### rgbToThreeColor

```js
rgbToThreeColor('255 128 0');  // [1, 0.502, 0]
```

Converts space-separated RGB string to Three.js-compatible 0-1 float array.

### cssProps

```js
cssProps({ delay: 300, opacity: 0.5, width: 100 }, existingStyle);
// { '--delay': '300ms', '--opacity': 0.5, '--width': '100px', ...existingStyle }
```

Converts an object to CSS custom property style object. Auto-converts numeric values: `delay` keys become `ms`, other numerics (except `opacity`) become `px`.

### classes

```js
classes(styles.button, isActive && styles.active, className);
// Joins truthy values with spaces, filters out falsy
```

Simple classnames utility for concatenating CSS module classes.

---

## three

Three.js setup and cleanup helpers.

### Loaders

- `modelLoader` — pre-configured `GLTFLoader` with Draco decoder (`/draco/`)
- `textureLoader` — `TextureLoader` instance

### Cleanup functions

```js
cleanScene(scene);       // Disposes all mesh geometries and materials in a scene
cleanMaterial(material); // Disposes a material and all its texture properties
cleanRenderer(renderer); // Disposes and nulls a WebGL renderer
removeLights(lights);    // Removes an array of lights from their parents
```

### Traversal

```js
const child = getChild('Screen', gltfScene);
```

Traverses a Three.js object tree and returns the first child matching the name.

---

## throttle

```js
const throttled = throttle(handleScroll, 100);
```

Classic throttle: invokes `func` at most once per `timeFrame` milliseconds, dropping intermediate calls.

---

## timecode

### formatTimecode

```js
formatTimecode(90061000);  // "25:01:01:00"
```

Converts milliseconds to `HH:MM:SS:CC` format (centiseconds).

### zeroPrefix

```js
zeroPrefix(5);  // "05"
```

Pads single-digit numbers with a leading zero.
