const defaultTitle = "WENIVLOG";
// 현재 url 가져와서 parsing (url 스키마는 readme.md 참고)
const url = new URL(window.location.href);
const origin = url.origin + url.pathname;
const pathParts = url.pathname.split("/").filter((part) => part.length > 0);
// console.log(url)
// console.log(pathParts)

// 로켈 테스트 환경(127.0.0.1)인지 github 배포 상태인지 확인
const isLocal = url.hostname === "127.0.0.1" || url.hostname === "localhost";

// 현재 URL에서 "index.html"을 제거하고자 할 때
if (window.location.pathname.endsWith("/index.html")) {
  // 새 경로를 생성합니다. "index.html"을 제거합니다.
  // 이 때 pathParts에서 마지막 요소를 제거하지 않으면 다른 블로그를 클릭할 때 index.html이 붙어 이동합니다.
  pathParts.pop();
  let newPath = window.location.pathname.replace(/index\.html$/, "");

  // history.replaceState()를 사용하여 URL을 변경합니다. 페이지는 리로드되지 않습니다.
  history.replaceState(null, "", newPath);
}

if (isLocal) {
  // 로컬 테스트 환경

  // 블로그 제목 설정 (이미지 로고를 사용하므로 innerText 설정은 주석 처리)
  // const $blogTitle = document.getElementById("blog-title");
  // if ($blogTitle) { // 요소가 존재하는지 확인 후 innerText 설정
  //     $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;
  // }

  // 홈페이지 title을 제목으로 설정
  document.title = siteConfig.blogTitle || defaultTitle;

  // 클릭했을 때 메인페이지로 이동
  const $blogTitleLink = document.getElementById("blog-title");
  if ($blogTitleLink) { // 요소가 존재하는지 확인
    $blogTitleLink.onclick = () => {
      window.location.href = url.origin + url.pathname;
    };
  }

} else {
  // GitHub 배포 상태 (config.js의 blogTitle 사용)

  // 블로그 제목 설정 (이미지 로고를 사용하므로 innerText 설정은 주석 처리)
  // const $blogTitle = document.getElementById("blog-title");
  // if ($blogTitle) { // 요소가 존재하는지 확인 후 innerText 설정
  //     $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;
  // }

  // 홈페이지 title을 제목으로 설정
  document.title = siteConfig.blogTitle || defaultTitle;

  // 클릭했을 때 메인페이지로 이동
  const $blogTitleLink = document.getElementById("blog-title");
  if ($blogTitleLink) { // 요소가 존재하는지 확인
    $blogTitleLink.onclick = () => {
      // url.pathname이 /github_blog/ 와 같은 형태이므로
      // github 배포 상태일 때 url.origin + url.pathname 으로 이동하는 것이 맞습니다.
      window.location.href = url.origin + url.pathname;
    };
  }
}

// category 검색
if (url.search.split("=")[0] === "?category") {
  // 카테고리 검색 결과 페이지
  // console.log(url.search.split("=")[1])
  document.getElementById("blog-posts").style.display = "block";
  document.getElementById("contents").style.display = "none";
  search(decodeURI(url.search.split("=")[1]), "category");
} else if (url.search.split("=")[0] === "?menu") {
  // menu 페이지 (About, Contact 등)
  document.getElementById("blog-posts").style.display = "none";
  document.getElementById("contents").style.display = "block";
  // console.log(origin + "menu/" + url.search.split("=")[1])
  fetch(origin + "menu/" + url.search.split("=")[1])
    .then((response) => response.text())
    .then((text) => {
      // console.log(text)
      styleMarkdown("menu", text);
    });
} else if (url.search.split("=")[0] === "?post") {
  // 블로그 상세 정보 로딩
  if (url.search.split("=")[0] === "?menu") {
    document.getElementById("blog-posts").style.display = "none";
    document.getElementById("contents").style.display = "block";
    fetch(origin + "menu/" + url.search.split("=")[1])
      .then((response) => response.text())
      .then((text) => styleMarkdown("menu", text));
  } else if (url.search.split("=")[0] === "?post") {
    document.getElementById("contents").style.display = "block";
    document.getElementById("blog-posts").style.display = "none";
    postNameDecode = decodeURI(url.search.split("=")[1]).replaceAll("+", " ");
    // console.log(postNameDecode);
    postInfo = extractFileInfo(postNameDecode);
    fetch(origin + "blog/" + postNameDecode)
      .then((response) => response.text())
      .then((text) =>
        postInfo.fileType === "md"
          ? styleMarkdown("post", text, postInfo)
          : styleJupyter("post", text, postInfo)
      )
      .then(() => {
        // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
        const url = new URL(window.location.href);
        window.history.pushState({}, "", url);
      });
  }
}