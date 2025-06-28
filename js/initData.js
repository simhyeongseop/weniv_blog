// initData.js
<script>window.isInitData = false;</script>
// 고정된 로컬 JSON을 사용하여 블로그 리스트 및 메뉴 데이터 가져오기
let blogList = [];
let blogMenu = [];

async function initDataBlogList() {
  if (blogList.length > 0) return blogList;
  const response = await fetch('/data/local_blogList.json');
  if (!response.ok) {
    console.error('blogList JSON 로드 실패:', response.status);
    return [];
  }
  blogList = await response.json();
  return blogList;
}

async function initDataBlogMenu() {
  if (blogMenu.length > 0) return blogMenu;
  const response = await fetch('/data/local_blogMenu.json');
  if (!response.ok) {
    console.error('blogMenu JSON 로드 실패:', response.status);
    return [];
  }
  blogMenu = await response.json();
  return blogMenu;
}
