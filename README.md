A project to learn about and make simple, slow reference implementations
of raster classification algorithms.

Implementations are planned to be in Javascript initially. Unlike way too many
examples, there's no throwing you for a loop: algorithms will be throughly documented
both externally and line-by-line. Also, implementations will start with zero assumption
of purpose: the bayesian classification, for instance, will not be of the classic
'spam filter' type initially - it will be a simple implementation of the bayes theorem.

This also attempts to be an implementation in simple, idiomatic Javascript
with no external dependencies. Code is tested in node.js but will be
browser-compatible, with descriptive variable names and no emphasis on
'hitting a line count'.

## Algorithms

### Decision Tree

* [ID3](http://en.wikipedia.org/wiki/ID3_algorithm) - implementation started
* [C4.5](http://en.wikipedia.org/wiki/C4.5_algorithm)

### Linear

* [Naive Bayes](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)

### References

* http://gis-lab.info/qa/dtclassifier-eng.html

### Other Implementations

* https://github.com/NaturalNode/apparatus
* https://github.com/harthur/brain (bayes, neural networks)

This code is released into the Public Domain.
