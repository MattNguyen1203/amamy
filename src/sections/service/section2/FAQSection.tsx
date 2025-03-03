import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer:
      'Bạn có thể nhập mã vận đơn vào công cụ "Theo dõi đơn hàng" trên website để kiểm tra trạng thái đơn hàng của mình theo thời gian thực.',
  },
  {
    question: 'Làm thế nào để theo dõi đơn hàng?',
    answer:
      'Bạn có thể theo dõi đơn hàng thông qua mã vận đơn được cung cấp sau khi đặt hàng. Hệ thống sẽ cập nhật trạng thái đơn hàng theo thời gian thực.',
  },
  {
    question: 'Thời gian vận chuyển trung bình là bao lâu?',
    answer:
      'Thời gian vận chuyển trung bình từ Việt Nam đến Đức thường mất từ 7-10 ngày làm việc, tùy thuộc vào phương thức vận chuyển bạn chọn.',
  },
  {
    question: 'Làm thế nào để tính phí vận chuyển?',
    answer:
      'Phí vận chuyển được tính dựa trên trọng lượng, kích thước gói hàng và phương thức vận chuyển bạn chọn. Bạn có thể sử dụng công cụ tính phí trên website để biết chi phí cụ thể.',
  },
  {
    question: 'Amamy có hỗ trợ thu hộ (COD) không?',
    answer:
      'Có, Amamy có hỗ trợ dịch vụ thu hộ COD cho các đơn hàng nội địa. Tuy nhiên, dịch vụ này không áp dụng cho các đơn hàng quốc tế.',
  },
]

export function FAQSection() {
  return (
    <div className='w-full max-w-3xl rounded-[1.25rem] bg-[#f5f5f9] p-[1.25rem]'>
      <h2 className='font-montserrat font-bold text-[1.25rem] leading-[1.2] tracking-[-0.04em] text-black mb-[1.25rem]'>
        Câu hỏi thường gặp
      </h2>
      <Accordion
        type='single'
        collapsible
        defaultValue='item-0'
        className='w-full space-y-[0.875rem]'
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className='border-none bg-white rounded-2xl  overflow-hidden p-[1.25rem]'
          >
            <AccordionTrigger className='flex w-full items-center p-0 justify-between text-left hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:text-[#38B6FF] font-montserrat font-semibold text-[1rem] leading-[1.625rem] tracking-[-0.03em] text-black flex-grow'>
              <span className='leading-[1.625rem] font-normal'>
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className='mt-[1.25rem]  text-[#000000CC] text-[0.875rem] p-0'>
              <p className='leading-[1.315rem]'>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
