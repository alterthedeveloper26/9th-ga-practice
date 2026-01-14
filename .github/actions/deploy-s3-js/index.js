const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

// NOTE: name can be anything
function run() {
  const bucket = core.getInput("bucket", { required: true });
  const region = core.getInput("region", { required: true });
  const distFolderPath = core.getInput("dist-folder", { required: true });

  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolderPath} ${s3Uri} --region ${region}`);

  console.log("Hello world");
  core.notice("Hello world but from core");
}

run();
