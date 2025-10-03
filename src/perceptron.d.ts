/**
 * https://simple-statistics.github.io/docs/#perceptronmodel
 */
declare class PerceptronModel {
    public weights: readonly number[];
    public bias: number;
    predict(features: readonly number[]): number;
    train(features: readonly number[], label: number): PerceptronModel;
}

export default PerceptronModel;
