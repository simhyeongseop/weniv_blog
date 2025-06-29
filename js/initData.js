// js/initData.js

let blogList = [];
let blogMenu = [];
let isInitData = false;

async function initDataBlogList() {
    if (blogList.length > 0) {
        return blogList;
    }

    isInitData = true; // 데이터 초기화를 한 번 했다는 것을 알리기 위한 변수

    if (isLocal) {
        // 로컬 환경 (127.0.0.1 또는 localhost)
        try {
            const response = await fetch(url.origin + "/data/local_blogList.json");
            blogList = await response.json();
        } catch (error) {
            console.error("Local blogList.json 로드 실패:", error);
            blogList = []; // 실패 시 빈 배열로 초기화
        }
    } else {
        // GitHub 배포 상태
        // config.js의 username과 repositoryName이 비어 있다면 URL에서 추출 시도
        if (!siteConfig.username || !siteConfig.repositoryName) {
            const urlConfig = extractFromUrl();
            siteConfig.username = siteConfig.username || urlConfig.username;
            siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
        }

        let response;
        try {
            // GitHub API를 사용하여 blog 폴더 내용 가져오기
            response = await fetch(
                `https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/blog`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json' // API 버전 지정
                    }
                }
            );

            if (!response.ok) {
                // API 호출 실패 시 (예: 404 Not Found, Rate Limit)
                console.warn(`GitHub API 호출 실패 (상태 코드: ${response.status}). 로컬 데이터 로드를 시도합니다.`);
                throw new Error("GitHub API fetch failed");
            }

            const data = await response.json();

            // GitHub API에서 가져온 파일 목록을 기반으로 blogList 구성
            blogList = data
                .filter(file => file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.ipynb')))
                .map(file => {
                    const info = extractFileInfo(file.name);
                    return {
                        name: file.name, // 원본 파일 이름 (예: [20240505]_[...]_.md)
                        date: info.date,
                        title: info.title, // 파일 이름에서 추출된 제목
                        category: info.category,
                        thumbnail: info.thumbnailFileName ? `img/thumbnail/${info.thumbnailFileName}` : '', // 썸네일 파일이름이 있을 경우 경로 생성
                        author: info.authorId,
                        description: info.description
                    };
                });
        } catch (error) {
            console.error("GitHub API 또는 네트워크 오류:", error);
            // GitHub API 실패 시 local_blogList.json 대체 로드
            try {
                const localResponse = await fetch(url.origin + `/${siteConfig.repositoryName}/data/local_blogList.json`);
                if (!localResponse.ok) {
                    throw new Error("Local fallback data load failed");
                }
                blogList = await localResponse.json();
                console.log("GitHub API 실패로 로컬 블로그 목록을 로드했습니다.");

                // 로컬 데이터 로드 시 썸네일 경로가 완전한지 확인 및 보정
                blogList = blogList.map(post => {
                    if (post.thumbnail && !post.thumbnail.startsWith('img/thumbnail/')) {
                        // thumbnail이 파일 이름만 있는 경우 경로를 붙여줌
                        return { ...post, thumbnail: `img/thumbnail/${post.thumbnail}` };
                    }
                    return post;
                });

            } catch (localError) {
                console.error("로컬 백업 블로그 목록 로드 실패:", localError);
                blogList = [];
            }
        }
    }

    blogList.sort(function (a, b) {
        return b.name.localeCompare(a.name); // 파일 이름으로 정렬 (날짜 순)
    });
    return blogList;
}

async function initDataBlogMenu() {
    if (blogMenu.length > 0) {
        return blogMenu;
    }

    if (isLocal) {
        try {
            const response = await fetch(url.origin + "/data/local_blogMenu.json");
            blogMenu = await response.json();
        } catch (error) {
            console.error("Local blogMenu.json 로드 실패:", error);
            blogMenu = [];
        }
    } else {
        if (!siteConfig.username || !siteConfig.repositoryName) {
            const urlConfig = extractFromUrl();
            siteConfig.username = siteConfig.username || urlConfig.username;
            siteConfig.repositoryName = siteConfig.repositoryName || urlConfig.repositoryName;
        }

        let response;
        try {
            response = await fetch(
                `https://api.github.com/repos/${siteConfig.username}/${siteConfig.repositoryName}/contents/menu`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                console.warn(`GitHub API (메뉴) 호출 실패 (상태 코드: ${response.status}). 로컬 메뉴 데이터 로드를 시도합니다.`);
                throw new Error("GitHub API menu fetch failed");
            }
            blogMenu = await response.json();

        } catch (error) {
            console.error("GitHub API (메뉴) 또는 네트워크 오류:", error);
            try {
                const localResponse = await fetch(url.origin + `/${siteConfig.repositoryName}/data/local_blogMenu.json`);
                if (!localResponse.ok) {
                    throw new Error("Local fallback menu data load failed");
                }
                blogMenu = await localResponse.json();
                console.log("GitHub API (메뉴) 실패로 로컬 메뉴 목록을 로드했습니다.");
            } catch (localError) {
                console.error("로컬 백업 메뉴 목록 로드 실패:", localError);
                blogMenu = [];
            }
        }
    }
    return blogMenu;
}