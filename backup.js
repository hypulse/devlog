const { exec } = require("child_process");

async function downloadActivePosts() {}
async function downloadSnippets() {}

function uploadToGithub() {
  //   exec("sh your_script.sh", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`실행 오류: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });
}

Promise.all([downloadActivePosts(), downloadSnippets()])
  .then(() => {
    uploadToGithub();
  })
  .catch((err) => {
    console.log(err);
  });
