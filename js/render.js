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
            const postCategory = post.category ? post.category.toLowerCase() : "";
            if (postCategory.includes(keyword)) {
              return post;
            }
          } else {
            // 이름으로 검색
            if (post.name.toLowerCase().includes(keyword)) {
              return post;
            }
          }
        });
        renderBlogList(searchResult);
      } else {
        // 이름으로 검색
        const searchResult = blogList.filter((post) => {
          if (post.name.toLowerCase().includes(keyword)) {
            return post;
          }
        });
        renderBlogList(searchResult);
      }
    }
  }
}

function renderBlogList(blogList) {
  const blogListEl = document.getElementById("blog-posts");
  blogListEl.innerHTML = ""; // 기존 목록 초기화
  blogList.forEach((post) => {
    // console.log(post)
    const liEl = document.createElement("div");
    liEl.classList = bloglistCardStyle;
    liEl.onclick = () => {
      window.location.href = `?post=${post.name}`;
    };
    liEl.innerHTML = `
            <img src="${post.thumbnail}" alt="${post.name}" class="${bloglistCardImgStyle}">
            <p class="${bloglistCardAuthorStyle}">${users[post.author].username}</p>
            <h2 class="bloglist-card-title text-xl font-bold text-gray-800">${post.name}</h2>
            <p class="${bloglistCardDateStyle}">${post.date}</p>
        `;
    blogListEl.appendChild(liEl);
  });
}

function renderMenu() {
  const mobileMenuEl = document.getElementById("mobileMenu");
  const menuEl = document.getElementById("menu"); // 데스크탑 메뉴 요소도 가져옴

  // mobileMenuEl과 menuEl이 모두 존재하는지 확인
  if (mobileMenuEl) {
    mobileMenuEl.innerHTML = ""; // 모바일 메뉴 초기화
  }
  if (menuEl) {
    menuEl.innerHTML = ""; // 데스크탑 메뉴 초기화
  }

  blogMenu.forEach((menu) => {
    const liEl = document.createElement("div");
    liEl.classList = menuListStyle;
    liEl.onclick = () => {
      window.location.href = `?menu=${menu.name}`;
    };
    liEl.innerText = menu.name;

    if (mobileMenuEl) {
      mobileMenuEl.appendChild(liEl.cloneNode(true)); // 모바일 메뉴에 추가 (클론하여 독립적으로)
    }
    if (menuEl) {
      menuEl.appendChild(liEl); // 데스크탑 메뉴에 추가
    }
  });
}

function renderCategory(blogList) {
  // 카테고리 데이터 집계
  const categories = {};
  blogList.forEach((post) => {
    if (post.category) {
      const categoryName = post.category;
      if (categories[categoryName]) {
        categories[categoryName]++;
      } else {
        categories[categoryName] = 1;
      }
    }
  });

  const asideEl = document.querySelector(".category-aside aside");
  asideEl.innerHTML = ""; // 기존 카테고리 목록 초기화

  const ulEl = document.createElement("ul");
  for (const categoryName in categories) {
    const liEl = document.createElement("li");
    liEl.classList = categoryItemStyle;
    liEl.onclick = () => {
      window.location.href = `?category=${categoryName}`;
    };
    liEl.innerHTML = `
            ${categoryName}<span class="${categoryItemCountStyle}">${categories[categoryName]}</span>
        `;
    ulEl.appendChild(liEl);
  }
  asideEl.appendChild(ulEl);
}

function styleMarkdown(type, markdown, postInfo) {
  // 마크다운을 HTML로 변환
  let contentHtml = marked.parse(markdown);

  if (type === "post") {
    const targetEl = document.getElementById("contents");
    targetEl.innerHTML = `
            <img src="${postInfo.thumbnail}" alt="${postInfo.name}" class="w-full h-auto max-h-[400px] object-cover rounded-xl mb-8">
            <h1 class="${posth1Style}">${postInfo.name}</h1>
            <div class="flex items-center text-graylv3 mb-6">
                <span class="mr-4">${users[postInfo.author].username}</span>
                <span>${postInfo.date}</span>
            </div>
            <div class="prose max-w-none">${contentHtml}</div>
        `;
  } else if (type === "menu") {
    const targetEl = document.getElementById("contents");
    targetEl.innerHTML = `<div class="prose max-w-none">${contentHtml}</div>`;
  }

  // highlight.js 적용
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
}

