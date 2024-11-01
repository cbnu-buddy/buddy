package com.example.controller.community;

import com.example.api.ApiResult;
import com.example.service.community.DetectedBadWordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "비속어 관리 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/private/detected-bad-word")
public class DetectedBadWordController {

  private final DetectedBadWordService detectedBadWordService;

  @Operation(summary = "비속어 사용 내역 기록하기", description = "사용자가 비속어를 사용할 때, 해당 사용 내역을 기록하고 4회마다 패널티를 부여합니다.")
  @PostMapping
  public ApiResult<?> addBadWordUsage(HttpServletRequest request) {
    return detectedBadWordService.addBadWordUsage(request);
  }

  @Operation(summary = "사용자 패널티 상태 조회", description = "사용자가 패널티를 받고 있는지 여부를 확인합니다.")
  @GetMapping("/penalized-status")
  public ApiResult<Boolean> isPenalized(@RequestParam Long memberId) {
    return detectedBadWordService.isPenalized(memberId);
  }
}
