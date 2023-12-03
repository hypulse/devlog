const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const saveDir = path.join(__dirname, "backup");

if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

async function downloadPosts() {
  const response = await fetch("/api/backup");
  const { error, data } = await response.json();
  if (error) throw new Error(error);
  return data;
}

async function savePostsAsMarkdown(data) {
  const articles = data.articles;
  const snippets = data.snippets;
  articles.forEach((article) => {
    savePostAsMarkdown(article);
  });
  snippets.forEach((snippet) => {
    savePostAsMarkdown(snippet);
  });
}

function savePostAsMarkdown(post) {
  return new Promise((resolve, reject) => {
    const fileName = `${post.title}-${post.createdAt}.md`;
    const filePath = path.join(saveDir, fileName);

    fs.writeFile(filePath, post.content, (err) => {
      if (err) {
        reject(new Error(err));
      } else {
        console.log("File saved: ", fileName);
        resolve();
      }
    });
  });
}

function uploadToGithub() {
  exec("", (error, stdout, stderr) => {
    if (error) throw new Error(error);
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

downloadPosts()
  .then(async (data) => {
    await savePostsAsMarkdown(data);
  })
  .then(() => {
    uploadToGithub();
  })
  .catch((err) => {
    console.log(err);
  });
