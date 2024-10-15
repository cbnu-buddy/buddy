package com.example.service.community;

import com.example.api.ApiResult;
import com.example.domain.community.DetectedBadWords;
import com.example.domain.community.MemberPenalties;
import com.example.domain.community.PenaltyType;
import com.example.exception.CustomException;
import com.example.exception.ErrorCode;
import com.example.repository.community.DetectedBadWordsRepository;
import com.example.repository.community.MemberPenaltiesRepository;
import com.example.repository.community.PenaltyTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DetectedBadWordService {

  private final DetectedBadWordsRepository detectedBadWordsRepository;
  private final MemberPenaltiesRepository memberPenaltiesRepository;
  private final PenaltyTypeRepository penaltyTypeRepository;

  /*
   * 비속어 사용 내역 추가 및 패널티 부여
   */
  public ApiResult<?> addBadWordUsage(Long memberId) {
    // 비속어 사용 내역 저장
    DetectedBadWords detectedBadWord = new DetectedBadWords();
    detectedBadWord.setMemberId(memberId);
    detectedBadWord.setCreatedTime(LocalDateTime.now());
    detectedBadWordsRepository.save(detectedBadWord);

    // 비속어 사용 횟수 확인 및 패널티 적용
    long usageCount = detectedBadWordsRepository.countByMemberId(memberId);
    if (usageCount % 4 == 0) {
      applyPenalty(memberId);
      return ApiResult.success("비속어 사용 내역이 기록되었으며, 패널티가 부여되었습니다.");
    }

    return ApiResult.success("비속어 사용 내역이 기록되었습니다.");
  }

  /*
   * 패널티 부여 로직
   */
  private void applyPenalty(Long memberId) {
    PenaltyType penaltyType = penaltyTypeRepository.findById(3L)
      .orElseThrow(() -> new CustomException(ErrorCode.PENALTY_TYPE_NOT_FOUND));

    LocalDateTime now = LocalDateTime.now();
    LocalDateTime endTime = now.plusSeconds(penaltyType.getDuration());

    MemberPenalties memberPenalties = new MemberPenalties();
    memberPenalties.setMemberId(memberId);
    memberPenalties.setPenaltyType(penaltyType);
    memberPenalties.setStartTime(now);
    memberPenalties.setEndTime(endTime);

    memberPenaltiesRepository.save(memberPenalties);
  }

  /*
   * 패널티 상태 확인
   */
  public ApiResult<Boolean> isPenalized(Long memberId) {
    LocalDateTime now = LocalDateTime.now();
    boolean isPenalized = memberPenaltiesRepository.findByMemberIdAndEndTimeAfter(memberId, now).isPresent();
    return ApiResult.success(isPenalized);
  }
}
