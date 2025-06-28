// style/globalStyle.js

// menu style
const menuListStyle = `md:ml-10 text-base leading-snug text-surface font-medium capitalize rounded-full px-4 py-2 shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;

// mobile menu style
const mobileMenuStyle = `m-0 block py-4 px-6 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;

// blog headings
const posth1Style = `text-[40px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posth2Style = `text-[32px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posth3Style = `text-[28px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posth4Style = `text-2xl font-bold mb-2 mt-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posth5Style = `text-xl font-bold mb-2 mt-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posth6Style = `text-lg font-bold mb-2 mt-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;

// blog paragraphs, images, links
const postpStyle = `text-lg my-6 font-normal tracking-wide text-justify rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postimgStyle = `border-4 border-graylv1 rounded-lg my-10 mx-auto block max-w-full h-auto align-middle shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postaStyle = `text-lg text-primary underline rounded-full px-2 py-1 shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;

// lists
const postulStyle = `list-disc list-inside text-lg font-normal tracking-wide text-justify rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postolStyle = `list-decimal list-inside text-lg font-normal tracking-wide text-justify rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postliStyle = `pl-4 mb-2 leading-relaxed tracking-wide text-justify`;

// blockquote & code blocks
const postblockquoteStyle = `border-l-4 border-primary pl-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postpreStyle = `relative bg-graylv1 p-4 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postcodeStyle = `font-mono text-base bg-transparent`;

// tables
const posttableStyle = `table-auto w-auto border-collapse mb-6 h-auto align-middle border-graylv2 text-left rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posttheadStyle = `text-left`;
const postthStyle = `overflow-auto bg-graylv1 border border-graylv2 px-4 py-2.5 font-medium text-sm capitalize whitespace-nowrap rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posttbodyStyle = `text-left`;
const posttdStyle = `border border-graylv2 px-4 py-2.5 text-sm text-gray-700 break-keep`;

// misc text
const posthrStyle = `my-4 border-gray-400 border-2 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const postemStyle = `text-lg font-medium italic pr-0.5`;
const poststrongStyle = `text-lg font-bold`;

// top-level post title, category, author, date
const postcategoryStyle = `bg-activation text-primary text-sm font-medium tracking-wide px-4 py-2 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const posttitleStyle = `md:text-[40px] md:leading-[56px] text-[32px] leading-[40px] font-bold my-3`;
const postauthordateDivStyle = `md:mb-8 mb-6 h-fit`;
const postauthorDivStyle = `inline-block`;
const postauthorImgStyle = `inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden`;
const postauthorStyle = `inline text-sm font-semibold text-black mr-2`;
const postdateStyle = `inline-block text-graylv3 text-sm font-normal`;
const postimgtitleStyle = `w-full max-h-[520px] object-cover object-center my-4 rounded-2xl mx-auto block max-w-full align-middle`;
const postsectionStyle = `w-full mb-10 md:mb-[60px] max-w-full h-auto align-middle`;

// notebook code cell UI
const notebookpreStyle = `relative bg-graylv1 p-8 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const notebookcodeStyle = `font-mono text-base bg-graylv1`;
const notebookcopyButtonStyle = `border border-lv2 copy-button bg-white rounded-[10px] opacity-70 absolute top-5 right-5 p-2 shadow-md`;
const notebookdownloadButtonStyle = `download-button px-5 py-[11px] mb-4 text-sm font-medium text-white bg-primary rounded-[10px] hover:bg-primary`;

// blog list cards
const bloglistFirstCardStyle = `lg:col-span-3 md:col-span-2 col-span-1 h-auto overflow-hidden bg-white flex md:flex-row flex-col flex-1 md:mb-[20px] cursor-pointer rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const bloglistFirstCardImgStyle = `w-full object-cover object-center rounded-2xl overflow-hidden md:h-auto h-[200px] md:w-[49%] lg:w-[52%] shrink-0 mr-8 shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const bloglistFirstCardDescriptionStyle = `text-graylv4 text-base font-normal leading-snug md:max-h-40 md:line-clamp-[7] line-clamp-3 mb-3`;

const bloglistCardStyle = `lg:max-w-sm overflow-hidden bg-white cursor-pointer col-span-1 w-auto rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const bloglistCardImgStyle = `w-full h-[200px] object-cover object-center rounded-2xl overflow-hidden shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const bloglistCardBodyStyle = `py-4`;
const bloglistCardTitleStyle = `font-bold text-2xl mb-3`;
const bloglistCardCategoryStyle = `inline-block bg-activation text-primary md:text-sm font-medium mb-3 px-3 py-1.5 tracking-wide rounded-full shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl`;
const bloglistCardDescriptionStyle = `text-graylv4 text-base font-normal leading-snug h-16 line-clamp-3 mb-3`;
const bloglistCardAuthorDivStyle = `inline-block`;
const bloglistCardAuthorImgStyle = `inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden`;
const bloglistCardAuthorStyle = `inline text-sm font-semibold text-black mr-2`;
const bloglistCardDateStyle = `text-graylv3 text-sm inline-block font-normal`;

// search input
const searchInputStyle = `absolute top-20 right-8 w-[220px] h-10 border border-gray-300 pl-2 text-base font-bold text-gray-600 outline-none box-border bg-white bg-clip-padding rounded-full shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1:hover:shadow-xl`;

// category sidebar
const categoryContainerStyle = `hidden flex-col md:w-[220px] overflow-y-auto bg-white rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1:hover:shadow-xl`;
const categoryItemStyle = `text-base font-normal px-5 py-[9px] cursor-pointer rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1:hover:shadow-xl`;
const categoryItemCountStyle = `text-base font-normal text-graylv3 ml-1`;

// pagination
const paginationStyle = `mt-20 mb-[132px] flex justify-center items-center gap-8`;
const pageMoveButtonStyle = `relative flex items-center rounded-[10px] p-[11px] text-graylv2 bg-graylv1 shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1:hover:shadow-xl`;
const pageNumberListStyle = `flex items-center justify-center gap-1`;
const pageNumberStyle = `relative inline-flex items-center w-10 h-10 px-4 py-2 text-md font-normal text-graylv3`;
const pageNumberActiveStyle = `text-primary font-bold`;
