// initData.js
// GitHub Pages raw.githubusercontent.com을 사용하여 정적 JSON 폴더 목록 가져오기
let blogList = [];
let blogMenu = [];
let isInitData = false;

async function initDataBlogList() {
  if (blogList.length > 0) return blogList;
  isInitData = true;

  let response;
  if (isLocal) {
    // 로컬 JSON 사용 (개발용)
    response = await fetch(`${url.origin}/data/local_blogList.json`);
  } else {
    // URL에서 사용자 및 레포지토리 정보 추출
    if (!siteConfig.username || !siteConfig.repositoryName) {
      const urlConfig = extractFromUrl();
      siteConfig.username = siteConfig.username || urlConfig.username;
      siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
    }
    if (!localDataUsing) {
      // Raw GitHubusercontent에서 정적 JSON 불러오기 (토큰 불필요)
      response = await fetch(
        `https://raw.githubusercontent.com/${siteConfig.username}/${siteConfig.repositoryName}/main/data/local_blogList.json`
      );
    } else {
      // 설정에 따라 로컬 JSON 사용
      response = await fetch(
        `${url.origin}/${siteConfig.repositoryName}/data/local_blogList.json`
      );
    }
  }

  blogList = await response.json();
  // 유효한 파일만 필터링
  blogList = blogList.filter(post => extractFileInfo(post.name));
  // 최신 순 정렬
  blogList.sort((a, b) => b.name.localeCompare(a.name));
  return blogList;
}

async function initDataBlogMenu() {
  if (blogMenu.length > 0) return blogMenu;

  let response;
  if (isLocal) {
    // 로컬 JSON 사용 (개발용)
    response = await fetch(`${url.origin}/data/local_blogMenu.json`);
  } else {
    // URL에서 사용자 및 레포 정보 추출
    if (!siteConfig.username || !siteConfig.repositoryName) {
      const urlConfig = extractFromUrl();
      siteConfig.username = siteConfig.username || urlConfig.username;
      siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
    }
    if (!localDataUsing) {
      // Raw GitHubusercontent에서 정적 JSON 불러오기
      response = await fetch(
        `https://raw.githubusercontent.com/${siteConfig.username}/${siteConfig.repositoryName}/main/data/local_blogMenu.json`
      );
    } else {
      // 로컬 JSON 사용
      response = await fetch(
        `${url.origin}/${siteConfig.repositoryName}/data/local_blogMenu.json`
      );
    }
  }

  blogMenu = await response.json();
  return blogMenu;
}
