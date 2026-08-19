---
"simple-statistics": patch
---

Correct the third parameter of the `permutationTest` type declaration. It was named `string` and typed `string`, so TypeScript consumers saw `permutationTest(sampleX, sampleY, string?: string, ...)` with no indication of which values are accepted. It is now `alternative?: "two_side" | "greater" | "less"`, matching the JSDoc and the three values the implementation accepts before it throws. Runtime behavior is unchanged. The rename is not breaking, since TypeScript binds parameters positionally, but the narrowed type will newly reject a call that passes an arbitrary `string` — such a call already threw at runtime.
