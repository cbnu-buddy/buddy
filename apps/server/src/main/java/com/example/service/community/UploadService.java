package com.example.service.community;

import com.example.api.ApiResult;
import com.example.exception.CustomException;
import com.example.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UploadService {

  @Value("${github.token}")
  private String githubToken;

  /**
   * 파일 업로드
   */
  public ApiResult<List<String>> uploadFiles(List<MultipartFile> files) throws Exception {
    List<String> uploadedFilePaths = new ArrayList<>();

    for (MultipartFile file : files) {
      try {
        // 파일 내용을 Base64로 인코딩
        String fileContent = Base64.encodeBase64String(file.getBytes());

        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
          fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        }

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String randomUUID = UUID.randomUUID().toString();
        String fileName = timestamp + "_" + randomUUID + "." + fileExtension;

        // 새로 만든 레포지토리 최상위 디렉토리에 저장
        String apiUrl = "https://api.github.com/repos/cbnu-buddy/storage/contents/" + fileName;

        // GitHub API에 보낼 요청 생성
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(githubToken);

        // 요청 바디 생성
        String jsonBody = String.format("{\"message\": \"upload file\", \"content\": \"%s\"}", fileContent);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        // API 호출
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.PUT, entity, String.class);

        // 결과 반환
        if (response.getStatusCode().is2xxSuccessful()) {
          String uploadedFilePath = "https://raw.githubusercontent.com/cbnu-buddy/storage/main/" + fileName;
          uploadedFilePaths.add(uploadedFilePath);
        } else {
          throw new CustomException(ErrorCode.FILE_UPLOAD_FAILED);
        }
      } catch (Exception e) {
        throw new CustomException(ErrorCode.FILE_UPLOAD_FAILED);
      }
    }

    return ApiResult.success(uploadedFilePaths);
  }

}
