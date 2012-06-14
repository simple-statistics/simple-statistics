## Naive Bayesian Classification

Many implementations of the Bayes algorithm use
[additive smoothing](http://en.wikipedia.org/wiki/Additive_smoothing),
aka Laplace smoothing, in order to make sure that values of 0 don't end up
in the denominator.

## Bayes theorem

In math-speak:

             P(B|A)P(A)
    P(A|B) = ----------
                P(B)

Traditionally, bayes algorithms take vectors (arrays)
as input. This will as well, though a utility function
should easily allow users to think in objects (maps).
