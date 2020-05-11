const path = require("path")
const libDir = process.env.LIB_DIR;

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, "../../"),
  testURL: "http://localhost/",
  moduleFileExtensions: [
    "js",
    "ts",
    "vue",
    "json",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^vue$": "<rootDir>/node_modules/vue/dist/vue.js"
  },
  transform: {
    ".*\\.(vue)$": ["vue-jest", "ts-jest"],
    "\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  testRegex: "(?<!snapshot)\\.test\\.js$",
  setupFiles: ["<rootDir>/script/test/setup"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
    },
  }
}
