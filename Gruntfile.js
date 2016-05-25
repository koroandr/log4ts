module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                tsconfig: true,
                options: {
                    compiler: './node_modules/typescript/bin/tsc'
                }
            },
            prod : {
                tsconfig: 'tsconfig.build.json'
                // options: {
                //     compiler: './node_modules/typescript/bin/tsc'
                // }
            },
            demo : {
                src: ["src/**/*.ts", "demo/**/*.ts"],
                options: {
                    module: 'amd',
                    compiler: './node_modules/typescript/bin/tsc'
                }
            }
        },
        clean: ['src/**/*.js', 'src/**/*.js.map', 'test/**/*.js', 'test/**/*.js.map', 'demo/**/*.js', 'demo/**/*.js.map'],
        jasmine: {
            src : ['src/**/*.js', 'test/helpers/**/*.js'],
            options : {
                specs : ['test/**/*.js', '!test/helpers/**/*.js'],
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: ''
                    }
                }
            }
        },
        dts_bundle: {
            prod:  {
                options: {
                    name: 'log4ts',
                    main: 'build/log4ts.d.ts'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-dts-bundle');

    grunt.registerTask('demo', ['ts:demo', 'serve', 'clean']);
    grunt.registerTask('test', ['clean', 'ts:default', "jasmine", 'clean']);
    grunt.registerTask('prod', ['ts:prod', 'dts_bundle:prod']);
};
