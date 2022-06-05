// 修改页面标题，描述,关键词...
export const documentUpdate = (title, description, keywords) => {
  document.title = title
  const meta = document.getElementsByTagName('meta')
  meta.description.content = description
  meta.keywords.content = keywords
}
