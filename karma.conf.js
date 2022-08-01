const path = require("path");

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // frameworks: ["jasmine"],
        frameworks: ["jasmine", "webpack"],

        // list of files / patterns to load in the browser
        files: [
            'test/test.setup.ts',
            'test/*.ts', 'test/*.js',
            {pattern: "**/*.json", watched: false, included: false, served: true, nocache: false},
            {pattern: "**/*.png", watched: false, included: false, served: true, nocache: false},
            {pattern: "**/*.jpg", watched: false, included: false, served: true, nocache: false},
            {pattern: "**/*.svg", watched: false, included: false, served: true, nocache: false},
        ],

        // list of files / patterns to exclude
        exclude: [],

        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'test/**/*.js': ['webpack'],
        },

        webpack: {
            watch: true,
            devtool: 'inline-source-map',
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        use: 'ts-loader',
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: "asset/resource",
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
            },
            devServer: {
                contentBase: path.join(__dirname, './dist'),
                compress: true,
                hot: true,
            },
        },

        reporters: ["spec"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};
