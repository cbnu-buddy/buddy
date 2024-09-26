import { ToastInfoStore } from "@/store/components/ToastInfo";
import { MySubscribedTagInfo } from "@/types/tag";
import Link from "next/link";

interface SubscribedTagListItemProps {
  mySubscribedTagInfo: MySubscribedTagInfo;
  setIsOpenBottomDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTagInfo: {
    tagId: number;
    tag: string;
    isReceiveNotification: boolean;
  };
  setSelectedTagInfo: React.Dispatch<
    React.SetStateAction<{
      tagId: number;
      tag: string;
      isReceiveNotification: boolean;
    }>
  >;
}

export default function SubscribedTagListItem(
  props: SubscribedTagListItemProps
) {
  const { mySubscribedTagInfo, setIsOpenBottomDrawer, setSelectedTagInfo } =
    props;

  return (
    <Link
      href={`/community/feed?tag=${mySubscribedTagInfo.tag}`}
      className="w-full flex justify-between items-center bg-[#f9fafb] p-4 rounded-md"
    >
      <div className="flex items-center gap-x-3">
        <div
          className="w-fit flex justify-center items-center p-1 rounded-full"
          style={{ background: "rgba(2, 32, 71, 0.05" }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-v-9b82dcfc=""
            className=""
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z"
              fill="#98A4B7"
              data-v-9b82dcfc=""
            ></path>
          </svg>
        </div>
        <div className="flex flex-col items-start text-[#333d4b] font-medium">
          <span className="text-sm">{mySubscribedTagInfo.tag}</span>
          <span className="text-xs font-light">게시글 3개</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setSelectedTagInfo(mySubscribedTagInfo);
          setIsOpenBottomDrawer(true);
        }}
        className="relative w-24 flex justify-center items-center gap-x-[0.175rem] px-7 py-2 rounded-full border border-[#3a8af9]"
      >
        {mySubscribedTagInfo.isReceiveNotification ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="17.5"
            viewBox="0 -960 960 960"
            width="17.5"
            fill="#3a8af9"
            className="absolute left-[0.6rem]"
          >
            <path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="17.5"
            viewBox="0 -960 960 960"
            width="17.5"
            fill="#3a8af9"
            className="absolute left-[0.6rem]"
          >
            <path d="M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z" />
          </svg>
        )}

        <span className="text-[0.8rem] font-medium text-[#3a8af9]">구독중</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25"
          viewBox="0 -960 960 960"
          width="25"
          fill="#3a8af9"
          className="absolute right-[0.375rem]"
        >
          <path d="M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z" />
        </svg>
      </button>
    </Link>
  );
}
