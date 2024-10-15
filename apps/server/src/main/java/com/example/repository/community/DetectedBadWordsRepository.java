package com.example.repository.community;

import com.example.domain.community.DetectedBadWords;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetectedBadWordsRepository extends JpaRepository<DetectedBadWords, Long> {
  // 특정 사용자의 비속어 사용 내역 조회
  List<DetectedBadWords> findByMemberId(@Param("memberId") Long memberId);

  // 특정 사용자의 비속어 사용 내역 개수 조회
  long countByMemberId(@Param("memberId") Long memberId);
}
