function search(keyword, kinds) {
  /*
    트러블슈팅: 실제 데이터가 없을 경우 API 호출을 한 번 실행.
    1. 메뉴에서 검색 버튼을 클릭해서 검색하였을 경우 검색 결과를 renderBlogList 함수를 통해 렌더링
    2. 포스트에서 카테고리를 클릭하였을 때 해당 카테고리로 검색하여 renderBlogList함수를 통해 렌더링
    */
  keyword = keyword ? keyword.toLowerCase().trim() : "";

  if (blogList.length === 0) {
    if (isInitData === false) {
      // 데이터 초기화가 되지 않은 경우에만 검색 허용. 이 작업을 하지 않으면 데이터가 없을 때 무한 루프에 빠지게 됨.
      initDataBlogList().then(() => {
        search(keyword);
      });
      return;
    }
  } else {
    if (!keyword) {
      const searchInput = document.getElementById("search-input");
      const searchKeyword = searchInput.value.toLowerCase(); // 검색어를 소문자로 변환
      const searchResult = blogList.filter((post) => {
        // 대소문자 가리지 않고 검색
        if (post.name.toLowerCase().includes(searchKeyword)) {
          return post;
        }
      });
      renderBlogList(searchResult);
    } else {
      // 만약 kinds가 있을 경우 해당 종류대로 검색(카테고리면 카테고리, 이름이면 이름)
      if (kinds) {
        const searchResult = blogList.filter((post) => {
          if (kinds === "category") {
            // post를 parsing하여 카테고리 내 검색
            const postCategory = post.name.split("/")[0].toLowerCase();
            if (postCategory.includes(keyword)) {
              return post;
            }
          } else if (kinds === "postName") {
            // post 이름으로 검색
            if (post.name.toLowerCase().includes(keyword)) {
              return post;
            }
          }
        });
        renderBlogList(searchResult);
      }
    }
  }
}

function renderMenu() {
  const menuContainer = document.getElementById("menu");
  const mobileMenuContainer = document.getElementById("mobileMenu");
  menuContainer.innerHTML = "";
  mobileMenuContainer.innerHTML = "";

  blogMenu.forEach((item) => { // ★ 여기서 TypeError 발생 가능성
    if (item.type === "file") {
      const fileExtension = item.name.split(".").pop();
      if (fileExtension === "md") {
        // 데스크탑 메뉴
        const link = document.createElement("a");
        link.href = `?menu=${encodeURIComponent(item.path)}`; // 인코딩된 경로 사용
        link.textContent = item.name.replace(/\.md$/, ""); // .md 확장자 제거
        link.classList.add(
          "menu-item",
          "hover:text-primary",
          "transition-colors",
          "duration-200",
          "ease-in-out"
        );
        menuContainer.appendChild(link);

        // 모바일 메뉴
        const mobileLink = document.createElement("a");
        mobileLink.href = `?menu=${encodeURIComponent(item.path)}`;
        mobileLink.textContent = item.name.replace(/\.md$/, "");
        mobileLink.classList.add(
          "block",
          "py-3",
          "px-4",
          "text-gray-900",
          "hover:bg-gray-100",
          "md:hover:bg-transparent",
          "md:border-0",
          "md:p-0",
          "border-b"
        );
        mobileMenuContainer.appendChild(mobileLink);
      }
    }
  });
}

function renderBlogList(list) {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = ""; // 기존 내용 비우기
  document.getElementById("contents").style.display = "none";
  document.getElementById("blog-posts").style.display = "grid";

  if (!list || list.length === 0) {
    blogPostsContainer.innerHTML = "<p>게시물이 없습니다.</p>";
    return;
  }

  list.forEach((post) => {
    // 마크다운 파일만 처리
    if (post.name.endsWith(".md") || post.name.endsWith(".ipynb")) {
      const postElement = document.createElement("div");
      postElement.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-lg",
        "p-6",
        "mb-4",
        "liquid-glass" // 글래스모피즘 카드 스타일
      );

      // 이미지는 첫 번째 이미지 또는 기본 이미지
      const imgPath = post.image ? post.image : "img/thumbnail-default.jpg"; // initData에서 image 속성 사용
      // 이미지 URL이 base64 데이터 URI인 경우 직접 사용, 아니면 상대 경로
      const imgSrc = imgPath.startsWith('data:image/') ? imgPath : `${origin}${imgPath}`;

      postElement.innerHTML = `
                <a href="?post=${encodeURIComponent(post.path)}" class="block">
                    <div class="w-full h-48 overflow-hidden rounded-md mb-4">
                        <img src="${imgSrc}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                    </div>
                    <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
                    <p class="text-gray-600 text-sm mb-4">${post.description}</p>
                    <div class="flex items-center text-gray-500 text-xs">
                        <span>${post.date}</span>
                        <span class="mx-2">•</span>
                        <span>${post.category}</span>
                    </div>
                </a>
            `;
      blogPostsContainer.appendChild(postElement);
    }
  });
}

