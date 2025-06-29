const defaultTitle = "WENIVLOG";
// 현재 url 가져와서 parsing (url 스키마는 readme.md 참고)
const url = new URL(window.location.href);

// 로컬 테스트 환경(127.0.0.1)인지 github 배포 상태인지 확인
const isLocal = url.hostname === "127.0.0.1" || url.hostname === "localhost";

let origin;

// isLocal에 따라 origin 경로 설정
if (isLocal) {
    // 로컬 환경: 예를 들어 http://127.0.0.1:5500/
    origin = url.origin; 
} else {
    // GitHub Pages 배포 환경: 예를 들어 https://simhyeongseop.github.io/weniv_blog/
    // pathParts의 첫 번째 부분이 저장소 이름이 됩니다.
    // window.location.pathname 은 /weniv_blog/ 또는 /weniv_blog/index.html
    const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
    // 만약 pathSegments에 'index.html'이 있으면 제거
    if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].endsWith('.html')) {
        pathSegments.pop();
    }
    // 기본 경로를 구성합니다.
    origin = url.origin + '/' + pathSegments.join('/') + '/';
}


// console.log("Calculated Origin:", origin); // 디버깅을 위해 추가

// 현재 URL에서 "index.html"을 제거하고자 할 때 (이 부분은 유지합니다)
if (window.location.pathname.endsWith("/index.html")) {
  let newPath = window.location.pathname.replace(/index\\.html$/, "");
  history.replaceState(null, "", newPath);
}


if (isLocal) {
  // 로컬 테스트 환경

  // 블로그 제목 설정
  const $blogTitle = document.getElementById("blog-title");
  $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;

  // 홈페이지 title을 제목으로 설정
  document.title = siteConfig.blogTitle || defaultTitle;

  // 클릭했을 때 메인페이지로 이동
  $blogTitle.addEventListener("click", () => {
    window.location.href = origin;
  });

} else {
  // GitHub 배포 환경

  // 블로그 제목 설정
  const $blogTitle = document.getElementById("blog-title");
  $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;

  // 홈페이지 title을 제목으로 설정
  document.title = siteConfig.blogTitle || defaultTitle;

  // 클릭했을 때 메인페이지로 이동 (GitHub Pages는 서브디렉토리에 배포되므로, origin을 사용)
  $blogTitle.addEventListener("click", () => {
    window.location.href = origin;
  });
}

// 파일 정보 추출 함수 (기존과 동일)
function extractFileInfo(fileName) {
  const parts = fileName.split(".");
  const fileType = parts.pop();
  const name = parts.join(".");
  return { name, fileType };
}