import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/sections/homepage/banner/tabs-custom'

const TrackingOrder = () => {
  return (
    <Tabs
      defaultValue='search-order'
      className='w-[38.1875rem]'
    >
      <TabsList>
        <TabsTrigger value='search-order'>Theo dõi bưu kiện</TabsTrigger>
        <TabsTrigger value='estimate-price'>Dự tính giá vận chuyển</TabsTrigger>
      </TabsList>
      <TabsContent value='search-order'>
        Make changes to your account here.
      </TabsContent>
      <TabsContent value='estimate-price'>
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}
export default TrackingOrder
