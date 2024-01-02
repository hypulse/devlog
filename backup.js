const fs = require("fs");
const path = require("path");

// 현재 날짜를 yyyy-mm-dd 형식으로 포맷하는 함수
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const today = formatDate(new Date());
const saveDir = path.join(__dirname, "backup", today);

// 오늘 날짜 폴더가 없으면 생성
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

// 오늘 날짜가 아닌 폴더 삭제
function deleteOldFolders(baseFolder) {
  fs.readdir(baseFolder, (err, folders) => {
    if (err) {
      console.error(err);
      return;
    }

    folders.forEach((folder) => {
      if (folder !== today) {
        fs.rm(
          path.join(baseFolder, folder),
          { recursive: true, force: true },
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Deleted folder: ${folder}`);
            }
          }
        );
      }
    });
  });
}

async function downloadPosts() {
  const response = await fetch(`${process.env.API_PREFIX}/api/backup`);
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

downloadPosts()
  .then(async (data) => {
    await savePostsAsMarkdown(data);
    deleteOldFolders(path.join(__dirname, "backup"));
  })
  .catch((err) => {
    console.log(err);
  });
