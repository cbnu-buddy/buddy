import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';
import { UserInfoStore } from '@/store/UserInfo';

interface AddPointModalProps {
  openAddPointModal: string | undefined;
  setOpenAddPointModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  payment: () => void;
  setRechargePoint: React.Dispatch<React.SetStateAction<string | number>>;
  rechargePoint: string | number;
}

export default function AddPointModal({
  openAddPointModal,
  setOpenAddPointModal,
  payment,
  setRechargePoint,
  rechargePoint,
}: AddPointModalProps) {
  const userInfo = UserInfoStore((state: any) => state.userInfo);

  const [isDropdownMousedown, setIsDropdownMousedown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // Dropdown 요소에 대한 ref 추가

  const handleClickOutsideDown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownMousedown(true);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    AOS.init();
    document.addEventListener('mousedown', handleClickOutsideDown);
    document.addEventListener('mouseup', () => {
      if (setIsDropdownMousedown) setIsDropdownMousedown(false);
    });
  }, [isDropdownOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // 쉼표 제거
    const numberValue = Number(value);

    if (!isNaN(numberValue)) {
      setRechargePoint(numberValue);
    }
  };

  return (
    <Modal
      size='sm'
      show={openAddPointModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <div className='h-[9rem] w-full'>
          <p className='text-lg font-bold'>버디 포인트 충전</p>

          <div className='relative'>
            <input
              value={rechargePoint.toLocaleString()}
              type='text'
              placeholder='금액 입력'
              ref={inputRef}
              className='mt-3 w-full h-[2.25rem] text-right placeholder-gray-400 text-lg border-gray-300 bg-gray-50 font-bold tracking-tight focus:ring-0 focus:border-gray-300'
              onMouseUp={() => {
                if (!isDropdownMousedown) setIsDropdownOpen(true);
              }}
              onClick={() => {
                setIsDropdownMousedown(false);
              }}
              onChange={handleInputChange}
            />

            {isDropdownOpen && (
              <div
                ref={dropdownRef} // Dropdown 요소에 ref 추가
                id='fixed'
                className='w-[19rem] z-10 fixed text-right mt-1 bg-white divide-y divide-gray-100 shadow-xl drop-shadow-xl dark:bg-gray-700'
              >
                <ul className='text-[0.8rem] font-light tracking-tight text-gray-700 dark:text-gray-200'>
                  <li
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                    onClick={() => {
                      setRechargePoint('');
                      inputRef.current?.focus();
                      setIsDropdownOpen(false);
                    }}
                  >
                    직접입력
                  </li>
                  <li
                    onClick={() => {
                      setRechargePoint(5000);
                      setIsDropdownOpen(false);
                    }}
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                  >
                    5,000
                  </li>
                  <li
                    onClick={() => {
                      setRechargePoint(10000);
                      setIsDropdownOpen(false);
                    }}
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                  >
                    10,000
                  </li>
                  <li
                    onClick={() => {
                      setRechargePoint(30000);
                      setIsDropdownOpen(false);
                    }}
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                  >
                    30,000
                  </li>
                  <li
                    onClick={() => {
                      setRechargePoint(50000);
                      setIsDropdownOpen(false);
                    }}
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                  >
                    50,000
                  </li>
                  <li
                    onClick={() => {
                      setRechargePoint(100000);
                      setIsDropdownOpen(false);
                    }}
                    className='block px-4 py-[0.6rem] hover:bg-[#f0f2f9] dark:hover:bg-[#f0f2f9] dark:hover:text-white'
                  >
                    100,000
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className='mt-7 flex flex-col gap-y-2'>
            <div className='flex justify-between text-xs'>
              <span>보유 버디 포인트</span>
              <div className='flex gap-x-[0.05rem]'>
                <span>{Number(userInfo.point).toLocaleString()}</span>
              </div>
            </div>

            <div className='flex justify-between text-xs'>
              <span>충전 후 버디 포인트</span>
              <div className='flex gap-x-[0.05rem]'>
                <span>
                  {Number(
                    userInfo.point + Number(rechargePoint)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-4 pb-5'>
        <button
          onClick={() => {
            setRechargePoint(10000);
            setOpenAddPointModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          취소
        </button>
        <button
          onClick={() => {
            if (typeof rechargePoint === 'number' && rechargePoint < 1000) {
              alert('최소 결제금액은 1000입니다.');
              inputRef.current?.focus();
              return;
            }
            payment();
            setOpenAddPointModal(undefined);
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          충전하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
