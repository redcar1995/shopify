/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      collapsed: false,
      type: "category",
      label: "Getting started",
      items: [
        "installation",
        "helloworld",
      ],
    },
    {
      collapsed: false,
      type: "category",
      label: "Paint",
      items: [
        "paint",
        "paint-properties"
      ],
    },
    {
      type: 'doc',
      label: "Group",
      id: "group"
    },
    {
      collapsed: false,
      type: "category",
      label: "Shapes",
      items: [
        "circle"
      ],
    },
    {
      collapsed: false,
      type: "category",
      label: "Animations",
      items: [
        "animations"
      ],
    }
  ],
};

module.exports = sidebars;
