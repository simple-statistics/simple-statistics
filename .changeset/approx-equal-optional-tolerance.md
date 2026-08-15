---
"simple-statistics": patch
---

Make `approxEqual`'s `tolerance` parameter optional in its type declaration. The implementation defaults it to the library's `epsilon` (0.0001), but the declaration required all three arguments, so TypeScript rejected the two-argument call the runtime supports. Runtime behavior is unchanged.
