module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                src: ["src/**/*.ts", "test/**/*.ts"],
                options: {
                    module: 'amd'
                }
            },
            demo : {
                src: ["src/**/*.ts", "demo/**/*.ts"],
                options: {
                    module: 'amd'
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
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('demo', ['ts:demo', 'serve', 'clean']);
};
