module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                src: ["src/**/*.ts", "test/**/*.ts"],
                options: {
                    module: 'amd'
                }
            }
        },
        clean: ['src/**/*.js', 'src/**/*.js.map', 'test/**/*.js', 'test/**/*.js.map'],
        jasmine: {
            src : ['src/**/*.js'],
            options : {
                specs : 'test/**/*.js',
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
};
