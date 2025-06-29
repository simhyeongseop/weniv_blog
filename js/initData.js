// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기 (스키마 및 url 참고)
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
let blogList = [];
let blogMenu = [];
let isInitData = false;

async function initDataBlogList() {
    /*
    blogList를 초기화 하기 위한 함수
    if 로컬이라면 blogList = /data/local_blogList.json 데이터 할당
    else if 배포상태이면 blogList = GitHub에 API 데이터 할당
    */
    if (blogList.length > 0) {
        // blogList 데이터가 이미 있을 경우 다시 로딩하지 않기 위함(API 호출 최소화)
        return blogList;
    }

    // 데이터 초기화를 한 번 했다는 것을 알리기 위한 변수
    isInitData = true;

    if (isLocal) {
        // 로컬 환경
        const response = await fetch(
            origin + "/data/local_blogList.json"
        );
        blogList = await response.json();
    } else {
        // GitHub 배포 상태
        // 만약 siteConfig.username이 비어있거나 siteConfig.repositoryName이 비어 있다면 해당 값을 지정하여 시작
        // config에서 값이 없을 경우 URL에서 추출
        if (!siteConfig.username || !siteConfig.repositoryName) {
            const urlConfig = extractFromUrl();
            siteConfig.username = siteConfig.username || urlConfig.username;
            siteConfig.repositoryName =
                siteConfig.repositoryName || urlConfig.repositoryName;
        }

        let response;

        // 배포 상태에서 GitHub API를 사용(이용자가 적을 때)
        if (!localDataUsing) {
            response = await fetch(
                `https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`
            );
        } else {
            // 배포 상태에서 Local data를 사용(이용자가 많을 때)
            response = await fetch(
                origin + `data/local_blogList.json` // origin이 이미 /weniv_blog/ 까지 포함하므로 /data/ 로 시작합니다.
            );
        }

        // GitHub API 응답 처리 (배포 상태)
        if (!localDataUsing && response.ok) {
            const data = await response.json();
            blogList = data
                .filter((file) => file.name.endsWith(".md") || file.name.endsWith(".ipynb"))
                .map((file) => ({
                    name: file.name,
                    path: file.path,
                    date: new Date().toISOString().slice(0, 10), // GitHub API에서 파일 생성 날짜를 직접 얻기 어려우므로 임시 값
                    thumbnail: `img/thumbnail/${file.name.replace(/\.(md|ipynb)$/, '')}.png`, // 썸네일 경로 규칙에 따라
                    author: 0, // 기본 작성자 ID
                    category: "미분류", // 기본 카테고리
                }));
        } else if (localDataUsing && response.ok) {
             blogList = await response.json();
        } else {
            console.error("Failed to fetch blog list data.");
            blogList = []; // 데이터 로드 실패 시 빈 배열로 초기화
        }
    }

    blogList.sort(function (a, b) {
        return b.name.localeCompare(a.name);
    });
    return blogList;
}

async function initDataBlogMenu() {
    if (blogMenu.length > 0) {
        // blogMenu 데이터가 이미 있을 경우(API 호출 최소화)
        return blogMenu;
    }

    if (isLocal) {
        // 로컬환경
        const response = await fetch(
            origin + "/data/local_blogMenu.json"
        );
        blogMenu = await response.json();
    } else {
        // GitHub 배포 상태
        // 만약 siteConfig.username이 비어있거나 siteConfig.repositoryName이 비어 있다면 해당 값을 지정하여 시작
        // config에서 값이 없을 경우 URL에서 추출
        if (!siteConfig.username || !siteConfig.repositoryName) {
            const urlConfig = extractFromUrl();
            siteConfig.username = siteConfig.username || urlConfig.username;
            siteConfig.repositoryName =
                siteConfig.repositoryName || urlConfig.repositoryName;
        }

        let response;

        // 배포 상태에서 GitHub API를 사용(이용자가 적을 때)
        if (!localDataUsing) {
            response = await fetch(
                `https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/menu`
            );
        } else {
            // 배포 상태에서 Local data를 사용(이용자가 많을 때)
            response = await fetch(
                origin + `data/local_blogMenu.json`
            );
        }

        // GitHub API 응답 처리 (배포 상태)
        if (!localDataUsing && response.ok) {
            const data = await response.json();
            blogMenu = data
                .filter((file) => file.name.endsWith(".md"))
                .map((file) => ({ name: file.name, path: file.path }));
        } else if (localDataUsing && response.ok) {
            blogMenu = await response.json();
        } else {
            console.error("Failed to fetch blog menu data.");
            blogMenu = []; // 데이터 로드 실패 시 빈 배열로 초기화
        }
    }
    return blogMenu;
}

// GitHub Pages URL에서 사용자 이름과 저장소 이름 추출 (이 부분은 유지)
function extractFromUrl() {
  const pathParts = url.pathname.split("/").filter((part) => part.length > 0);
  let username = "";
  let repositoryName = "";

  if (url.hostname.endsWith("github.io")) {
    if (pathParts.length > 0) {
      username = url.hostname.split(".")[0];
      repositoryName = pathParts[0];
    }
  }
  return { username, repositoryName };
}