const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

// NOTE: name can be anything
async function run() {
  try {
    const bucket = core.getInput("bucket", { required: true });
    const region = core.getInput("region", { required: true });
    const distFolderPath = core.getInput("dist-folder", { required: true });

    const s3Uri = `s3://${bucket}`;
    await exec.exec(
      `aws s3 sync ${distFolderPath} ${s3Uri} --region ${region}`
    );

    const websiteUrl = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    core.setOutput("website-url", websiteUrl);

    console.log("Deployment successful!");
    core.notice(`Website deployed to: ${websiteUrl}`);
  } catch (error) {
    core.setFailed(`Deployment failed: ${error.message}`);
  }
}

run();
