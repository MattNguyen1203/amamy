import {useEffect, useState} from 'react'

export interface IHeadingInfo {
  text: string
  id: string
  heading: number
}

const useProcessHeadings = (
  htmlString: string,
): {updatedHtml: string; headings: IHeadingInfo[]} => {
  const [headings, setHeadings] = useState<IHeadingInfo[]>([])
  const [updatedHtml, setUpdatedHtml] = useState<string>('')

  useEffect(() => {
    const newHeadings: IHeadingInfo[] = []
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    // Tìm tất cả các thẻ từ h2 đến h6, h3, h4, h5, h6
    const headingElements = doc.querySelectorAll('h2')

    headingElements.forEach((headingElement, index) => {
      const text = headingElement.textContent || ''
      const headingTag = Number(
        headingElement.tagName.toLowerCase().replace('h', ''),
      ) // Lấy số từ thẻ heading
      const id = `${headingElement.tagName.toLowerCase()}-${index}` // Tạo id dạng "h2-0", "h3-1", ...

      // Thêm thông tin vào mảng headings
      newHeadings.push({
        text,
        id,
        heading: headingTag,
      })

      // Thêm id vào thẻ heading
      headingElement.setAttribute('id', id)
    })

    // Cập nhật lại chuỗi HTML với các thẻ đã được thêm id
    const updatedHtmlString = doc.body.innerHTML

    setHeadings(newHeadings)
    setUpdatedHtml(updatedHtmlString)
  }, [htmlString])

  return {updatedHtml, headings}
}

export default useProcessHeadings
