package com.example.controller.community;

import com.example.api.ApiResult;
import com.example.service.community.UploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "사진 저장 API")
@Slf4j
@RestController
@RequiredArgsConstructor
public class UploadController {
  private final UploadService uploadService;

  @Operation(summary = "파일 업로드", description = "storage에 사진을 업로드하고 url을 반환한다.")
  @PostMapping(value = "/private/community/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ApiResult<?> uploadFile(@RequestParam("file") List<MultipartFile> files) throws Exception {
    return uploadService.uploadFiles(files);
  }

}

