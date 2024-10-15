package com.example.domain.community;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "detected_bad_words")
public class DetectedBadWords {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "detection_id")
  private Long id;

  @Column(name = "member_id", nullable = false)
  private Long memberId;

  @Column(name = "created_time", nullable = false)
  private LocalDateTime createdTime;

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

  public LocalDateTime getCreatedTime() {
    return createdTime;
  }

  public void setCreatedTime(LocalDateTime createdTime) {
    this.createdTime = createdTime;
  }
}
