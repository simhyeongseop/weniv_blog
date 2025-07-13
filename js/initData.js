// GitHub API를 사용하여 폴더 내의 파일 목록 가져오기 (스키마 및 url 참고)
// https://api.github.com/repos/paullabkorea/github_blog/contents/menu
// https://api.github.com/repos/paullabkorea/github_blog/contents/blog
let blogList = [];
let blogMenu = [];
let isInitData = false;

async function initDataBlogList() {
    // ① 이미 로드된 적 있으면 재사용
    if (blogList.length > 0) {
        return blogList;
    }
    isInitData = true;

    // ② 로컬이면 JSON, 아니면 GitHub API 호출
    let response;
    if (isLocal) {
        response = await fetch(url.origin + "/data/local_blogList.json");
    } else {
        response = await fetch(
            `https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`
        );
    }
    blogList = await response.json();

    // ③ 파일명 패턴이 유효한 게시물만 걸러내기
    blogList = blogList.filter(post => Boolean(extractFileInfo(post.name)));

    // ④ 날짜(YYYYMMDD 또는 YYYY-MM-DD) 기준 내림차순 정렬
    blogList.sort((a, b) => {
        const dA = extractFileInfo(a.name).date;
        const dB = extractFileInfo(b.name).date;
        // YYYYMMDD → YYYY-MM-DD 포맷 보정
        const norm = s => s.includes("-")
            ? s
            : s.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        return new Date(norm(dB)) - new Date(norm(dA));
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
            url.origin + "/data/local_blogMenu.json"
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
                url.origin + `/${siteConfig.repositoryName}/data/local_blogMenu.json`
            );
        }
        blogMenu = await response.json();
    }
    return blogMenu;
}