async function styleMarkdown(target, markdownText, postInfo = null) {
  const resultElement = document.getElementById("contents");
  if (target === "post") {
    // marked 라이브러리를 사용하여 마크다운을 HTML로 변환
    let contentHTML = marked.parse(markdownText);

    // postInfo가 있고, 이미지 정보가 있다면 이미지 경로를 수정
    if (postInfo && postInfo.origin !== origin) { // 이미지가 다른 저장소에 있다면
        const repoPath = `${postInfo.username}/${postInfo.repositoryName}/blob/main/`;
        // 마크다운 내 이미지 경로 수정
        contentHTML = contentHTML.replace(/<img src="(?!(?:https?:\/\/|\/))([^"]+)"/g, (match, p1) => {
            // src가 http://, https://, / 로 시작하지 않는 경우에만 처리
            return `<img src="https://raw.githubusercontent.com/${repoPath}${p1}"`;
        });
    }

    resultElement.innerHTML = `
            <div class="markdown-body p-6 bg-white rounded-lg shadow-lg">
                <h1 class="text-3xl font-bold mb-4">${postInfo.title}</h1>
                <p class="text-gray-600 text-sm mb-6">작성일: ${postInfo.date} | 카테고리: ${postInfo.category}</p>
                ${contentHTML}
                <button id="copy-button" class="mt-8 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">코드 복사</button>
            </div>
        `;
    hljs.highlightAll(); // 코드 하이라이팅 적용
  } else if (target === "menu") {
    resultElement.innerHTML = `
            <div class="markdown-body p-6 bg-white rounded-lg shadow-lg">
                ${marked.parse(markdownText)}
            </div>
        `;
  }
}

async function styleJupyter(target, ipynbText, postInfo = null) {
    const resultElement = document.getElementById("contents");
    if (target === "post") {
        // ipynb를 HTML로 변환하는 함수 호출 (convertIpynbToHtml은 별도로 정의되어야 함)
        const contentHTML = await convertIpynbToHtml(JSON.parse(ipynbText));

        resultElement.innerHTML = `
            <div class="jupyter-notebook-body p-6 bg-white rounded-lg shadow-lg">
                <h1 class="text-3xl font-bold mb-4">${postInfo.title}</h1>
                <p class="text-gray-600 text-sm mb-6">작성일: ${postInfo.date} | 카테고리: ${postInfo.category}</p>
                ${contentHTML}
                <button id="copy-button" class="mt-8 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">코드 복사</button>
            </div>
        `;
        hljs.highlightAll(); // 코드 하이라이팅 적용
    } else if (target === "menu") {
        // Jupyter 노트북을 메뉴로 사용할 경우 (일반적이지 않음)
        // 여기서는 마크다운처럼 처리하지 않고, 에러 메시지나 빈 내용으로 처리할 수 있습니다.
        resultElement.innerHTML = `
            <div class="p-6 bg-white rounded-lg shadow-lg">
                <p>Jupyter Notebook은 메뉴로 직접 표시할 수 없습니다.</p>
            </div>
        `;
    }
}


