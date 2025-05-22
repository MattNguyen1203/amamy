import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {IServiceFAQ} from '@/utils/type'

interface Prop {
  faqs: IServiceFAQ[]
}

export function FAQSection({faqs}: Prop) {
  return (
    <div className='w-full max-w-3xl rounded-[1.25rem] xsm:rounded-none bg-[#f5f5f9] xsm:bg-[#fafafa] p-[1.25rem] xsm:p-[1rem]'>
      <h2 className='font-montserrat font-bold text-[1.25rem] leading-[1.2] tracking-[-0.04em] text-black mb-[1.25rem]'>
        Câu hỏi thường gặp
      </h2>
      <Accordion
        type='single'
        collapsible
        defaultValue='item-0'
        className='w-full space-y-[0.875rem]'
      >
        {Array.isArray(faqs) &&
          faqs?.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className='border-none bg-white rounded-2xl  overflow-hidden p-[1.25rem] xsm:p-[1rem]'
            >
              <AccordionTrigger className='flex w-full items-center p-0 justify-between text-left hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:text-[#38B6FF] font-montserrat font-semibold text-[1rem] leading-[1.625rem] tracking-[-0.03em] text-black flex-grow'>
                <span className='text-pc-tab-title xsm:text-pc-sub12s text-black'>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className='mt-[1.25rem] pb-0'>
                {/* <p className=' text-black/80 text-pc-14 xsm:text-mb-12'>
                  {faq.answer}
                </p> */}

                <div
                  dangerouslySetInnerHTML={{__html: faq.answer}}
                  className=' text-black/80 text-pc-14 xsm:text-mb-12'
                ></div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
}
