type Data = object;
type Item = object;
type OddsSums = object;

/**
 * https://simplestatistics.org/docs/#bayesianclassifier
 */
declare class BayesianClassifier {
  public totalCount: number;
  public data: Data;
  train(item: Item, category: string): void;
  score(item: Item): OddsSums;
}

export default BayesianClassifier;
