// style/globalStyle.js

// Neumorphism helper: adds rounded corners, soft shadow, and smooth hover animation
const nm = (cls) => `${cls} rounded-lg shadow-soft transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-glow`;

// menu style
export const menuListStyle = nm('md:ml-10 text-base leading-snug text-surface font-medium capitalize');

// mobile menu style
export const mobileMenuStyle = nm('m-0 block py-4 px-6');

// blog headings
export const posth1Style = nm('text-[40px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5');
export const posth2Style = nm('text-[32px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5');
export const posth3Style = nm('text-[28px] font-bold mb-4 mt-6 border-b border-graylv2 pb-2.5');
export const posth4Style = nm('text-2xl font-bold mb-2 mt-4');
export const posth5Style = nm('text-xl font-bold mb-2 mt-4');
export const posth6Style = nm('text-lg font-bold mb-2 mt-4');

// blog paragraphs, images, links
export const postpStyle = nm('text-lg my-6 font-normal tracking-wide text-justify');
export const postimgStyle = nm('border-4 border-graylv1 rounded my-10 mx-auto block max-w-full h-auto align-middle');
export const postaStyle = nm('text-lg text-primary underline');

// lists
export const postulStyle = nm('list-disc list-inside text-lg font-normal tracking-wide text-justify');
export const postolStyle = nm('list-decimal list-inside text-lg font-normal tracking-wide text-justify');
export const postliStyle = nm('pl-4 mb-2 leading-relaxed tracking-wide text-justify');

// blockquote & code blocks
export const postblockquoteStyle = nm('border-l-4 border-primary pl-4');
export const postpreStyle = nm('relative bg-graylv1 p-4 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle');
export const postcodeStyle = nm('font-mono text-base bg-transparent');

// tables
export const posttableStyle = nm('table-auto w-auto border-collapse mb-6 h-auto align-middle border-graylv2 text-left');
export const posttheadStyle = nm('text-left');
export const postthStyle = nm('overflow-auto bg-graylv1 border border-graylv2 px-4 py-2.5 font-medium text-sm capitalize whitespace-nowrap');
export const posttbodyStyle = nm('text-left');
export const posttdStyle = nm('border border-graylv2 px-4 py-2.5 text-sm text-gray-700 break-keep');

// misc text
export const posthrStyle = nm('my-4 border-gray-400 border-2');
export const postemStyle = nm('text-lg font-medium italic pr-0.5');
export const poststrongStyle = nm('text-lg font-bold');

// top-level post title, category, author, date
export const postcategoryStyle = nm('bg-activation text-primary text-sm font-medium px-3 py-1.5 tracking-wide');
export const posttitleStyle = nm('md:text-[40px] md:leading-[56px] text-[32px] leading-[40px] font-bold my-3');
export const postauthordateDivStyle = nm('md:mb-8 mb-6 h-fit');
export const postauthorDivStyle = nm('inline-block');
export const postauthorImgStyle = nm('inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden');
export const postauthorStyle = nm('inline text-sm font-semibold text-black mr-2');
export const postdateStyle = nm('inline-block text-graylv3 text-sm font-normal');
export const postimgtitleStyle = nm('w-full max-h-[520px] object-cover object-center my-4 rounded-2xl mx-auto block max-w-full align-middle');
export const postsectionStyle = nm('w-full mb-10 md:mb-[60px] max-w-full h-auto align-middle');

// notebook code cell UI
export const notebookpreStyle = nm('relative bg-graylv1 p-8 rounded-[10px] mb-6 text-base font-medium overflow-auto whitespace-pre-wrap break-words text-justify max-w-full h-auto align-middle');
export const notebookcodeStyle = nm('font-mono text-base bg-graylv1');
export const notebookcopyButtonStyle = nm('border border-lv2 copy-button bg-white opacity-70 absolute top-5 right-5 p-2 shadow-md');
export const notebookdownloadButtonStyle = nm('download-button px-5 py-[11px] mb-4 text-sm font-medium text-white bg-primary');

// blog list cards
export const bloglistFirstCardStyle = nm('lg:col-span-3 md:col-span-2 col-span-1 h-auto overflow-hidden bg-white flex md:flex-row flex-col flex-1 md:mb-[20px] cursor-pointer');
export const bloglistFirstCardImgStyle = nm('w-full object-cover object-center rounded-2xl overflow-hidden md:h-auto h-[200px] md:w-[49%] lg:w-[52%] shrink-0 mr-8');
export const bloglistFirstCardDescriptionStyle = nm('text-graylv4 text-base font-normal leading-snug md:max-h-40 md:line-clamp-[7] line-clamp-3 mb-3');

export const bloglistCardStyle = nm('lg:max-w-sm overflow-hidden bg-white cursor-pointer col-span-1 w-auto');
export const bloglistCardImgStyle = nm('w-full h-[200px] object-cover object-center rounded-2xl overflow-hidden');
export const bloglistCardBodyStyle = nm('py-4');
export const bloglistCardTitleStyle = nm('font-bold text-2xl mb-3');
export const bloglistCardCategoryStyle = nm('inline-block bg-activation text-primary md:text-sm font-medium mb-3 px-3 py-1.5 tracking-wide');
export const bloglistCardDescriptionStyle = nm('text-graylv4 text-base font-normal leading-snug h-16 line-clamp-3 mb-3');
export const bloglistCardAuthorDivStyle = nm('inline-block');
export const bloglistCardAuthorImgStyle = nm('inline w-8 h-8 rounded-full object-cover object-center mr-2 border border-graylv2 overflow-hidden');
export const bloglistCardAuthorStyle = nm('inline text-sm font-semibold text-black mr-2');
export const bloglistCardDateStyle = nm('text-graylv3 text-sm inline-block font-normal');

// search input
export const searchInputStyle = nm('absolute top-20 right-8 w-[220px] h-10 border border-gray-300 pl-2 text-base font-bold text-gray-600 outline-none box-border bg-white bg-clip-padding');

// category sidebar
export const categoryContainerStyle = nm('hidden flex-col md:w-[220px] overflow-y-auto bg-white');
export const categoryItemStyle = nm('text-base font-normal px-5 py-[9px] cursor-pointer');
export const categoryItemCountStyle = nm('text-base font-normal text-graylv3 ml-1');

// pagination
export const paginationStyle = nm('mt-20 mb-[132px] flex justify-center items-center gap-8');
export const pageMoveButtonStyle = nm('relative flex items-center rounded-[10px] p-[11px] text-graylv2 bg-graylv1');
export const pageNumberListStyle = nm('flex items-center justify-center gap-1');
export const pageNumberStyle = nm('relative inline-flex items-center w-10 h-10 px-4 py-2 text-md font-normal text-graylv3');
export const pageNumberActiveStyle = nm('text-primary font-bold');
