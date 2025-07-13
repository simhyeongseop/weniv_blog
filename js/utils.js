function extractFromUrl() {
  // URLparsing.js에서 사용
  // URL에서 username과 repositoryName 추출
  const url = new URL(window.location.href);

  // 호스트 이름에서 username 추출
  // 예: "weniv.github.io"에서 "weniv" 추출
  const hostnameParts = url.hostname.split(".");
  const username = hostnameParts.length > 2 ? hostnameParts[0] : "";

  // pathname을 사용하여 repositoryName 추출
  // 예: "/reponame"에서 "reponame" 추출
  const pathParts = url.pathname.split("/").filter((part) => part.length > 0);
  const repositoryName = pathParts.length > 0 ? pathParts[0] : "";

  return {
    username: username,
    repositoryName: repositoryName,
  };
}

function convertSourceToImage(source) {
  // convertIpynbToHtml.js에서 사용
  // Base64 이미지 데이터 식별을 위한 정규 표현식
  const base64ImageRegex = /!\[.*?\]\(data:image\/(png|jpeg);base64,(.*?)\)/g;

  // 이미지 데이터를 찾고, 각 매치에 대해 이미지 태그 생성
  return source.replace(base64ImageRegex, (match, fileType, imageData) => {
    return `<img src="data:image/${fileType};base64,${imageData}" alt="Embedded Image" />`;
  });
}

function escapeHtml(text) {
  // convertIpynbToHtml.js에서 사용
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function extractFileInfo(filename) {
  const regex = /^\[?(\d{4}-?\d{2}-?\d{2})\]?_\[?(.*?)\]?_\[?(.*?)\]?_\[?(.*?)\]?_\[?(.*?)\]?_\[?(.*?)\]?\.(md|ipynb)$/;
  const match = filename.match(regex);

  if (!match) return null;

  const [, date, title, category, thumbnail, description, author, fileType] = match;
  return {
    date,
    title,
    category,
    thumbnail,
    description,
    author,
    fileType,
  };
}