"use client"

import { useState } from "react"
import { Search, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrackingInterface() {
  const [activeTab, setActiveTab] = useState("track")
  return (
    <div className="w-full max-w-3xl mx-auto p-4 xsm:p-0 xsm:max-w-[calc(100vw-2rem)] xsm:w-[calc(100vw-2rem)] xsm:rounded-[1.25rem] xsm:mx-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full xsm:max-w-[calc(100vw-2rem)]">
        <TabsList className={`h-14 p-0 bg-transparent justify-start bg-[#D9D9D9] w-fit xsm:w-full xsm:h-[2.5rem] xsm:max-w-[calc(100vw-2rem)] xsm:rounded-t-[1.25rem]`}>
          <TabsTrigger
            value="track"
            className="w-[11.8125rem] h-full rounded-none rounded-t-[0.5rem] data-[state=inactive]:rounded-br-[0.5rem] !shadow-none data-[state=active]:bg-white data-[state=active]:text-[#2a3441]
             data-[state=inactive]:bg-[#d9d9d9] data-[state=inactive]:text-[#2a3441]/60 text-lg font-medium
             xsm:text-[0.75rem] xsm:not-italic xsm:leading-4 xsm:rounded-t-[1.25rem] xsm:w-1/2
             "
          >
            Theo dõi bưu kiện
          </TabsTrigger>
          <TabsTrigger
            value="estimate"
            className="w-[14.375rem] h-full rounded-none rounded-t-[0.5rem] data-[state=inactive]:rounded-bl-[0.5rem] !shadow-none data-[state=active]:bg-white
             data-[state=active]:text-[#2a3441] data-[state=inactive]:bg-[#d9d9d9] data-[state=inactive]:text-[#2a3441]/60 text-lg font-medium
              xsm:text-[0.75rem] xsm:not-italic xsm:leading-4 xsm:rounded-t-[1.25rem] xsm:w-1/2"
          >
            Dự tính giá vận chuyển
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab == 'track' && <div className="bg-white rounded-b-3xl p-6 space-y-4 xsm:p-[1rem]">
        <Input placeholder="Nhập mã vận đơn" className="h-14 text-lg rounded-xl border-[#d9d9d9] xsm:rounded-full xsm:h-[2.5rem]
        xsm:text-[0.8125rem] xsm:not-italic xsm:font-medium xsm:leading-4" />
        <Button className="w-full h-14 text-lg font-medium bg-[#38b6ff] hover:bg-[#38b6ff]/90 rounded-xl
        xsm:flex xsm:h-10 xsm:px-6 xsm:py-3 xsm:flex-row-reverse xsm:rounded-full xsm:justify-center xsm:items-center xsm:gap-3 xsm:self-stretch 
        xsm:!mt-[0.5rem]">
          <Search className="w-6 h-6 mr-2" />
          Tra cứu đơn hàng
        </Button>
      </div>}
      {activeTab == 'estimate' && 
         <div className="bg-white rounded-b-3xl p-6 space-y-4">
         <h1 className="text-[0.75rem] not-italic font-semibold leading-[normal] tracking-[-0.015rem] uppercase text-black ">TRÒ CHUYỆN VỚI TRỢ LÝ AI AMAMY</h1>
 
         {/* Chat Input Area */}
         <div className="">
           <div className="flex items-center  p-[1px] rounded-xl bg-gradient-to-r from-[#c1e8ff] relative to-white  "
           style={{
            'boxShadow': '0px 0px 12.7px 0px rgba(47, 92, 175, 0.30)'
           }}>
             <div className="text-[#38b6ff] flex-shrink-0 absolute bottom-1/2 translate-y-1/2 left-[0.6rem]">
             <EffectStartIcon />
             </div>
             <div className="flex bg-[#38b6ff] rounded-xl w-full">
             <Input
               className="flex-1 pl-[3.25rem] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#29343e] placeholder:text-[#29343e]/60
               bg-white h-[3.5rem] xsm:px-[1rem]
               "
               placeholder="VD: Gửi 10kg hàng từ Việt Nam đến Mỹ"
             />
             <button className="bg-[#38b6ff] hover:bg-[#38b6ff]/90 rounded-xl h-[3.5rem] flex justify-center  items-center w-[3.5rem] ">
              <SendIcon />
                </button>
             </div>
           </div>
           <p className="text-[#29343e]/70 text-sm mt-2 px-4">
             Hãy nhập thông tin vận chuyển vào box chat để nhận báo giá từ trợ lý AI.
           </p>
         </div>
       </div>
      }
    </div>
  )
}



const EffectStartIcon = () => {
  return  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.6 21.7C21.2 21.7 20.9 21.5 20.7 21.2L19.5 19.1C19 18 18 17 16.9 16.4L14.8 15.2C14.5 15.1 14.3 14.7 14.3 14.4C14.3 14 14.5 13.7 14.8 13.5L16.9 12.3C18 11.7 19 10.8 19.6 9.6L20.8 7.5C20.9 7.2 21.3 7 21.6 7C22 7 22.3 7.2 22.5 7.5L23.7 9.6C24.3 10.7 25.3 11.7 26.4 12.3L28.5 13.5C28.8 13.7 29 14 29 14.4C29 14.8 28.8 15.1 28.5 15.3L26.4 16.5C25.3 17.1 24.3 18.1 23.7 19.2L22.5 21.3C22.3 21.5 22 21.7 21.6 21.7Z" fill="#38B6FF"/>
  <path d="M12.5 29C12.1 29 11.8 28.8 11.6 28.5L11 27.3C10.5 26.3 9.7 25.5 8.7 25L7.5 24.4C7.2 24.2 7 23.8 7 23.5C7 23.1 7.2 22.8 7.5 22.6L8.7 22C9.7 21.5 10.5 20.7 11 19.7L11.6 18.5C12 17.9 13 17.9 13.4 18.5L14 19.7C14.5 20.7 15.3 21.5 16.3 22L17.5 22.6C17.8 22.8 18 23.1 18 23.5C18 23.9 17.8 24.2 17.5 24.4L16.4 25C15.4 25.5 14.6 26.3 14.1 27.3L13.5 28.5C13.2 28.8 12.9 29 12.5 29Z" fill="#38B6FF"/>
</svg>
}

const SendIcon = () =>   <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.4015 2.15198L2.5455 7.75798L2.1875 7.89398V8.53398L9.5675 13.466L15.2175 7.81598L16.2785 8.87698L10.6165 14.538L15.3535 21.626L15.5265 21.848H16.1685L21.7625 2.89398L21.8125 2.58198L21.4015 2.15198Z" fill="white"/>
</svg>