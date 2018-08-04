const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      dev: webpackConfig
    },
    watch: {
      public: {
        files: ['src/public/*.js'],
        tasks: ['build'],
        // options: {
        //   spawn: false,
        // },
      },
      express: {
        files: ['index.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      },
    },
    run: {
      public: {
        cmd: 'yarn',
        args: [ 'run', 'serve-public' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('build', 'Build the public dist', ['webpack:dev']);
  grunt.registerTask('server', 'Run the server-side app in watch mode', [ 'express:dev', 'watch:express' ]);
  grunt.registerTask('serve-public', 'Run the public development server (webpack-serve)', ['run:public']);
};