const repositoryUrl = process.env.REPOSITORY_URL;
const dockerImage = process.env.DOCKER_IMAGE;
const dockerContext = process.env.DOCKER_CONTEXT || ".";
const dockerFile = process.env.DOCKER_FILE || "Dockerfile";
const dockerRegistry = process.env.DOCKER_REGISTRY;
const dockerProject = process.env.DOCKER_PROJECT;

const plugins = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    {
        changelogFile: "CHANGELOG.md",
        changelogTitle: "# Changelog",
    },
    [
        "@semantic-release/git",
        {
            assets: [
                "CHANGELOG.md",
            ],
            message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        },
    ],
    [
        "@codedependant/semantic-release-docker",
        {
            dockerTags: ["latest", "{{version}}"],
            dockerImage: dockerImage,
            dockerContext: dockerContext,
            dockerFile: dockerFile,
            dockerRegistry: dockerRegistry,
            dockerProject: dockerProject,
            dockerLogin: false,
        }
    ],
    "@semantic-release/github",
];

module.exports = {
    repositoryUrl: repositoryUrl,
    branches: [
        "main",
        { name: "prerelease", prerelease: "rc" },
    ],
    ci: true,
    dryRun: false,
    plugins: plugins,
};