---
"simple-statistics": major
---

Stop downleveling to ES5 in distributed builds

For a long time, simple-statistics has been compiled down to ES5,
an ancient version of JavaScript, in order to support very old browsers
like Internet Explorer. This cost a tiny bit of performance and size,
and it required an additional development dependency.

Internet Explorer is nearly extinct - global usage of IE 11 is at 0.21%,
and it's time to drop that dependency and the step. So this release
does not transpile down. It's very unlikely that this will affect anyone,
but if you are still deploying to IE11 users, you'll need to transpile
on the application side after this release. The vast majority of users
will not need to do anything.
