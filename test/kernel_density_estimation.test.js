/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

// Data generated in R
// sample:
// X <- rnorm(50)
// toString(X)
//
// density:
// d <- density(X, from=-3, to=3, n=7, bw="nrd")
// paste(paste("[", d$x, ", ", d$y, "]", sep=""), collapse=", ")
const normallyDistributed = {
    sample: [
        -1.85884822191703, 0.602520739129486, 0.888077007699802,
        -0.196371268020604, -0.261434475360111, -0.555806535734196,
        -0.535685767427025, -0.805785306288279, -0.0542408941260752,
        -1.99949822804059, -1.31781357407021, 0.551938395645566,
        -0.243919697027738, -0.39133049951603, -0.0197245301228612,
        -0.448827587584495, -1.28606487855844, 1.52470482345308,
        -1.92242657930281, 1.50862845897339, 0.756698701211952,
        1.03637617724389, 1.2724121144235, 0.227137867400568, 0.614194690129868,
        2.03223772207173, -1.29814099266873, -0.474986717342843,
        -0.153962343622878, -0.730739393654425, -1.12457125027309,
        -0.444103197987559, 0.459771149889531, 0.445498717584673,
        0.0736304465553301, 0.340392907537276, 0.807820303672019,
        -0.0478512608947293, -0.485938052839795, -0.249702764311268,
        0.847717867319239, -0.631380378496465, -1.23218376426349,
        1.8274052037247, 0.303031661057796, 0.940686211521394,
        -0.565932683487323, -0.793791866093677, -0.950742000255766,
        -2.05768339176415
    ],
    density: [
        [-3, 0.00622253574711248],
        [-2, 0.0955008985482363],
        [-1, 0.26278412857974],
        [0, 0.35334369527338],
        [1, 0.214348469979353],
        [2, 0.0652701909587952],
        [3, 0.00303679902517155]
    ]
};

test("kernel density estimation", function (t) {
    t.test("default kernel and bandwidth", function (t) {
        const kde = ss.kernelDensityEstimation(normallyDistributed.sample);
        for (let i = 0; i < normallyDistributed.density.length; i++) {
            const x = normallyDistributed.density[i][0];
            const expected = normallyDistributed.density[i][1];
            const actual = kde(x);
            t.ok(
                Math.abs(actual - expected) / expected < 0.1,
                "density(" + x + ") = " + actual + " != " + expected
            );
        }
        t.end();
    });

    t.test("gaussian default kernel", function (t) {
        t.same(
            ss.kernelDensityEstimation(normallyDistributed.sample),
            ss.kernelDensityEstimation(
                normallyDistributed.sample,
                "gaussian",
                "nrd"
            )
        );
        const SQRT_2PI = Math.sqrt(2 * Math.PI);
        t.same(
            ss.kernelDensityEstimation(normallyDistributed.sample),
            ss.kernelDensityEstimation(
                normallyDistributed.sample,
                function (u) {
                    return Math.exp(-0.5 * u * u) / SQRT_2PI;
                }
            )
        );

        t.end();
    });

    t.test("custom kernel value", function (t) {
        t.same(
            ss.kernelDensityEstimation(
                normallyDistributed.sample,
                "gaussian",
                1
            )(0),
            0.2806999313061038
        );

        t.end();
    });

    t.test("invalid kernel", function (t) {
        t.throws(() => {
            ss.kernelDensityEstimation(normallyDistributed.sample, "bz");
        });
        t.throws(() => {
            ss.kernelDensityEstimation(
                normallyDistributed.sample,
                "gaussian",
                "bz"
            );
        });
        t.end();
    });

    t.end();
});
