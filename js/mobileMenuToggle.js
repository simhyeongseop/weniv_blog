const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const categoryToggle = document.getElementById("category-toggle");

/*
모바일 환경에서 menu, 이 menu는 이벤트 위임으로 최적화하면 불필요한 코드가 많은 함수입니다. 시간상 최적화하지 않고 넘깁니다.
*/
const mobileMenu = document.getElementById("mobileMenu");
const mobileCategory = document.getElementById("mobileCategory");
const searchButton = document.getElementById("search-button");
const searchContainer = document.getElementById("search-container");

window.addEventListener("click", (event) => {
    if (event.target === menuButton) {
        // 모바일 카테고리 메뉴 닫기
        mobileCategory.innerHTML = "";
        
        if (mobileMenu.innerHTML === "") {
            mobileMenu.innerHTML = menu.innerHTML;
            const menuItems = mobileMenu.querySelectorAll("a");
            menuItems.forEach((item, index) => {
                item.classList.add(...mobileMenuStyle.split(" "));
                if (index == 0) {
                    item.classList.add("mt-1.5");
                }
                item.style.animation = `slideDown forwards ${index * 0.2}s`;
            });
        } else {
            mobileMenu.innerHTML = "";
        }
    } else if (event.target === categoryToggle) {
        // 모바일 메뉴 닫기
        mobileMenu.innerHTML = "";
        
        if (mobileCategory.innerHTML === "") {
            // 카테고리 렌더링 함수 호출
            renderBlogCategory();
            const categoryAside = document.querySelector('.category-aside aside');
            if (categoryAside) {
                mobileCategory.innerHTML = categoryAside.innerHTML;
                const categoryItems = mobileCategory.querySelectorAll("div");
                categoryItems.forEach((item, index) => {
                    item.classList.add(...mobileMenuStyle.split(" "));
                    if (index == 0) {
                        item.classList.add("mt-1.5");
                    }
                    item.style.animation = `slideDown forwards ${index * 0.2}s`;
                });
            }
        } else {
            mobileCategory.innerHTML = "";
        }
    } else if (event.target === searchButton) {
        // 모바일 메뉴와 카테고리 메뉴 닫기
        mobileMenu.innerHTML = "";
        mobileCategory.innerHTML = "";
        
        // 검색창 토글
        if (searchContainer.classList.contains('hidden')) {
            searchContainer.classList.remove('hidden');
            searchContainer.classList.add('block');
        } else {
            searchContainer.classList.add('hidden');
            searchContainer.classList.remove('block');
        }
    } else if (event.target.parentNode === mobileMenu) {
        event.preventDefault();

        if (event.target.innerText + ".md" === "blog.md") {
            // contents 영역 숨기기
            document.getElementById("contents").style.display = "none";
            
            if (blogList.length === 0) {
                // 블로그 리스트 로딩
                initDataBlogList().then(() => {
                    renderBlogList();
                });
            } else {
                renderBlogList();
            }
            // console.log(origin)
            const url = new URL(origin);
            url.searchParams.set("menu", event.target.innerText + ".md");
            window.history.pushState({}, "", url);
            mobileMenu.innerHTML = "";
        } else {
            renderOtherContents(event.target.innerText + ".md");
            mobileMenu.innerHTML = "";
        }
    } else if (event.target.parentNode === mobileCategory) {
        // 모바일 카테고리 클릭 이벤트
        event.preventDefault();
        const categoryName = event.target.innerText.split('(')[0].trim();
        search(categoryName, "category");
        mobileCategory.innerHTML = "";
    } else {
        mobileMenu.innerHTML = "";
        mobileCategory.innerHTML = "";
        // 검색창 외부 클릭 시 닫기
        if (!searchContainer.contains(event.target) && event.target !== searchButton) {
            searchContainer.classList.add('hidden');
            searchContainer.classList.remove('block');
        }
    }
});

// 검색 입력 필드 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchInpBtn = document.querySelector('.search-inp-btn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const keyword = this.value.trim();
                if (keyword) {
                    search(keyword);
                    // 모바일에서 검색 후 검색창 닫기
                    if (searchContainer) {
                        searchContainer.classList.add('hidden');
                        searchContainer.classList.remove('block');
                    }
                }
            }
        });
    }
    
    // 검색 버튼 클릭 이벤트
    if (searchInpBtn) {
        searchInpBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            if (keyword) {
                search(keyword);
                // 모바일에서 검색 후 검색창 닫기
                if (searchContainer) {
                    searchContainer.classList.add('hidden');
                    searchContainer.classList.remove('block');
                }
            }
        });
    }
});
