module.exports = function(grunt) {

  grunt.initConfig({
   watch: {
      scripts: {
        files: ['app/stylesheets/*.scss'],
        tasks: ['sass']
      }
    },


    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'public/style.css': 'app/stylesheets/style.scss',      // 'destination': 'source'
        }
      }
    },

    

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass']);

};