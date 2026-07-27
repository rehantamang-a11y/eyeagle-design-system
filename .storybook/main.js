const config = {
  stories: ["../packages/components/stories/**/*.stories.js"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/web-components-vite",
  docs: { autodocs: "tag" },
};

export default config;
