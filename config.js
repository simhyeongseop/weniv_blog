// config.js

const siteConfig = {
  username: "simhyeongseop", // <<--- 'simhyeongseop'으로 정확히 입력!
  repositoryName: "weniv_blog", // <<--- 'weniv_blog'로 정확히 입력!
  mainColor: "#3498db",
  textColor: "#333333",
  blogTitle: "심형섭 블로그",
};

const users = [
  {
    id: 0, // default author
    username: "심형섭",
    company: "충남대학교",
    position: "2학년 학부생",
    img: "img/user/profile-max.png",
  },
];

const localDataUsing = false; // GitHub API를 사용하여 블로그 목록을 가져올 것이므로 false로 유지
/*
localDataUsing는 아직 사용하는 데이터가 아닙니다.
1. false일 경우에도 로컬에서 live server(127.0.0.1)를 사용하면 local 데이터를 사용합니다.
2. true일 경우 local 데이터를 사용합니다 접속자가 많을 경우 true 변경하고 local 데이터를 작성하고 사용하시길 권합니다.
*/

const postsPerPage = 9;
let currentPage = 1;