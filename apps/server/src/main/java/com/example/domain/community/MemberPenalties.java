package com.example.domain.community;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "member_penalties")
public class MemberPenalties {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "penalty_id")
  private Long id;

  @Column(name = "member_id", nullable = false)
  private Long memberId;

  @ManyToOne
  @JoinColumn(name = "penalty_type_id", nullable = false)
  private PenaltyType penaltyType;

  @Column(name = "start_time", nullable = false)
  private LocalDateTime startTime;

  @Column(name = "end_time", nullable = false)
  private LocalDateTime endTime;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getMemberId() {
    return memberId;
  }

  public void setMemberId(Long memberId) {
    this.memberId = memberId;
  }

  public PenaltyType getPenaltyType() {
    return penaltyType;
  }

  public void setPenaltyType(PenaltyType penaltyType) {
    this.penaltyType = penaltyType;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public LocalDateTime getEndTime() {
    return endTime;
  }

  public void setEndTime(LocalDateTime endTime) {
    this.endTime = endTime;
  }
}
