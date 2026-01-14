const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

// NOTE: name can be anything
function run() {
  console.log("Hello world");
  core.notice("Hello world but from core");
}

run();
