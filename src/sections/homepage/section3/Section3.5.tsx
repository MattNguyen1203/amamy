import ImageV2 from "@/components/image/ImageV2";
import { ShippingServiceObject } from "@/utils/type";
import Image from "next/image";
import React from "react";

const arrowRightCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.75rem"
    height="1.75rem"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 27.3334C21.3638 27.3334 27.3333 21.3639 27.3333 14.0001C27.3333 6.63629 21.3638 0.666748 14 0.666748C6.63616 0.666748 0.666626 6.63629 0.666626 14.0001C0.666626 21.3639 6.63616 27.3334 14 27.3334ZM16.0404 9.29297L20.0404 13.293C20.4309 13.6835 20.4309 14.3167 20.0404 14.7072L16.0404 18.7072C15.6499 19.0977 15.0167 19.0977 14.6262 18.7072C14.2357 18.3167 14.2357 17.6835 14.6262 17.293L16.9191 15.0001H8.66662C8.11434 15.0001 7.66662 14.5524 7.66662 14.0001C7.66662 13.4478 8.11434 13.0001 8.66662 13.0001H16.9191L14.6262 10.7072C14.2357 10.3167 14.2357 9.6835 14.6262 9.29297C15.0167 8.90245 15.6499 8.90245 16.0404 9.29297Z"
      fill="#BFD0E3"
      fillOpacity="0.6"
    />
  </svg>
);

const arrowRightCircleHover = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.75rem"
    height="1.75rem"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 27.3334C21.3638 27.3334 27.3333 21.3639 27.3333 14.0001C27.3333 6.63629 21.3638 0.666748 14 0.666748C6.63616 0.666748 0.666626 6.63629 0.666626 14.0001C0.666626 21.3639 6.63616 27.3334 14 27.3334ZM16.0404 9.29297L20.0404 13.293C20.4309 13.6835 20.4309 14.3167 20.0404 14.7072L16.0404 18.7072C15.6499 19.0977 15.0167 19.0977 14.6262 18.7072C14.2357 18.3167 14.2357 17.6835 14.6262 17.293L16.9191 15.0001H8.66662C8.11434 15.0001 7.66662 14.5524 7.66662 14.0001C7.66662 13.4478 8.11434 13.0001 8.66662 13.0001H16.9191L14.6262 10.7072C14.2357 10.3167 14.2357 9.6835 14.6262 9.29297C15.0167 8.90245 15.6499 8.90245 16.0404 9.29297Z"
      fill="white"
    />
  </svg>
);

interface CountryCardProps {
  name: string;
  icon: string
}

const CountryCard: React.FC<CountryCardProps> = ({ name, icon }) => (
  <div className="relative w-[16.625rem] h-[11.25rem] overflow-hidden border-[1px] border-solid border-[#F2F2F2] bg-[#FFF] group cursor-pointer">
    <div className="absolute w-[16.8125rem] h-[11.4375rem] -top-px -left-px bg-white border border-solid border-[#f2f2f2] ">
      <div className="absolute top-[1.0625rem] left-5 font-PC-heading-title-20b  text-[1.25rem] not-italic font-bold leading-[120%] group-hover:text-white">
        {name}
      </div>
      
      <ImageV2 alt="" src={icon} width={1000} height={1000} className="hidden group-hover:block" />

      <div className="absolute w-8 h-8 top-[8.75rem] left-4">
        {arrowRightCircle()}
      </div>
      <div className="w-[16.625rem] h-[3rem] bg-[#38B6FF] flex-shrink-0 absolute bottom-0 items-center group-hover:flex hidden">
        <div className="ml-auto mr-[0.5rem]">
          {arrowRightCircleHover()}
        </div>
      </div>
    </div>
    {/* <img className="absolute top-[-2259px] left-[2311px] w-px h-px" alt="Subtract" src={subtract} /> */}
    <div className="absolute w-[0.9375rem] h-[3.9375rem] top-[8.25rem] left-[-1.4375rem] overflow-hidden">
      <div className="absolute w-[17.0625rem] h-[2.9375rem] top-px left-4">
        <div className="absolute w-[16.625rem] h-[2.9375rem] top-0 left-[0.4375rem] bg-blueprimary" />
        <div className="absolute h-5 top-3 left-0 font-PC-button-button-14s text-white">
          TÌM HIỂM THÊM
        </div>
      </div>
     
    </div>
  </div>
);

