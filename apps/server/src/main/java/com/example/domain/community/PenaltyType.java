package com.example.domain.community;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "penalty_type")
public class PenaltyType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "penalty_type_id")
  private Long id;

  @Column(name = "duration", nullable = false)
  private int duration;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }
}
