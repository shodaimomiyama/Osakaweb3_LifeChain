module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(fetch-blob)/)"  // fetch-blobを変換対象に含める
    ]
};


