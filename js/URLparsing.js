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
    const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
    
    // '/weniv_blog/index.html' -> ['weniv_blog', 'index.html']
    // '/weniv_blog/' -> ['weniv_blog']
    
    // 만약 pathSegments에 'index.html'이 있으면 제거하여 기본 경로만 남김
    if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].endsWith('.html')) {
        pathSegments.pop();
    }
    
    // 최종 origin 경로 구성 (예: 'https://simhyeongseop.github.io/weniv_blog/')
    origin = url.origin + '/' + pathSegments.join('/') + '/';
}

// console.log("Calculated Origin:", origin); // 디버깅을 위해 추가

// 현재 URL에서 "index.html"을 제거하고자 할 때
// 이 부분은 기존 로직을 유지합니다. URL 표시를 깔끔하게 하기 위함입니다.
if (window.location.pathname.endsWith("/index.html")) {
  let newPath = window.location.pathname.replace(/index\\.html$/, "");
  history.replaceState(null, "", newPath);
}


if (isLocal) {
  // 로컬 테스트 환경
  const $blogTitle = document.getElementById("blog-title");
  if ($blogTitle) {
      $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;
      $blogTitle.addEventListener("click", () => {
          window.location.href = origin;
      });
  }
  document.title = siteConfig.blogTitle || defaultTitle;

} else {
  // GitHub 배포 환경
  const $blogTitle = document.getElementById("blog-title");
  if ($blogTitle) {
      $blogTitle.innerText = siteConfig.blogTitle || defaultTitle;
      $blogTitle.addEventListener("click", () => {
          window.location.href = origin; // GitHub Pages는 서브디렉토리에 배포되므로, origin을 사용
      });
  }
  document.title = siteConfig.blogTitle || defaultTitle;
}

// 파일 정보 추출 함수 (기존과 동일)
function extractFileInfo(fileName) {
  const parts = fileName.split(".");
  const fileType = parts.pop();
  const name = parts.join(".");
  return { name, fileType };
}