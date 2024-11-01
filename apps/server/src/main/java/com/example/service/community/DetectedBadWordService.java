package com.example.service.community;

import com.example.api.ApiResult;
import com.example.config.jwt.TokenProvider;
import com.example.domain.community.DetectedBadWords;
import com.example.domain.community.MemberPenalties;
import com.example.domain.community.PenaltyType;
import com.example.domain.member.Member;
import com.example.exception.CustomException;
import com.example.exception.ErrorCode;
import com.example.repository.community.DetectedBadWordsRepository;
import com.example.repository.community.MemberPenaltiesRepository;
import com.example.repository.community.PenaltyTypeRepository;
import com.example.repository.member.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DetectedBadWordService {

  private final DetectedBadWordsRepository detectedBadWordsRepository;
  private final MemberPenaltiesRepository memberPenaltiesRepository;
  private final PenaltyTypeRepository penaltyTypeRepository;
  private final MemberRepository memberRepository;
  private final TokenProvider tokenProvider;

  /*
   * 토큰에서 userId 가져오기
   */
  public String getUserIdFromToken(HttpServletRequest request) {
    Authentication authentication = tokenProvider.getAuthentication(tokenProvider.resolveToken(request));
    return authentication.getName();
  }

  /*
   * 비속어 사용 내역 추가 및 패널티 부여
   */
  public ApiResult<?> addBadWordUsage(HttpServletRequest request) {
    // 토큰에서 memberId 조회
    String userId = getUserIdFromToken(request);
    Member member = memberRepository.findByUserId(userId)
      .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

    Long memberId = member.getMemberId();

    // 비속어 사용 내역 저장
    DetectedBadWords detectedBadWord = new DetectedBadWords();
    detectedBadWord.setMemberId(memberId);
    detectedBadWord.setCreatedTime(LocalDateTime.now());
    detectedBadWordsRepository.save(detectedBadWord);

    // 비속어 사용 횟수 확인
    long usageCount = detectedBadWordsRepository.countByMemberId(memberId);

    // 패널티 적용 여부 확인 (4의 배수마다 적용)
    boolean isPenalized = usageCount % 4 == 0;
    if (isPenalized) {
      applyPenalty(memberId);
    }

    // 응답 메시지와 isPenalized 필드를 포함하는 결과 생성
    String message = isPenalized
      ? "비속어 사용 내역이 기록되었으며, 패널티가 부여되었습니다."
      : "비속어 사용 내역이 기록되었습니다.";
    Map<String, Object> result = new HashMap<>();
    result.put("message", message);
    result.put("isPenalized", isPenalized);

    return ApiResult.success(result);
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
