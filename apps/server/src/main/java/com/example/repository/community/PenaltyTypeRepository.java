package com.example.repository.community;

import com.example.domain.community.PenaltyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenaltyTypeRepository extends JpaRepository<PenaltyType, Long> {
  // 기본 JpaRepository의 findById(long id) 메서드가 Optional<PenaltyType>을 반환하도록 유지
}
