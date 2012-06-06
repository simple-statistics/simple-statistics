## Naive Bayesian Classification

Many implementations of the Bayes algorithm use [additive smoothing](http://en.wikipedia.org/wiki/Additive_smoothing),
aka Laplace smoothing, in order to make sure that values of 0 don't end up
in the denominator.

References:

http://www.dusbabek.org/~garyd/bayes/

* Specialized for words

http://ebiquity.umbc.edu/blogger/2010/12/07/naive-bayes-classifier-in-50-lines/

* Uses an odd file format that require explanation
* Calls laplace smoothing 'add one smoothing'

https://github.com/reddavis/Naive-Bayes

* One of the best!

http://search.cpan.org/~kwilliams/Algorithm-NaiveBayes-0.04/lib/Algorithm/NaiveBayes.pm

## Bayes theorem

In math-speak:

             P(B|A)P(A)
    P(A|B) = ----------
                P(B)

Traditionally, bayes algorithms take vectors (arrays)
as input. This will as well, though a utility function
should easily allow users to think in objects (maps).

### PDF

* [Naive Bayes Classifier example](http://www.inf.u-szeged.hu/~ormandi/ai2/06-naiveBayes-example.pdf)
* [Lecture with good, basic worked example.](http://cis.poly.edu/~mleung/FRE7851/f07/naiveBayesianClassifier.pdf)
