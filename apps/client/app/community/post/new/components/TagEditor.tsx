'use client';

import { TagInfo } from '@/types/tag';
import axiosInstance from '@/utils/axiosInstance';
import useDebounce from '@/utils/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// 연관 검색 태그 목록 정보 조회 API
const fetchRelatedSearchTagInfos = ({ queryKey }: any) => {
  const tagName = queryKey[1];
  return axiosInstance.get(
    `/public/community/search/related-tags?query=${tagName}`
  );
};

interface TagEditorProps {
  tagList: string[];
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagEditor(props: TagEditorProps) {
  const { tagList, setTagList } = props;

  const [tagName, setTagName] = useState('');
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [isOpenSearchedResultList, setIsOpenSearchedResultList] =
    useState(false);
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태를 확인하기 위한 상태

  const inputRef = useRef<HTMLInputElement>(null);
  const tagButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchedResultListRef = useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = useDebounce(tagName, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['relatedSearchTagInfos', debouncedSearchQuery],
    queryFn: fetchRelatedSearchTagInfos,
    enabled: !!debouncedSearchQuery,
    retry: 0,
  });

  const relatedSearchTagInfos: TagInfo[] = data?.data.response;

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // IME 입력 중에는 실행하지 않음

    if ((e.key === 'Enter' || e.key === ' ') && tagName.trim()) {
      e.preventDefault();

      if (tagList.length >= 10) {
        alert('태그는 최대 10개까지 추가할 수 있습니다.');
        return;
      }

      // 중복 태그 체크를 소문자로 변환하여 수행
      const normalizedTagName = tagName.trim().toLowerCase();
      const normalizedTagList = tagList.map((tag) => tag.toLowerCase());

      if (!normalizedTagList.includes(normalizedTagName)) {
        setTagList([...tagList, tagName.trim()]);
        setTagName(''); // 태그 추가 후 입력 필드를 비우고
        setIsOpenSearchedResultList(false); // 바로 검색 결과 리스트를 닫음
      } else {
        alert('중복된 태그입니다.');
      }
    } else if (
      tagName === '' &&
      (e.key === 'Delete' || e.key === 'Backspace') &&
      tagList.length > 0
    ) {
      e.preventDefault(); // 기본 동작 방지 (ex. 텍스트 삭제)

      const newTagList = tagList.slice(0, -1); // 마지막 태그 제거
      setTagList(newTagList);

      setTimeout(() => {
        if (newTagList.length > 0) {
          const lastIndex = newTagList.length - 1;
          setSelectedTagIndex(lastIndex);
          const lastTagButton = tagButtonRefs.current[lastIndex];
          if (lastTagButton) {
            lastTagButton.focus(); // 마지막 태그 버튼에 포커스를 줍니다.
            lastTagButton.click(); // 클릭 이벤트를 발생시킵니다.
          }
        } else {
          setSelectedTagIndex(null);
          inputRef.current?.focus(); // 태그가 모두 제거되면 input에 포커스를 줍니다.
        }
      }, 0);
    } else if (e.key === 'ArrowLeft' && tagList.length > 0) {
      inputRef.current?.blur(); // input의 focus를 해제합니다.
      setSelectedTagIndex(tagList.length - 1);
      setTimeout(() => {
        const lastTagButton = tagButtonRefs.current[tagList.length - 1];
        if (lastTagButton) {
          lastTagButton.focus(); // 버튼에 포커스를 주고
          lastTagButton.click(); // 클릭 이벤트를 발생시킴
        }
      }, 0);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const newTagList = tagList.filter((_, i) => i !== index);
      setTagList(newTagList);

      setTimeout(() => {
        if (index < newTagList.length) {
          setSelectedTagIndex(index);
          const nextTagButton = tagButtonRefs.current[index];
          if (nextTagButton) {
            nextTagButton.focus(); // 다음 태그 버튼에 포커스를 줍니다.
            nextTagButton.click(); // 클릭 이벤트를 발생시킵니다.
          }
        } else {
          const prevIndex = index > 0 ? index - 1 : null;
          setSelectedTagIndex(prevIndex);
          if (prevIndex !== null) {
            const prevTagButton = tagButtonRefs.current[prevIndex];
            if (prevTagButton) {
              prevTagButton.focus(); // 이전 태그 버튼에 포커스를 줍니다.
              prevTagButton.click(); // 클릭 이벤트를 발생시킵니다.
            }
          } else {
            inputRef.current?.focus(); // 모든 태그가 제거되면 input에 포커스를 줍니다.
          }
        }
      }, 0);
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) {
        const newIndex = index - 1;
        setSelectedTagIndex(newIndex);
        setTimeout(() => {
          const prevTagButton = tagButtonRefs.current[newIndex];
          if (prevTagButton) {
            prevTagButton.focus(); // 버튼에 포커스를 주고
            prevTagButton.click(); // 클릭 이벤트를 발생시킴
          }
        }, 0);
      }
    } else if (e.key === 'ArrowRight') {
      if (index === tagList.length - 1) {
        inputRef.current?.focus();
        setSelectedTagIndex(null);
      } else {
        const newIndex = index + 1;
        setSelectedTagIndex(newIndex);
        setTimeout(() => {
          const nextTagButton = tagButtonRefs.current[newIndex];
          if (nextTagButton) {
            nextTagButton.focus(); // 버튼에 포커스를 주고
            nextTagButton.click(); // 클릭 이벤트를 발생시킴
          }
        }, 0);
      }
    }
  };

  // tagName이 빈 문자열인 경우 검색 결과 리스트를 즉시 닫음
  useEffect(() => {
    if (tagName === '') {
      setIsOpenSearchedResultList(false);
    }
  }, [tagName]);

  useEffect(() => {
    if (relatedSearchTagInfos && relatedSearchTagInfos.length > 0) {
      setIsOpenSearchedResultList(true);
    } else {
      setIsOpenSearchedResultList(false);
    }
  }, [relatedSearchTagInfos]);

  return (
    <div
      className='relative flex flex-wrap items-start gap-x-1 gap-y-[0.325rem] w-[50%] h-[4.5rem] max-h-[5rem] overflow-visible pl-2 py-2 pr-[0.625rem] border border-[#d1d2d4] rounded-[0.1rem] font-light text-[0.825rem]'
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      {tagList.map((tag, index) => (
        <button
          key={index}
          ref={(el) => {
            tagButtonRefs.current[index] = el; // 각 버튼의 ref를 저장
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTagIndex(index);
          }}
          onKeyDown={(e) => handleTagKeyDown(e, index)}
          className={`min-h-6 h-auto leading-none text-start outline-none px-[0.2rem] bg-[#eee] rounded-[0.125rem] border border-[#eee] hover:border-[#aaaaaa] focus:bg-[#656565] focus:text-white focus:border-[#656565] ${
            selectedTagIndex === index && 'bg-[#656565] border-[#656565]'
          }`}
        >
          #<span className='ml-[0.1rem] text-inherit break-all'>{tag}</span>
        </button>
      ))}
      <div className="relative h-6 ml-[0.1rem] leading-none flex items-center gap-x-[0.1rem] before:content-['#'] text-[#959595]">
        <input
          type='text'
          placeholder='태그 입력 (최대 10개)'
          value={tagName}
          ref={inputRef}
          onChange={(e) => setTagName(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          onCompositionStart={handleCompositionStart} // 한글 입력 시작
          onCompositionEnd={handleCompositionEnd} // 한글 입력 종료
          className={`flex justify-center items-center border-none px-0 py-0 ${
            tagName && "before:content-['#']"
          } placeholder:text-[#88909a] font-light text-[0.825rem] focus:ring-0 text-[#1a1f27]`}
        />

        {isOpenSearchedResultList &&
          relatedSearchTagInfos &&
          relatedSearchTagInfos.filter(
            (tagInfo) => !tagList.includes(tagInfo.tagName)
          ).length > 0 && (
            <div
              ref={searchedResultListRef}
              className='absolute top-[1.625rem] left-2 w-[7.5rem] max-h-[7.5rem] overflow-y-auto border border-[#d1d2d4] bg-white py-[0.4rem] z-10'
            >
              {relatedSearchTagInfos
                .filter((tagInfo) => !tagList.includes(tagInfo.tagName))
                .map((tagInfo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!tagList.includes(tagInfo.tagName)) {
                        setTagList([...tagList, tagInfo.tagName]);
                      }
                      setTagName('');
                      setIsOpenSearchedResultList(false); // 태그가 추가되면 즉시 리스트 닫기
                    }}
                    className='w-full text-start hover:bg-[#f8f8f8] pl-3 pr-1 py-[0.375rem] search-result-item outline-none focus:text-[#3a8af9]'
                  >
                    {tagInfo.tagName}
                  </button>
                ))}
            </div>
          )}
      </div>
    </div>
  );
}
