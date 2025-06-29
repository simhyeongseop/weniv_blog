// js/render.js

// URLparsing.js에 있는 origin과 isLocal 변수를 사용하기 위해 선언
// (만약 다른 파일에서 import/export 방식으로 모듈화한다면 이 부분은 필요 없어집니다.)
// 현재는 전역 변수로 가정하고 진행합니다.
// const url = new URL(window.location.href); // utils.js에서 정의됨
// const origin = url.origin + url.pathname; // utils.js에서 정의됨
// const isLocal = url.hostname === "127.0.0.1" || url.hostname === "localhost"; // utils.js에서 정의됨


function renderBlogList(data) {
  const blogPostsEl = document.getElementById("blog-posts");
  blogPostsEl.innerHTML = ""; // 기존 목록 비우기
  document.getElementById("contents").style.display = "none"; // 상세 내용 숨기기
  blogPostsEl.style.display = "grid"; // 블로그 목록 표시

  data.forEach((post) => {
    const postDate = post.date;
    const postTitle = post.title; // extractFileInfo에서 추출된 제목 사용
    const postCategory = post.category;
    const postThumbnail = post.thumbnail || "img/no_image.png"; // 썸네일 없으면 기본 이미지
    const postDescription = post.description;
    const authorInfo = users.find((user) => user.id === post.author);
    const postAuthorName = authorInfo ? authorInfo.username : "알 수 없는 저자";
    const postAuthorImg = authorInfo ? authorInfo.img : ""; // 기본 이미지 경로

    const article = document.createElement("article");
    article.className = `blog-card flex flex-col rounded-[10px] overflow-hidden shadow-lg transition-all duration-200 ease-in-out cursor-pointer h-full hover:scale-[1.02] hover:shadow-xl ${blogListCardStyle}`;
    article.dataset.postName = post.name; // 전체 파일 이름 저장

    article.innerHTML = `
            <div class="relative w-full h-[190px] overflow-hidden">
                <img src="${postThumbnail}" alt="${postTitle}" class="w-full h-full object-cover object-center ${blogListCardImgStyle}">
                <span class="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full ${blogListCardCategoryStyle}">${postCategory}</span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2 break-words ${bloglistCardTitleStyle}">${postTitle}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2 ${bloglistCardDescriptionStyle}">${postDescription}</p>
                <div class="flex items-center mt-auto">
                    <img src="${postAuthorImg}" alt="${postAuthorName}" class="w-8 h-8 rounded-full mr-2 ${bloglistCardAuthorImgStyle}">
                    <span class="text-sm font-medium ${bloglistCardAuthorStyle}">${postAuthorName}</span>
                    <span class="text-sm text-gray-400 ml-auto ${bloglistCardDateStyle}">${postDate}</span>
                </div>
            </div>
        `;
    blogPostsEl.appendChild(article);
  });

  document.querySelectorAll(".blog-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // a 태그나 button 태그 클릭 시 이벤트 전파 방지 (버튼의 고유 동작 방해 방지)
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return;
      }
      const postName = card.dataset.postName;
      window.history.pushState({}, "", `?post=${encodeURI(postName)}`); // URL 업데이트
      initialize(); // 변경된 URL에 따라 다시 렌더링
    });
  });
  renderPagination(blogList.length, postsPerPage); // 전체 게시물 수와 페이지당 게시물 수를 전달
}

function renderMenu() {
  const mainMenu = document.getElementById("main-menu");
  mainMenu.innerHTML = ""; // 기존 메뉴 비우기

  blogMenu.forEach((menuItem) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `?menu=${menuItem.name}`;
    a.className = `${menuListStyle}`;
    a.textContent = menuItem.name.replace(".md", ""); // .md 확장자 제거
    li.appendChild(a);
    mainMenu.appendChild(li);
  });

  const mobileMenuEl = document.getElementById("mobileMenu");
  mobileMenuEl.innerHTML = ""; // 기존 모바일 메뉴 비우기

  blogMenu.forEach((menuItem) => {
    const a = document.createElement("a");
    a.href = `?menu=${menuItem.name}`;
    a.className = `${mobileMenuStyle}`;
    a.textContent = menuItem.name.replace(".md", ""); // .md 확장자 제거
    mobileMenuEl.appendChild(a);
  });

  // 모바일 메뉴 클릭 이벤트 핸들러
  mobileMenuEl.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      mobileMenu.style.display = "none";
      menuButton.classList.remove("menu-open"); // 아이콘 클래스 제거
      const menuName = event.target.textContent;
      window.history.pushState({}, "", `?menu=${encodeURI(menuName)}.md`); // URL 업데이트
      initialize(); // 변경된 URL에 따라 다시 렌더링
    }
  });
}

