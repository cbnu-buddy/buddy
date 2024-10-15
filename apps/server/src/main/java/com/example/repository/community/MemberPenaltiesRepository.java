package com.example.repository.community;

import com.example.domain.community.MemberPenalties;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@Repository
public interface MemberPenaltiesRepository extends JpaRepository<MemberPenalties, Long> {

  // 특정 사용자가 현재 유효한 패널티를 가지고 있는지 확인
  Optional<MemberPenalties> findByMemberIdAndEndTimeAfter(
    @Param("memberId") Long memberId,
    @Param("endTime") LocalDateTime endTime
  );

  // 특정 사용자의 모든 패널티 내역 조회
  List<MemberPenalties> findByMemberId(@Param("memberId") Long memberId);
}
