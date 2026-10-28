// @ts-check
import path from "node:path";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import starlightLlmsTxt from "starlight-llms-txt";

const root = path.resolve(import.meta.dirname, "..");

// Matches the weights/styles originally requested from Google Fonts
// (ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;...;1,800),
// self-hosted via @fontsource instead of an external request.
const spectralWeights = [200, 300, 400, 500, 600, 700, 800];
const spectralCss = spectralWeights.flatMap((weight) => [
    `@fontsource/spectral/${weight}.css`,
    `@fontsource/spectral/${weight}-italic.css`
]);

// https://astro.build/config
export default defineConfig({
    site: "https://simple-statistics.github.io",
    integrations: [
        starlight({
            title: "Simple Statistics",
            logo: {
                src: "./src/assets/logo.jpg",
                replacesTitle: false
            },
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/simple-statistics/simple-statistics"
                }
            ],
            pagination: false,
            tableOfContents: false,
            customCss: [...spectralCss, "./src/styles/custom.css"],
            components: {
                ThemeProvider: "./src/components/ThemeProvider.astro",
                ThemeSelect: "./src/components/ThemeSelect.astro"
            },
            plugins: [
                starlightTypeDoc({
                    entryPoints: [path.join(root, ".typedoc-src/index.js")],
                    tsconfig: path.join(root, "tsconfig.typedoc.json"),
                    output: "api",
                    pagination: false,
                    typeDoc: {
                        treatWarningsAsErrors: true
                    }
                }),
                starlightLlmsTxt()
            ],
            sidebar: [typeDocSidebarGroup]
        })
    ]
});
