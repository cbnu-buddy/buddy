'use client';

import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Slider } from 'rsuite';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import WarningStartPartyTodayModal from './WarningStartPartyTodayModal';
import { AddPartyDetailProps } from '../page';

interface SelectPartyDurationProps {
  resData: AddPartyDetailProps;
}

export default function SelectPartyDuration({
  resData,
}: SelectPartyDurationProps) {
  const partyInfo = AddPartyInfoStore((state: any) => state.partyInfo);
  const updateStartDate = AddPartyInfoStore(
    (state: any) => state.updateStartDate
  );
  const updateDurationMonth = AddPartyInfoStore(
    (state: any) => state.updateDurationMonth
  );
  const updateEndDate = AddPartyInfoStore((state: any) => state.updateEndDate);
  const updateStepName = AddPartyInfoStore(
    (state: any) => state.updateStepName
  );

  const [isCalendarMousedown, setIsCalendarMousedown] = useState(false);
  const [openSelectStartDateWindow, setOpenSelectStartDateWindow] =
    useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    partyInfo.startDate
  );
  const [openSelectDurationMonthWindow, setOpenSelectDurationMonthWindow] =
    useState(false);
  const [sliderDurationMonth, setSliderDurationMonth] = useState(
    partyInfo.durationMonth ? partyInfo.durationMonth : 12
  );
  const [selectedDurationMonth, setSelectedDurationMonth] = useState(
    partyInfo.durationMonth
  );
  const [openSelectEndDateWindow, setOpenSelectEndDateWindow] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(partyInfo.endDate);

  const [openWarningStartPartyTodayModal, setOpenWarningStartPartyTodayModal] =
    useState<string | undefined>();

  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 29);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  // Calculate the dates to be displayed in the calendar
  const getCalendarDates = (startDate: Date): Date[] => {
    const dates: Date[] = [];
    const firstDayOfCalendar = new Date(startDate);
    firstDayOfCalendar.setDate(startDate.getDate() - startDate.getDay() - 7);

    for (let i = 0; i < 49; i++) {
      const date = new Date(firstDayOfCalendar);
      date.setDate(firstDayOfCalendar.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const calendarDates = getCalendarDates(today);

  const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    return date >= start && date <= end;
  };

  const handleClickOutsideDown = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarMousedown(true);
      setOpenSelectStartDateWindow(false);
      setOpenSelectDurationMonthWindow(false);
      setOpenSelectEndDateWindow(false);
    }
  };

  useEffect(() => {
    AOS.init();
    document.addEventListener('mousedown', handleClickOutsideDown);
    document.addEventListener('mouseup', () => {
      if (isCalendarMousedown) setIsCalendarMousedown(false);
    });
  }, [isCalendarMousedown]);

  return (
    <div className='w-[25rem]'>
      <p
        className='text-[1.35rem] leading-[1.55] font-semibold'
        data-aos='fade-zoom'
        data-aos-easing='ease-out'
        data-aos-duration='1500'
      >
        파티 기간을 <br />
        선택해 주세요.
      </p>
      <div className='flex flex-col gap-y-[0.6rem] mt-8'>
        <div className='relative'>
          <button
            className='flex justify-between items-center border-[1.25px] border-[#d3d3d3] w-full px-4 py-3 rounded-lg'
            onMouseUp={() => {
              if (!isCalendarMousedown) setOpenSelectStartDateWindow(true);
            }}
            onClick={() => {
              setIsCalendarMousedown(false);
            }}
          >
            <span className='text-xs text-[#8b8b8b]'>시작일</span>
            <div className='flex items-center gap-x-[0.375rem]'>
              <span
                className={`${
                  !selectedStartDate && 'text-[#8b8b8b]'
                } text-[0.825rem] font-semibold`}
              >
                {selectedStartDate ? selectedStartDate : '선택'}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='27.5px'
                viewBox='0 -960 960 960'
                width='27.5px'
                fill='#8b8b8b'
                className={`${
                  openSelectStartDateWindow && '-rotate-180'
                } duration-200`}
              >
                <path d='M480-373.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L274.92-563.54q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.77l162.92-162.92q8.31-8.31 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.69 8.69 21.07 0 12.39-8.69 21.08L505.31-383.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31Z' />
              </svg>
            </div>
          </button>
          {openSelectStartDateWindow && (
            <div
              ref={calendarRef}
              data-aos='fade-zoom'
              data-aos-easing='ease-out'
              data-aos-duration='250'
              className='window absolute mt-3 w-full py-7 flex flex-col items-center justify-center rounded-lg bg-white'
            >
              <div className='w-[18rem]'>
                <p className='text-[0.8rem] text-center font-semibold'>
                  {today.getFullYear()}년 {today.getMonth() + 1}월
                </p>
                <div className='mx-auto mt-4 p-2 flex justify-center gap-x-8 text-[0.5rem] font-light text-[#656565] border-b border-[#efefef]'>
                  {daysOfWeek.map((day) => (
                    <span key={day} className='text-inherit'>
                      {day}
                    </span>
                  ))}
                </div>
                <div className='mt-2 flex flex-col gap-y-1'>
                  {Array.from({ length: 7 }, (_, weekIndex) => (
                    <div
                      key={weekIndex}
                      className='flex justify-center gap-x-[0.7rem] text-xs font-light'
                    >
                      {calendarDates
                        .slice(weekIndex * 7, weekIndex * 7 + 7)
                        .map((date) => {
                          const dateString = date.toISOString().split('T')[0];
                          const isToday = dateString === todayString;
                          const isEnabled = isDateInRange(date, today, maxDate);

                          return (
                            <button
                              key={dateString}
                              className={`relative w-9 h-8 rounded-full ${
                                isEnabled
                                  ? 'hover:bg-[#eaf3fe] text-black'
                                  : 'line-through text-[#d3d3d3]'
                              } ${isToday && 'text-[#3a8af9]'}`}
                              onClick={() => {
                                if (isEnabled) {
                                  setSelectedStartDate(dateString);
                                  setOpenSelectStartDateWindow(false);
                                  if (isToday) {
                                    setOpenWarningStartPartyTodayModal(
                                      'default'
                                    );
                                  }
                                }
                              }}
                              disabled={!isEnabled}
                            >
                              {isToday && (
                                <span className='absolute right-[0.3rem] bottom-[1.375rem] text-[#1c6cdb] text-[0.5rem] leading-none'>
                                  오늘
                                </span>
                              )}
                              {date.getDate()}
                              {date.getDate() === 1 && (
                                <span className='absolute right-[-0.2rem] bottom-[-0.3rem] text-[#b9b9b9] text-[0.5rem]'>
                                  {date.getFullYear()}.{date.getMonth() + 1}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ))}
                </div>

                <p className='mt-5 text-[0.5rem] font-light text-[#656565]'>
                  오늘부터 30일 이내의 날짜만 선택 가능합니다.
                </p>
              </div>
            </div>
          )}
          {openWarningStartPartyTodayModal && (
            <WarningStartPartyTodayModal
              openWarningStartPartyTodayModal={openWarningStartPartyTodayModal}
              setOpenWarningStartPartyTodayModal={
                setOpenWarningStartPartyTodayModal
              }
            />
          )}

          {selectedStartDate && (
            <>
              <button
                className='mt-3 flex justify-between items-center border-[1.25px] border-[#d3d3d3] w-full px-4 py-3 rounded-lg'
                onMouseUp={() => {
                  if (!isCalendarMousedown)
                    setOpenSelectDurationMonthWindow(true);
                }}
                onClick={() => {
                  setIsCalendarMousedown(false);
                }}
              >
                <span className='text-xs text-[#8b8b8b]'>파티 기간</span>
                <div className='flex items-center gap-x-[0.375rem]'>
                  <span
                    className={`${
                      !selectedDurationMonth && 'text-[#8b8b8b]'
                    } text-[0.825rem] font-semibold`}
                  >
                    {selectedDurationMonth
                      ? selectedDurationMonth + '개월'
                      : '선택'}
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='27.5px'
                    viewBox='0 -960 960 960'
                    width='27.5px'
                    fill='#8b8b8b'
                    className={`${
                      openSelectDurationMonthWindow && '-rotate-180'
                    } duration-200`}
                  >
                    <path d='M480-373.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L274.92-563.54q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.77l162.92-162.92q8.31-8.31 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.69 8.69 21.07 0 12.39-8.69 21.08L505.31-383.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31Z' />
                  </svg>
                </div>
              </button>
              {openSelectDurationMonthWindow && (
                <div
                  ref={calendarRef}
                  data-aos='fade-zoom'
                  data-aos-easing='ease-out'
                  data-aos-duration='250'
                  className='window absolute mt-3 w-full py-7 flex flex-col items-center justify-center rounded-lg bg-white'
                >
                  <div className='w-[21rem]'>
                    <p className='text-[0.8rem] font-semibold'>
                      파티 기간을 선택해 주세요.
                    </p>
                    <p className='text-[0.5rem] text-[#656565] font-light'>
                      최소 2개월 이상의 파티만 만들 수 있어요.
                    </p>

                    <div className='mt-5 rounded-lg bg-[#f6f6f6] px-4 py-3 font-medium'>
                      <p>{sliderDurationMonth}개월</p>
                    </div>

                    <Slider
                      value={sliderDurationMonth}
                      min={2}
                      max={12}
                      step={1}
                      defaultValue={12}
                      progress
                      className='mt-7 slider'
                      onChange={(value) => setSliderDurationMonth(value)}
                    />

                    <div className='mt-2 relative text-[0.5rem] text-[#8b8b8b]'>
                      <span className='absolute left-[-0.2rem] text-inherit'>
                        2
                      </span>
                      <span className='absolute left-[1.9rem] text-inherit'>
                        3
                      </span>
                      <span className='absolute left-[4rem] text-inherit'>
                        4
                      </span>
                      <span className='absolute left-[6.1rem] text-inherit'>
                        5
                      </span>
                      <span className='absolute left-[8.2rem] text-inherit'>
                        6
                      </span>
                      <span className='absolute left-[10.3rem] text-inherit'>
                        7
                      </span>
                      <span className='absolute left-[12.4rem] text-inherit'>
                        8
                      </span>
                      <span className='absolute left-[14.5rem] text-inherit'>
                        9
                      </span>
                      <span className='absolute left-[16.35rem] text-inherit'>
                        10
                      </span>
                      <span className='absolute left-[18.5rem] text-inherit'>
                        11
                      </span>
                      <span className='absolute left-[20.6rem] text-inherit'>
                        12
                      </span>
                    </div>

                    <p className='mt-8 text-[#8b8b8b] text-[0.5rem] text-right font-semibold'>
                      (개월)
                    </p>

                    <div className='flex justify-end gap-x-2 mt-7'>
                      <button
                        className='bg-[#eaf3fe] rounded-lg p-2 hover:brightness-[96%]'
                        onClick={() => setSliderDurationMonth(12)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='27.5px'
                          viewBox='0 -960 960 960'
                          width='27.5px'
                          fill='#3a8af9'
                        >
                          <path d='M404.92-150.08q-99.15-25.15-162.03-105.04Q180-335 180-440q0-53.92 18.81-103.11 18.81-49.2 52.65-90.27 8.31-9.31 20.08-9.62 11.77-.31 21.69 9.62 8.31 8.3 8.62 20.26.3 11.97-8 22.5-26.31 31.39-40.08 69.93Q240-482.15 240-440q0 82.54 49.81 146.81t127.5 85.34q9.92 2.85 16.31 11.16 6.38 8.3 6.38 18.23 0 15-10.35 23.61-10.34 8.62-24.73 4.77Zm150.16.77q-14.39 3.85-24.73-5.08Q520-163.31 520-178.31q0-9.31 6.38-17.61 6.39-8.31 16.31-11.54 77.31-23.62 127.31-87 50-63.39 50-145.54 0-100-70-170t-170-70h-14.15l32.92 32.92q8.69 8.7 8.69 21.08 0 12.39-8.69 21.08-8.69 8.69-21.08 8.69-12.38 0-21.07-8.69l-79.77-79.77q-5.62-5.62-7.93-11.85-2.3-6.23-2.3-13.46t2.3-13.46q2.31-6.23 7.93-11.85l79.77-79.77q8.69-8.69 21.07-8.69 12.39 0 21.08 8.69 8.69 8.7 8.69 21.08 0 12.39-8.69 21.08L465.85-740H480q125.54 0 212.77 87.23T780-440q0 104-63.08 184T555.08-149.31Z' />
                        </svg>
                      </button>

                      <button
                        className='bg-[#3a8af9] hover:bg-[#1c6cdb] text-white font-semibold rounded-lg px-5 py-2'
                        onClick={() => {
                          setSelectedDurationMonth(sliderDurationMonth);
                          setOpenSelectDurationMonthWindow(false);
                        }}
                      >
                        선택하기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {selectedDurationMonth !== 0 && (
            <>
              <button
                className='mt-3 flex justify-between items-center border-[1.25px] border-[#d3d3d3] w-full px-4 py-3 rounded-lg'
                onMouseUp={() => {
                  if (!isCalendarMousedown) setOpenSelectEndDateWindow(true);
                }}
                onClick={() => {
                  setIsCalendarMousedown(false);
                }}
              >
                <span className='text-xs text-[#8b8b8b]'>종료일</span>
                <div className='flex items-center gap-x-[0.375rem]'>
                  <span
                    className={`${
                      !selectedEndDate && 'text-[#8b8b8b]'
                    } text-[0.825rem] font-semibold`}
                  >
                    {selectedEndDate ? selectedEndDate : '선택'}
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='27.5px'
                    viewBox='0 -960 960 960'
                    width='27.5px'
                    fill='#8b8b8b'
                    className={`${
                      openSelectEndDateWindow && '-rotate-180'
                    } duration-200`}
                  >
                    <path d='M480-373.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L274.92-563.54q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.77l162.92-162.92q8.31-8.31 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.69 8.69 21.07 0 12.39-8.69 21.08L505.31-383.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31Z' />
                  </svg>
                </div>
              </button>
              {openSelectEndDateWindow && (
                <div
                  ref={calendarRef}
                  data-aos='fade-zoom'
                  data-aos-easing='ease-out'
                  data-aos-duration='250'
                  className='window absolute mt-3 w-full py-7 flex flex-col items-center justify-center rounded-lg bg-white'
                >
                  <div className='w-[18rem]'>
                    <p className='text-[0.8rem] text-center font-semibold'>
                      {new Date(
                        new Date(selectedStartDate).setMonth(
                          new Date(selectedStartDate).getMonth() +
                            selectedDurationMonth -
                            1
                        )
                      ).getFullYear()}
                      년{' '}
                      {new Date(
                        new Date(selectedStartDate).setMonth(
                          new Date(selectedStartDate).getMonth() +
                            selectedDurationMonth
                        )
                      ).getMonth() + 1}
                      월
                    </p>
                    <div className='mx-auto mt-4 p-2 flex justify-center gap-x-8 text-[0.5rem] font-light text-[#656565] border-b border-[#efefef]'>
                      {daysOfWeek.map((day) => (
                        <span key={day} className='text-inherit'>
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className='mt-2 flex flex-col gap-y-1'>
                      {Array.from({ length: 7 }, (_, weekIndex) => (
                        <div
                          key={weekIndex}
                          className='flex justify-center gap-x-[0.7rem] text-xs font-light'
                        >
                          {getCalendarDates(
                            new Date(
                              new Date(selectedStartDate).setMonth(
                                new Date(selectedStartDate).getMonth() +
                                  selectedDurationMonth
                              )
                            )
                          )
                            .slice(weekIndex * 7, weekIndex * 7 + 7)
                            .map((date) => {
                              const dateString = date
                                .toISOString()
                                .split('T')[0];
                              const isEnabled = isDateInRange(
                                date,
                                new Date(
                                  new Date(
                                    new Date(selectedStartDate).setMonth(
                                      new Date(selectedStartDate).getMonth() +
                                        selectedDurationMonth
                                    )
                                  ).setDate(
                                    new Date(
                                      new Date(selectedStartDate).setMonth(
                                        new Date(selectedStartDate).getMonth() +
                                          selectedDurationMonth
                                      )
                                    ).getDate() - 1
                                  )
                                ),
                                new Date(
                                  new Date(
                                    new Date(
                                      new Date(selectedStartDate).setMonth(
                                        new Date(selectedStartDate).getMonth() +
                                          selectedDurationMonth
                                      )
                                    ).setDate(
                                      new Date(
                                        new Date(selectedStartDate).setMonth(
                                          new Date(
                                            selectedStartDate
                                          ).getMonth() + selectedDurationMonth
                                        )
                                      ).getDate() - 1
                                    )
                                  ).setDate(
                                    new Date(
                                      new Date(
                                        new Date(selectedStartDate).setMonth(
                                          new Date(
                                            selectedStartDate
                                          ).getMonth() + selectedDurationMonth
                                        )
                                      ).setDate(
                                        new Date(
                                          new Date(selectedStartDate).setMonth(
                                            new Date(
                                              selectedStartDate
                                            ).getMonth() + selectedDurationMonth
                                          )
                                        ).getDate() - 1
                                      )
                                    ).getDate() + 29
                                  )
                                )
                              );

                              return (
                                <button
                                  key={dateString}
                                  className={`relative w-9 h-8 rounded-full ${
                                    isEnabled
                                      ? 'hover:bg-[#eaf3fe] text-[#1c6cdb]'
                                      : 'line-through text-[#d3d3d3]'
                                  }`}
                                  onClick={() => {
                                    if (isEnabled) {
                                      setSelectedEndDate(dateString);
                                      setOpenSelectEndDateWindow(false);
                                    }
                                  }}
                                  disabled={!isEnabled}
                                >
                                  {date.getDate()}
                                  {date.getDate() === 1 && (
                                    <span className='absolute right-[-0.2rem] bottom-[-0.3rem] text-[#b9b9b9] text-[0.5rem]'>
                                      {date.getFullYear()}.{date.getMonth() + 1}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className='mt-4'>
          <p className='text-xs font-light text-[#656565]'>
            - 파티를 만들고 난 뒤에는 파티 기간 수정이 불가해요.
          </p>
          <p className='mt-1 text-xs font-light text-[#656565]'>
            - 파티 종료일 전에 파티를 해산할 경우 위약금이 부과될 거예요.
          </p>
        </div>
      </div>

      <button
        disabled={
          selectedStartDate && selectedDurationMonth && selectedEndDate
            ? false
            : true
        }
        className={`w-full mt-20 h-13 p-4 text-[0.8rem] leading-[1] border-transparent ${
          selectedStartDate && selectedDurationMonth && selectedEndDate
            ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
            : 'bg-[#d3d3d3]'
        } rounded-lg text-white text-sm font-bold duration-150 ease-out`}
        onClick={() => {
          updateStartDate(selectedStartDate);
          updateDurationMonth(selectedDurationMonth);
          updateEndDate(selectedEndDate);
          updateStepName('confirmPartyRule');
        }}
      >
        다음
      </button>
    </div>
  );
}
