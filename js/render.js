// render.js

// 블로그 카드 리스트 렌더링
function renderBlogList(blogList) {
  const blogPosts = document.getElementById('blog-posts');
  if (!blogPosts) return;

  blogPosts.innerHTML = '';
  blogList.forEach(post => {
    const card = document.createElement('div');
    card.className = 'rounded-2xl shadow-soft bg-white p-5 mb-8 transition hover:scale-105';

    // 썸네일(없으면 기본)
    let thumbnailHtml = '';
    if (post.thumbnail && post.thumbnail.length > 3) {
      thumbnailHtml = `<img src="${post.thumbnail}" alt="썸네일" class="rounded-xl mb-3 w-full h-52 object-cover" />`;
    }

    // 카드 클릭시 상세 글 보기
    card.onclick = () => {
      renderBlogDetail(post);
      window.scrollTo(0, 0);
    };

    card.innerHTML = `
      ${thumbnailHtml}
      <h3 class="font-bold text-xl mb-2">${post.title}</h3>
      <div class="text-gray-500 text-sm mb-1">${post.date} • ${post.category}</div>
      <p class="text-base">${post.description}</p>
    `;

    blogPosts.appendChild(card);
  });
}

// 상세 글(포스트) 렌더링
function renderBlogDetail(post) {
  const contents = document.getElementById('contents');
  if (!contents) return;

  // 파일 이름 자동 생성(예: 2024-01-21-썸네일이-없는-테스트-파일.md)
  const fileName = `${post.date}-${post.title.replace(/\s+/g, '-').replace(/[\[\]\(\)\.\?]/g,'')}.md`;

  // markdown 파일 가져오기
  fetch(`/weniv_blog/blog/${fileName}`)
    .then(res => {
      if (!res.ok) throw new Error('포스트 파일 없음');
      return res.text();
    })
    .then(md => {
      // 마크다운 파싱 (marked 라이브러리 활용)
      const html = window.marked ? window.marked(md) : md;
      contents.innerHTML = `
        <article class="bg-white bg-opacity-90 rounded-2xl shadow-soft p-8 my-8">
          <div class="mb-4 text-sm text-gray-400">${post.date} • ${post.category}</div>
          <h1 class="font-bold text-2xl mb-4">${post.title}</h1>
          ${post.thumbnail ? `<img src="${post.thumbnail}" alt="" class="rounded-xl mb-6 max-w-full mx-auto" />` : ''}
          <div>${html}</div>
        </article>
        <button onclick="location.reload()" class="mt-4 px-5 py-2 bg-forest text-white rounded-full shadow-glow hover:bg-sky">목록으로</button>
      `;
    })
    .catch(() => {
      contents.innerHTML = `<div class="p-10 text-center text-error">포스트 파일을 찾을 수 없습니다.</div>`;
    });
}

// 검색/필터 등에서 사용될 수 있도록 blogList를 window에 보관
window.renderBlogList = renderBlogList;
window.renderBlogDetail = renderBlogDetail;

// 초기화 함수 예시 (데이터 fetch 후 렌더)
async function initialize() {
  // JSON 데이터 불러오기
  const res = await fetch('/weniv_blog/data/local_blogList.json');
  let blogList = [];
  try {
    blogList = await res.json();
  } catch(e) {
    blogList = [];
  }
  renderBlogList(blogList);

  // 목록을 window로 넘겨두기 (필터, 검색 등에서 활용)
  window.blogList = blogList;
}

window.onload = initialize;
