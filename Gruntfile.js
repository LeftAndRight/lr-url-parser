module.exports = function(grunt) {

	grunt.initConfig({
		"file-creator": {
			global: {
				"dist/url-parser.js": function(fs, fd, done){
					var wrapper = grunt.file.read("src/Wrapper.js");
					var main	= grunt.file.read("src/url-parser.js");
					wrapper		= wrapper.replace("$code$", main);
					fs.writeSync(fd, wrapper);
					done();
				}
			},
			angular: {
				"dist/url-parser-angular.js": function(fs, fd, done){
					var wrapper = grunt.file.read("src/WrapperAngular.js");
					var main	= grunt.file.read("src/url-parser.js");
					wrapper		= wrapper.replace("$code$", main);
					fs.writeSync(fd, wrapper);
					done();
				}
			}
		}

		/*,
		karma : {
			unit : {
				options :{
					// Build the list of files from the fileRegister and add some test files
					files: [
						"dist/url-parser.js",
						"test/url-parser-test.js"
					],
					basePath	: "",
					frameworks	: ["jasmine"],
					reporters	: ["spec"],
					logLevel	: "INFO",
					autoWatch	: true,
					browsers	: ["PhantomJS"],
					singleRun	: true
				}
			}
		}*/
	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", ["file-creator"]);
};