function renderCategory(data) {
  const asideEl = document.querySelector(".category-aside aside");
  asideEl.innerHTML = ""; // 기존 카테고리 비우기

  // 카테고리별 게시물 수 계산
  const categoryCounts = {};
  data.forEach((post) => {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });

  // 카테고리 항목 생성
  for (const category in categoryCounts) {
    const div = document.createElement("div");
    div.className = `${categoryItemStyle} flex justify-between items-center`;
    div.dataset.category = category; // 카테고리 이름 저장

    const categoryNameSpan = document.createElement("span");
    categoryNameSpan.textContent = category;
    div.appendChild(categoryNameSpan);

    const categoryCountSpan = document.createElement("span");
    categoryCountSpan.className = `${categoryItemCountStyle}`;
    categoryCountSpan.textContent = categoryCounts[category];
    div.appendChild(categoryCountSpan);

    asideEl.appendChild(div);
  }

  // 카테고리 클릭 이벤트
  document.querySelectorAll(".category-aside [data-category]").forEach((item) => {
    item.addEventListener("click", (event) => {
      const category = item.dataset.category;
      window.history.pushState({}, "", `?category=${encodeURI(category)}`); // URL 업데이트
      initialize(); // 변경된 URL에 따라 다시 렌더링
    });
  });
}

async function styleMarkdown(type, text, postInfo = {}) {
  const contentsEl = document.getElementById("contents");
  if (type === "post") {
    // 포스트 제목과 정보 표시
    let authorHtml = '';
    if (postInfo.author !== undefined) {
        const author = users.find(u => u.id === postInfo.author);
        if (author) {
            authorHtml = `
                <div class="flex items-center mb-4">
                    <img src="${author.img}" alt="${author.username}" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="font-bold text-lg">${author.username}</p>
                        <p class="text-sm text-gray-500">${author.company} ${author.position}</p>
                    </div>
                </div>
            `;
        }
    }
    contentsEl.innerHTML = `
            <h1 class="${posth1Style}">${postInfo.title}</h1>
            ${authorHtml}
            <p class="text-gray-500 text-sm mb-6">${postInfo.date} | 카테고리: ${postInfo.category}</p>
            <div class="markdown-body"></div>
        `;
    document.querySelector(".markdown-body").innerHTML = marked.parse(text);
  } else if (type === "menu") {
    contentsEl.innerHTML = `
            <h1 class="${posth1Style}">메뉴</h1>
            <div class="markdown-body"></div>
        `;
    document.querySelector(".markdown-body").innerHTML = marked.parse(text);
  }
  hljs.highlightAll(); // 코드 하이라이팅 적용
}

async function styleJupyter(type, text, postInfo = {}) {
  const contentsEl = document.getElementById("contents");
  const parsedData = convertIpynbToHtml(JSON.parse(text)); // IPYNB 변환 함수 호출
  if (type === "post") {
    let authorHtml = '';
    if (postInfo.author !== undefined) {
        const author = users.find(u => u.id === postInfo.author);
        if (author) {
            authorHtml = `
                <div class="flex items-center mb-4">
                    <img src="${author.img}" alt="${author.username}" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <p class="font-bold text-lg">${author.username}</p>
                        <p class="text-sm text-gray-500">${author.company} ${author.position}</p>
                    </div>
                </div>
            `;
        }
    }
    contentsEl.innerHTML = `
            <h1 class="${posth1Style}">${postInfo.title}</h1>
            ${authorHtml}
            <p class="text-gray-500 text-sm mb-6">${postInfo.date} | 카테고리: ${postInfo.category}</p>
            <div class="jupyter-body"></div>
        `;
    document.querySelector(".jupyter-body").innerHTML = parsedData;
  } else if (type === "menu") {
    contentsEl.innerHTML = `
            <h1 class="${posth1Style}">메뉴</h1>
            <div class="jupyter-body"></div>
        `;
    document.querySelector(".jupyter-body").innerHTML = parsedData;
  }
  hljs.highlightAll(); // 코드 하이라이팅 적용
}