function styleJupyter(type, ipynbJson, postInfo) {
  let contentHtml = convertIpynbToHtml(ipynbJson);

  if (type === "post") {
    const targetEl = document.getElementById("contents");
    targetEl.innerHTML = `
            <img src="${postInfo.thumbnail}" alt="${postInfo.name}" class="w-full h-auto max-h-[400px] object-cover rounded-xl mb-8">
            <h1 class="${posth1Style}">${postInfo.name}</h1>
            <div class="flex items-center text-graylv3 mb-6">
                <span class="mr-4">${users[postInfo.author].username}</span>
                <span>${postInfo.date}</span>
            </div>
            <div class="prose max-w-none">${contentHtml}</div>
        `;
  } else if (type === "menu") {
    const targetEl = document.getElementById("contents");
    targetEl.innerHTML = `<div class="prose max-w-none">${contentHtml}</div>`;
  }

  // highlight.js 적용
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
}

function renderPagination(totalPosts, postsPerPage) {
  const paginationEl = document.getElementById("pagination");
  paginationEl.innerHTML = ""; // 기존 페이지네이션 초기화

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const ulEl = document.createElement("ul");
  ulEl.classList = "flex space-x-2"; // Tailwind CSS 클래스 예시

  for (let i = 1; i <= totalPages; i++) {
    const liEl = document.createElement("li");
    liEl.classList = `px-3 py-1 border rounded cursor-pointer ${paginationStyle}`; // paginationStyle 적용

    if (i === currentPage) {
      liEl.classList.add("bg-blue-500", "text-white"); // 현재 페이지 스타일
    } else {
      liEl.classList.add("bg-white", "text-gray-700");
    }

    liEl.innerText = i;
    liEl.onclick = () => {
      currentPage = i;
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      renderBlogList(blogList.slice(startIndex, endIndex));
      renderPagination(totalPosts, postsPerPage); // 페이지네이션 업데이트
    };
    ulEl.appendChild(liEl);
  }
  paginationEl.appendChild(ulEl);
}

// 초기화 함수
async function initialize() {
  await initDataBlogList(); // 블로그 리스트 데이터 초기화
  await initDataBlogMenu(); // 블로그 메뉴 데이터 초기화

  renderMenu(); // 메뉴 렌더링
  renderCategory(blogList); // 카테고리 렌더링

  // 현재 URL에 따라 페이지 렌더링
  const url = new URL(window.location.href);
  if (url.searchParams.has("category")) {
    const category = decodeURI(url.searchParams.get("category"));
    search(category, "category");
  } else if (url.searchParams.has("menu")) {
    const menuName = decodeURI(url.searchParams.get("menu"));
    fetch(origin + "menu/" + menuName)
      .then((response) => response.text())
      .then((text) => styleMarkdown("menu", text));
  } else if (url.searchParams.has("post")) {
    const postName = decodeURI(url.searchParams.get("post")).replaceAll(
      "+",
      " "
    );
    const postInfo = extractFileInfo(postName);
    fetch(origin + "blog/" + postName)
      .then((response) => response.text())
      .then((text) =>
        postInfo.fileType === "md"
          ? styleMarkdown("post", text, postInfo)
          : styleJupyter("post", text, postInfo)
      );
  } else {
    // 기본적으로 첫 페이지의 블로그 포스트 렌더링
    renderBlogList(blogList.slice(0, postsPerPage));
    renderPagination(blogList.length, postsPerPage);
  }
}

// 페이지 로드 시 초기화 함수 실행
window.onload = initialize;