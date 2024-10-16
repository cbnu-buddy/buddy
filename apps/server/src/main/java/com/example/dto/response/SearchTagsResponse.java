package com.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchTagsResponse {
    private Long tagId;
    private String tagName;
    private Long postsCount;
    private List<TagInfoResponse> relatedTags; // 연관 태그
    private List<PostsByTagInfoResponse> posts; // 검색된 게시글들
}