function renderPagination(totalPosts, postsPerPage, currentPage) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // 기존 내용 비우기

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 이전 페이지 버튼
  const prevButton = document.createElement("button");
  prevButton.id = "page-prev";
  prevButton.classList.add(
    "px-4",
    "py-2",
    "mx-1",
    "border",
    "rounded",
    "bg-gray-200",
    "hover:bg-gray-300"
  );
  prevButton.textContent = "이전";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    goToPage(currentPage - 1);
  });
  paginationContainer.appendChild(prevButton);

  // 페이지 번호 버튼
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.classList.add(
      "px-4",
      "py-2",
      "mx-1",
      "border",
      "rounded",
      "hover:bg-gray-300",
      "transition-colors",
      "duration-200",
      "ease-in-out"
    );
    if (i === currentPage) {
      pageButton.classList.add("bg-primary", "text-white");
    } else {
      pageButton.classList.add("bg-gray-200");
    }
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      goToPage(i);
    });
    paginationContainer.appendChild(pageButton);
  }

  // 다음 페이지 버튼
  const nextButton = document.createElement("button");
  nextButton.id = "page-next";
  nextButton.classList.add(
    "px-4",
    "py-2",
    "mx-1",
    "border",
    "rounded",
    "bg-gray-200",
    "hover:bg-gray-300"
  );
  nextButton.textContent = "다음";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    goToPage(currentPage + 1);
  });
  paginationContainer.appendChild(nextButton);
}

// 페이지 이동 함수
function goToPage(page) {
  const postsPerPage = 9; // 한 페이지당 게시물 수
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToRender = blogList.slice(startIndex, endIndex);

  renderBlogList(postsToRender);
  renderPagination(blogList.length, postsPerPage, page);
}

// 초기화 함수
async function initialize() {
  await initDataBlogMenu(); // 메뉴 데이터 초기화
  await initDataBlogList(); // 블로그 리스트 데이터 초기화

  // 현재 URL 파싱
  const url = new URL(window.location.href);

  // 모바일 메뉴 토글
  const mobileMenuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.style.height = mobileMenu.classList.contains('hidden') ? '0px' : 'auto';
    mobileMenu.style.overflow = 'hidden';
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.animation = 'slideDown 0.3s forwards';
    } else {
        mobileMenu.style.animation = ''; // 애니메이션 제거
        mobileMenu.style.height = '0px'; // 숨길 때 높이 초기화
    }
  });


  renderMenu(); // 메뉴 렌더링
  goToPage(1); // 첫 페이지 렌더링 (기본)

  // URL 쿼리스트링에 따라 페이지 렌더링
  if (url.search) {
    if (url.search.split("=")[0] === "?menu") {
      document.getElementById("contents").style.display = "block";
      try {
        fetch(origin + "menu/" + url.search.split("=")[1])
          .then((response) => response.text())
          .then((text) => styleMarkdown("menu", text))
          .then(() => {
            // 렌더링 후에는 URL 변경(query string으로 블로그 포스트 이름 추가)
            const url = new URL(window.location.href);
            window.history.pushState({}, "", url);
          });
      } catch (error) {
        styleMarkdown("menu", "# Error입니다. 파일명을 확인해주세요.");
      }
    } else if (url.search.split("=")[0] === "?post") {
      document.getElementById("contents").style.display = "block";
      document.getElementById("blog-posts").style.display = "none";
      postNameDecode = decodeURI(url.search.split("=")[1]).replaceAll(" ", "+"); // 인코딩 시 +로 변환되므로 다시 공백으로 변환
      // console.log(postNameDecode);
      postInfo = extractFileInfo(postNameDecode);
      try {
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
      } catch (error) {
        styleMarkdown("menu", "# Error입니다. 파일명을 확인해주세요.");
      }
    }
  }

  // 검색창 이벤트 리스너
  const searchInput = document.getElementById("search-input");
  const searchButton = document.querySelector(".search-inp-btn");
  const resetButton = document.querySelector(".reset-inp-btn");

  searchButton.addEventListener("click", () => search());
  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    search();
    resetButton.classList.add("hidden");
  });
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      resetButton.classList.remove("hidden");
    } else {
      resetButton.classList.add("hidden");
    }
  });

  // copy-button (생성될 때마다 이벤트 리스너 추가 필요)
  document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'copy-button') {
        const markdownBody = event.target.closest('.markdown-body');
        if (markdownBody) {
            const codeBlocks = markdownBody.querySelectorAll('pre code');
            let codeToCopy = '';
            codeBlocks.forEach(block => {
                codeToCopy += block.innerText + '\n\n';
            });
            if (codeToCopy) {
                navigator.clipboard.writeText(codeToCopy.trim())
                    .then(() => alert('모든 코드 블록이 복사되었습니다!'))
                    .catch(err => console.error('코드 복사 실패:', err));
            }
        }
    }
  });
}

// 페이지 로드 시 초기화 함수 실행
window.addEventListener("load", initialize);