export const MainContainer = ({sectionCountry}: {sectionCountry: ShippingServiceObject}) => (
  <div className="flex pr-auto h-[33.8125rem] items-start relative rounded-[var(--token-8)] overflow-hidden xsm:hidden">
    <div className="flex flex-col items-start relative  pl-[6rem] w-[27.5rem]">
      <div className="relative self-stretch w-full h-[22.5rem] rounded-[var(--token-8)_0px_0px_0px] overflow-hidden">
        <div className="relative w-[21.5rem] h-[22.5625rem]">
          <div className="absolute w-[21.5rem] h-[22.5625rem] top-0 left-0 bg-[#1dacff]">
            <img
              className="absolute w-[21.5rem] h-[22.5rem] top-0 left-0"
              alt="Mask group"
              src={
                "/homepage/icon/Service-Item-Mask-Group.png"
              }
            />
          </div>
          <p className="absolute w-[16.625rem] top-[1.6875rem] left-7 font-PC-heading-h5  text-[#FFF] text-[2rem] not-italic font-bold leading-[130%]">
            {sectionCountry.title}
          </p>
        </div>
      </div>
      <div className="relative self-stretch w-full h-[11.25rem] bg-[url(/image.png)] bg-[100%_100%]">
        <div className="inline-flex flex-col items-start gap-3 relative z-0">
          <div className="inline-flex items-center gap-2 relative">
            <Image width={1000} height={1000}
              className="relative w-[21.5rem] h-[11.25rem] inset-0"
              alt="Container"
              src={sectionCountry.background.url}
            />
          
          </div>
        </div>
        <div className="absolute z-50 top-[4.13rem] left-[1.5rem]">
            <div className=" w-fit font-PC-sub-SUB-IN-12s text-white flex gap-[0.5rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.236 2.52802C14.9457 1.75871 13.4714 1.35259 11.9692 1.35265C10.467 1.35271 8.99274 1.75895 7.70252 2.52836C6.4123 3.29778 5.35413 4.40174 4.64003 5.72338C3.92592 7.04502 3.58246 8.53515 3.646 10.036C3.659 10.366 3.331 9.98602 3 10C2.669 10.014 2.46 10.417 2.446 10.086C2.39172 8.80166 2.59782 7.51959 3.0519 6.31695C3.50598 5.11431 4.19866 4.01595 5.08825 3.08797C5.97785 2.15999 7.04598 1.42155 8.22837 0.917095C9.41077 0.412639 10.683 0.152588 11.9685 0.152588C13.254 0.152588 14.5262 0.412639 15.7086 0.917095C16.891 1.42155 17.9592 2.15999 18.8487 3.08797C19.7383 4.01595 20.431 5.11431 20.8851 6.31695C21.3392 7.51959 21.5453 8.80166 21.491 10.086C21.4909 10.1668 21.4744 10.2468 21.4426 10.3211C21.4108 10.3954 21.3643 10.4625 21.3059 10.5183C21.2476 10.5742 21.1785 10.6178 21.1029 10.6463C21.0273 10.6748 20.9467 10.6878 20.866 10.6844C20.7852 10.6811 20.706 10.6614 20.6331 10.6267C20.5601 10.5919 20.4949 10.5428 20.4414 10.4823C20.3879 10.4217 20.3472 10.351 20.3217 10.2743C20.2962 10.1976 20.2864 10.1166 20.293 10.036C20.3566 8.53504 20.013 7.04481 19.2989 5.7231C18.5847 4.4014 17.5264 3.29741 16.236 2.52802ZM19.937 17.784C20.0012 17.8298 20.0557 17.8877 20.0974 17.9546C20.1392 18.0214 20.1674 18.0958 20.1804 18.1735C20.1934 18.2512 20.1909 18.3308 20.1732 18.4076C20.1555 18.4843 20.1228 18.5569 20.077 18.621C19.3473 19.6465 18.4216 20.5171 17.3532 21.1824C16.2849 21.8477 15.0952 22.2945 13.853 22.497C13.7742 22.5122 13.6931 22.5115 13.6145 22.4948C13.536 22.4781 13.4616 22.4458 13.3958 22.3998C13.3299 22.3538 13.274 22.2951 13.2313 22.2271C13.1886 22.1591 13.1599 22.0832 13.1471 22.0039C13.1342 21.9247 13.1374 21.8436 13.1565 21.7656C13.1755 21.6876 13.21 21.6142 13.2579 21.5498C13.3058 21.4854 13.3662 21.4312 13.4355 21.3905C13.5047 21.3499 13.5814 21.3235 13.661 21.313C14.7466 21.136 15.7863 20.7454 16.7199 20.1639C17.6535 19.5823 18.4625 18.8213 19.1 17.925C19.1458 17.8609 19.2037 17.8064 19.2705 17.7646C19.3374 17.7228 19.4118 17.6946 19.4895 17.6816C19.5672 17.6686 19.6468 17.6711 19.7235 17.6888C19.8003 17.7066 19.8729 17.7383 19.937 17.784Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3297 9.54447C20.8746 9.40846 21.4477 9.43789 21.9758 9.629C22.5039 9.82011 22.9631 10.1642 23.2947 10.6175C23.7427 11.2275 23.9297 11.9905 23.8157 12.7395L23.2307 16.6165C23.1504 17.1721 22.9065 17.6912 22.5301 18.1077C22.1537 18.5242 21.6618 18.8192 21.1172 18.9551C20.5725 19.091 19.9997 19.0616 19.4717 18.8708C18.9438 18.6799 18.4846 18.3362 18.1527 17.8835C17.7055 17.2724 17.5182 16.5092 17.6317 15.7605L18.2167 11.8845C18.2965 11.3288 18.54 10.8094 18.9162 10.3927C19.2923 9.97589 19.7851 9.68061 20.3297 9.54447ZM22.3267 11.3255C22.1359 11.0646 21.8716 10.8665 21.5676 10.7565C21.2637 10.6465 20.9339 10.6296 20.6203 10.708C20.3067 10.7863 20.0235 10.9563 19.807 11.1964C19.5905 11.4364 19.4504 11.7355 19.4047 12.0555V12.0615L18.8177 15.9405C18.7517 16.3755 18.8607 16.8185 19.1207 17.1735C19.3118 17.4339 19.5761 17.6315 19.88 17.7412C20.1838 17.8509 20.5134 17.8677 20.8268 17.7894C21.1402 17.7111 21.4232 17.5413 21.6397 17.3016C21.8562 17.0619 21.9965 16.7632 22.0427 16.4435V16.4385L22.6297 12.5595C22.6959 12.1242 22.587 11.6805 22.3267 11.3255ZM9.50871 21.3865C9.50766 21.0624 9.57047 20.7413 9.69353 20.4415C9.8166 20.1418 9.99753 19.8692 10.226 19.6393C10.4544 19.4095 10.7259 19.2269 11.0249 19.102C11.324 18.9771 11.6447 18.9124 11.9687 18.9115C12.2928 18.9124 12.6135 18.9771 12.9125 19.102C13.2115 19.2269 13.483 19.4095 13.7115 19.6393C13.9399 19.8692 14.1208 20.1418 14.2439 20.4415C14.367 20.7413 14.4298 21.0624 14.4287 21.3865C14.4306 22.0409 14.1725 22.6692 13.7112 23.1333C13.2498 23.5974 12.6231 23.8594 11.9687 23.8615C11.3143 23.8594 10.6876 23.5974 10.2263 23.1333C9.76496 22.6692 9.50686 22.0409 9.50871 21.3865ZM11.9687 20.1115C11.2777 20.1115 10.7087 20.6775 10.7087 21.3865C10.7087 22.0955 11.2777 22.6615 11.9687 22.6615C12.6597 22.6615 13.2287 22.0955 13.2287 21.3865C13.2287 20.6775 12.6597 20.1115 11.9687 20.1115ZM3.51971 9.08547C2.97477 8.94914 2.40156 8.9783 1.87327 9.16924C1.34497 9.36018 0.885572 9.70423 0.553715 10.1575C0.105885 10.7683 -0.0814742 11.5317 0.0327149 12.2805L0.617715 16.1565C0.697842 16.7122 0.941615 17.2314 1.31796 17.648C1.69431 18.0646 2.18618 18.3598 2.73089 18.4958C3.2756 18.6318 3.84847 18.6025 4.37649 18.4118C4.90451 18.221 5.36377 17.8773 5.69571 17.4245C6.14271 16.8135 6.32971 16.0495 6.21671 15.3015L5.63071 11.4245C5.551 10.8689 5.30764 10.3496 4.93168 9.93289C4.55572 9.51614 4.06418 9.22078 3.51971 9.08447V9.08547ZM1.52171 10.8655C1.71262 10.6046 1.97698 10.4065 2.281 10.2965C2.58503 10.1866 2.91493 10.1698 3.22856 10.2483C3.54219 10.3267 3.82531 10.4969 4.04176 10.737C4.25821 10.9772 4.39815 11.2764 4.44371 11.5965V11.6015L5.03071 15.4815C5.09572 15.9155 4.98771 16.3595 4.72772 16.7145C4.53661 16.9749 4.2723 17.1725 3.96848 17.2822C3.66465 17.3919 3.33504 17.4087 3.02165 17.3304C2.70827 17.2521 2.42527 17.0823 2.20873 16.8426C1.99219 16.6029 1.85189 16.3042 1.80571 15.9845V15.9795L1.21771 12.1005C1.15171 11.6655 1.26071 11.2205 1.52071 10.8665L1.52171 10.8655Z" fill="white"/>
              </svg>
              HOTLINE
            </div>
            <button className="flex mt-[0.75rem] h-12 justify-center text-[#fff] w-[13.5rem] items-center gap-2 rounded-[1.25rem]  
             bg-[var(--Blue-Primary,_#38B6FF)]">
              {sectionCountry.hotline}</button>
        </div>
      </div>
    </div>
    <div className="flex">
      <div className="grid grid-cols-3 w-[50.0625] items-start gap-[0_0] ">
        {sectionCountry.list_country.map((country, index) => (
          <CountryCard key={index} name={country.country} icon={country.flag_img.url} />
        ))}
      </div>
      <div className="flex flex-col w-[16.625rem] h-[33.8125rem] items-start ">
        <CountryCard name="Nhật Bản" icon={sectionCountry.list_country[sectionCountry.list_country.length - 1].flag_img.url} />
        <div className="relative flex-1 self-stretch w-full grow">
          <div className="  ">
            <Image
              className="absolute w-[26.1875rem] h-[22.375rem] top-[0.rem] left-[-0rem]  object-contain overflow-hidden "
              alt="Image" width={6200} height={8400}
              src={sectionCountry.background2.url}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MainContainer;