function renderPagination(totalPosts, postsPerPage) {
  const paginationEl = document.getElementById("pagination");
  paginationEl.innerHTML = ""; // 기존 페이지네이션 비우기

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) {
    return; // 페이지가 하나 이하면 페이지네이션 불필요
  }

  const ulEl = document.createElement("ul");
  ulEl.className = `${paginationStyle}`;

  // 이전 페이지 버튼
  const prevLi = document.createElement("li");
  const prevButton = document.createElement("button");
  prevButton.className = `${pageMoveButtonStyle}`;
  prevButton.innerHTML = `<img src="img/icon/icon-arrow-left.svg" alt="이전 페이지">`;
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateBlogListAndPagination();
    }
  });
  prevLi.appendChild(prevButton);
  ulEl.appendChild(prevLi);

  // 페이지 번호 버튼
  for (let i = 1; i <= totalPages; i++) {
    const liEl = document.createElement("li");
    const button = document.createElement("button");
    button.className = `${pageNumButtonStyle} ${i === currentPage ? 'active' : ''}`; // 현재 페이지 'active' 클래스 추가
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      updateBlogListAndPagination();
    });
    liEl.appendChild(button);
    ulEl.appendChild(liEl);
  }

  // 다음 페이지 버튼
  const nextLi = document.createElement("li");
  const nextButton = document.createElement("button");
  nextButton.className = `${pageMoveButtonStyle}`;
  nextButton.innerHTML = `<img src="img/icon/icon-arrow-right.svg" alt="다음 페이지">`;
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateBlogListAndPagination();
    }
  });
  nextLi.appendChild(nextButton);
  ulEl.appendChild(nextLi);

  paginationEl.appendChild(ulEl);
}

function updateBlogListAndPagination() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = blogList.slice(startIndex, endIndex);
  renderBlogList(paginatedPosts);
  renderPagination(blogList.length, postsPerPage); // 페이지네이션도 다시 그림
}

// 초기화 함수
async function initialize() {
  await initDataBlogList(); // 블로그 리스트 데이터 초기화
  await initDataBlogMenu(); // 블로그 메뉴 데이터 초기화

  renderMenu(); // 메뉴 렌더링
  renderCategory(blogList); // 카테고리 렌더링

  // 현재 URL에 따라 페이지 렌더링
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    const category = decodeURI(urlParams.get("category"));
    search(category, "category");
  } else if (urlParams.has("menu")) {
    const menuName = decodeURI(urlParams.get("menu"));
    fetch(origin + "menu/" + menuName)
      .then((response) => response.text())
      .then((text) => styleMarkdown("menu", text));
  } else if (urlParams.has("post")) {
    const postName = decodeURI(urlParams.get("post")).replaceAll(
      /\+/g,
      " "
    ); // '+'를 공백으로 치환
    const postInfo = extractFileInfo(postName);
    fetch(origin + "blog/" + postName)
      .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to load post: ${response.statusText}`);
        }
        return response.text();
      })
      .then((text) =>
        postInfo.fileType === "md"
          ? styleMarkdown("post", text, postInfo)
          : styleJupyter("post", text, postInfo)
      )
      .catch(error => {
        console.error("포스트 로드 중 오류 발생:", error);
        document.getElementById("contents").innerHTML = `<h1 class="${posth1Style}">오류: 게시물을 찾을 수 없거나 로드할 수 없습니다.</h1><p>관리자에게 문의하거나 URL을 확인해주세요.</p>`;
        document.getElementById("contents").style.display = "block";
        document.getElementById("blog-posts").style.display = "none";
      });
  } else {
    updateBlogListAndPagination(); // 초기 로드 시 첫 페이지 렌더링
  }
}

// 페이지 로드 시 초기화 함수 실행
document.addEventListener("DOMContentLoaded", initialize);

// 뒤로가기/앞으로가기 버튼 클릭 시 URL 변경 감지
window.addEventListener("popstate", () => {
  initialize(); // URL이 변경될 때마다 페이지 재렌더링
});

// 모바일 메뉴 토글 버튼 이벤트 리스너 (index.html에서 이동)
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
  mobileMenu.style.display = "none"; // 초기 상태: 모바일 메뉴 숨김

  menuButton.addEventListener("click", () => {
    if (mobileMenu.style.display === "none") {
      mobileMenu.style.display = "block";
      menuButton.classList.add("menu-open"); // 아이콘 변경을 위한 클래스 추가
    } else {
      mobileMenu.style.display = "none";
      menuButton.classList.remove("menu-open"); // 아이콘 클래스 제거
    }
  });
}