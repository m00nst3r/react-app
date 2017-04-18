module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                     {expand: true, cwd: 'build', src: ['**'], dest: 'tmp/public'}
                ]
            },
            again: {
                files: [
                    {expand: true, cwd:'tmp', src: ['**'], dest: 'build'},
                    {expand: true, cwd:'server', src: ['**'], dest: 'build'},
                    {expand: true, src: 'package.json', dest: 'build'}
                ]
            }
        },
        clean: {
            firstBuild: ['build/*'],
            tmp: ['tmp']
        },
        modify_json: {
            files: {
                expand: true,
                cwd: './build',
                src: 'package.json',
                options: {
                    add: true,
                    fields: {
                        "scripts": {
                            "start": "node index.js"
                        },
                        "dependencies": {
                            "express": "^4.15.2"
                        },
                        "devDependencies": {}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-modify-json');

    grunt.registerTask('default', ['copy:main', 'clean:firstBuild', 'copy:again', 'clean:tmp', 'modify_json']);
};