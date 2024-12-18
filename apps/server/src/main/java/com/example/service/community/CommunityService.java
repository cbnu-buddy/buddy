package com.example.service.community;

import com.example.api.ApiResult;
import com.example.config.jwt.TokenProvider;
import com.example.domain.community.*;
import com.example.domain.member.Member;
import com.example.domain.plan.Plan;
import com.example.domain.service.Service;
import com.example.dto.request.CreatePostRequest;
import com.example.dto.request.UpdatePostRequest;
import com.example.dto.response.*;
import com.example.exception.CustomException;
import com.example.exception.ErrorCode;
import com.example.repository.community.*;
import com.example.repository.member.MemberRepository;
import com.example.repository.plan.PlanRepository;
import com.example.repository.service.ServiceRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import com.example.domain.community.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CommunityService {

  private final PostRepository postRepository;
  private final TagRepository tagRepository;
  private final PostTagRepository postTagRepository;
  private final PostServiceRepository postServiceRepository;
  private final PhotoRepository photoRepository;
  private final MemberRepository memberRepository;
  private final ServiceRepository serviceRepository;
  private final TokenProvider tokenProvider;
  private final CommentRepository commentRepository;
  private final ReplyRepository replyRepository;
  private final PostLikeRepository postLikeRepository;
  private final CommentLikeRepository commentLikeRepository;
  private final ReplyLikeRepository replyLikeRepository;
  private final MemberPenaltiesRepository memberPenaltiesRepository;
  private final PlanRepository planRepository;
  private final HttpServletRequest currentRequest;


  // 토큰에서 사용자 ID 추출
  public String getUserIdFromToken(HttpServletRequest request) {
    Authentication authentication = tokenProvider.getAuthentication(tokenProvider.resolveToken(request));
    Claims claims = tokenProvider.getTokenClaims(tokenProvider.resolveToken(request));
    return claims.getSubject();
  }

  /**
   * 게시글 생성
   */
  @Transactional
  public ApiResult<?> createPost(CreatePostRequest postRequest, HttpServletRequest request) {
    String userId = getUserIdFromToken(request);
    Member member = memberRepository.findByUserId(userId)
      .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)); // 사용자 조회

    // 새로운 게시글 생성, 저장
    Post post = new Post();
    post.setTitle(postRequest.getTitle());
    post.setContent(postRequest.getContent());
    post.setMember(member);
    post.setCreatedTime(LocalDateTime.now());
    post.setModifiedTime(LocalDateTime.now());
    post.setViews(0);

    final Post savedPost = postRepository.save(post);

    // 태그 생성, 저장 및 tagIds 수집
    List<Long> tagIds = postRequest.getTags().stream().map(tagName -> {
      Tag tag = tagRepository.findByTagName(tagName)
        .orElseGet(() -> {
          Tag newTag = new Tag();
          newTag.setTagName(tagName);
          return tagRepository.save(newTag);
        });

      PostTag postTag = new PostTag(savedPost, tag);
      postTagRepository.save(postTag);

      return tag.getId(); // 수집된 태그 ID 반환
    }).collect(Collectors.toList());

    // 서비스 조회 후 저장
    for (Long serviceId : postRequest.getServiceIds()) {
      Service service = serviceRepository.findById(serviceId)
        .orElseThrow(() -> new CustomException(ErrorCode.INVALID_SERVICE_ID)); // 서비스 조회
      PostService postService = new PostService(post, service);
      postServiceRepository.save(postService);
    }

    // 사진 생성, 저장
    for (String photoPath : postRequest.getPostImagePathUrls()) {
      Photo photo = new Photo();
      photo.setPost(post);
      photo.setPhotoPath(photoPath);
      photoRepository.save(photo);
    }

    return ApiResult.success(Map.of("tagIds", tagIds, "postId", savedPost.getId()));
  }

  /**
   * 게시글 수정
   */
  public ApiResult<?> updatePost(Long postId, UpdatePostRequest updatePostRequest, HttpServletRequest request) {
    String userId = getUserIdFromToken(request);
    Member member = memberRepository.findByUserId(userId)
      .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)); // 사용자 조회

    Post post = postRepository.findById(postId)
      .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND)); // 게시글 조회

    if (!post.getMember().equals(member)) {
      throw new CustomException(ErrorCode.UNAUTHORIZED_ACCESS); // 게시글 작성자와 현재 사용자가 일치하는지 확인
    }

    // 제목, 내용, 생성 시기 수정 (post table)
    post.setTitle(updatePostRequest.getTitle());
    post.setContent(updatePostRequest.getContent());
    post.setModifiedTime(LocalDateTime.now());

    // 기존 태그, 서비스, 사진 삭제 (post_tags, post_services, photo table)
    deleteExistingPostTags(post);
    deleteExistingPostServices(post);
    deleteExistingPhotos(post);

    // 수정된 태그, 서비스, 사진 저장
    for (String tagName : updatePostRequest.getTags()) {
      Tag tag = tagRepository.findByTagName(tagName)
        .orElseGet(() -> {
          Tag newTag = new Tag();
          newTag.setTagName(tagName);
          return tagRepository.save(newTag);
        });

      PostTag postTag = new PostTag(post, tag);
      postTagRepository.save(postTag);
    }

    for (String photoPath : updatePostRequest.getPostImagePathUrls()) {
      Photo photo = new Photo();
      photo.setPost(post);
      photo.setPhotoPath(photoPath);
      photoRepository.save(photo);
    }


    for (Long serviceId : updatePostRequest.getServiceIds()) {
      Service service = serviceRepository.findById(serviceId)
        .orElseThrow(() -> new CustomException(ErrorCode.INVALID_SERVICE_ID));
      PostService postService = new PostService(post, service);
      postServiceRepository.save(postService);
    }

    postRepository.save(post);
    return ApiResult.success(Map.of("postId", post.getId()));
  }

  private void deleteExistingPostTags(Post post) {
    List<PostTag> postTags = postTagRepository.findByPost(post);
    postTagRepository.deleteAll(postTags);
  }

  private void deleteExistingPostServices(Post post) {
    List<PostService> postServices = postServiceRepository.findByPost(post);
    postServiceRepository.deleteAll(postServices);
  }

  private void deleteExistingPhotos(Post post) {
    List<Photo> photos = photoRepository.findByPost(post);
    photoRepository.deleteAll(photos);
  }

  /**
   * 게시글 삭제
   */
  @Transactional
  public ApiResult<?> deletePost(Long postId, HttpServletRequest request) {
    String userId = getUserIdFromToken(request);
    Member member = memberRepository.findByUserId(userId)
      .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)); // 사용자 조회

    Post post = postRepository.findById(postId)
      .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND)); // 게시글 조회

    if (!post.getMember().equals(member)) {
      throw new CustomException(ErrorCode.UNAUTHORIZED_ACCESS); // 게시글 작성자와 현재 사용자가 일치하는지 확인
    }

    // 기존 태그, 서비스, 사진 삭제
    deleteExistingPostTags(post);
    deleteExistingPostServices(post);
    deleteExistingPhotos(post);


    // 게시글 삭제
    postRepository.delete(post);

    return ApiResult.success("게시글 삭제가 완료되었습니다");
  }

  /**
   * 추천 태그 목록 정보 조회
   */
  public ApiResult<?> getTop10Tags() {
    List<Object[]> tagPostCounts = postTagRepository.findTopTagsWithPostCount();

    if (tagPostCounts.isEmpty()) {
      throw new CustomException(ErrorCode.SEARCH_RESULTS_NOT_FOUND);
    }

    List<TagInfoResponse> topTagsResponse = tagPostCounts.stream()
      .limit(10)
      .map(result -> {
        Tag tag = (Tag) result[0];
        Long postCount = (Long) result[1];
        return TagInfoResponse.builder()
          .tagId(tag.getId())
          .tagName(tag.getTagName())
          .postCount(postCount)
          .build();
      })
      .collect(Collectors.toList());

    return ApiResult.success(topTagsResponse);
  }

  /**
   * 연관 검색 태그 목록 정보 조회
   */
  public ApiResult<?> getRelatedTags(String query) {
    List<TagInfoResponse> relatedTagsResponse = getRelatedTagsDto(query);

    return ApiResult.success(relatedTagsResponse);
  }


  /**
   * 내가 쓴 커뮤니티 게시글 목록 정보 조회
   */
  public ApiResult<List<PostsByTagInfoResponse>> getMyCommunityPosts(HttpServletRequest request) {
    String userId = getUserIdFromToken(request);
    Member member = memberRepository.findByUserId(userId)
      .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

    List<Post> posts = postRepository.findByMember(member);

    if (posts.isEmpty()) {
      throw new CustomException(ErrorCode.SEARCH_RESULTS_NOT_FOUND);
    }

    List<PostsByTagInfoResponse> response = posts.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());
    return ApiResult.success(response);
  }


  /**
   * 태그 기반 커뮤니티 게시글 목록 정보 조회
   */
  public ApiResult<?> getPostsByTag(String tagName, int limit) {

    List<Post> posts = postRepository.findByTagName(tagName, Sort.by(Sort.Direction.DESC, "createdTime"));

    // limit에 따른 결과 제한
    List<PostsByTagInfoResponse> response = posts.stream()
      .limit(limit)
      .map(this::convertToDto)
      .collect(Collectors.toList());

    return ApiResult.success(response);
  }

  /**
   * 커뮤니티 게시글 정보 조회
   */
  public ApiResult<PostsByTagInfoResponse> getPostById(Long postId) {
    Post post = postRepository.findById(postId)
      .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

    post.setViews(post.getViews() + 1);
    postRepository.save(post);

    PostsByTagInfoResponse response = convertToDto(post);
    return ApiResult.success(response);
  }

  /**
   * 최신 커뮤니티 게시글 목록 조회
   */
  public ApiResult<List<PostsByTagInfoResponse>> getLatestPosts(int limit) {
    List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTime"));

    if (posts.isEmpty()) {
      throw new CustomException(ErrorCode.SEARCH_RESULTS_NOT_FOUND);
    }

    // limit에 따른 결과 제한
    List<PostsByTagInfoResponse> response = posts.stream()
      .limit(limit)
      .map(this::convertToDto)
      .collect(Collectors.toList());

    return ApiResult.success(response);
  }

  /**
   * 인기 커뮤니티 게시글 목록 조회
   */
  public ApiResult<List<PostsByTagInfoResponse>> getHotPosts() {
    List<Post> hotPosts = postRepository.findTop5ByViews(PageRequest.of(0, 5));

    if (hotPosts.isEmpty()) {
      throw new CustomException(ErrorCode.SEARCH_RESULTS_NOT_FOUND);
    }

    List<PostsByTagInfoResponse> response = hotPosts.stream()
      .map(this::convertToDto)
      .collect(Collectors.toList());

    return ApiResult.success(response);
  }


  /**
   * 게시글 검색 정보 조회
   */
  public ApiResult<?> searchQuery(String query, int limit) {
    List<PostsByTagInfoResponse> posts = getPostsByQuery(query, limit);
    List<TagInfoResponse> relatedTags = getRelatedTagsDto(query);

    return ApiResult.success(SearchResponse.builder()
      .relatedTags(relatedTags)
      .posts(posts)
      .build());
  }

  /**
   * 태그 관련 통합 검색 정보 조회
   */
  public ApiResult<?> searchTag(String query, int limit) {
    // 검색된 태그 조회
    Optional<Tag> optionalTag = tagRepository.findByTagName(query);
    List<PostsByTagInfoResponse> posts = getPostsByQuery(query, limit);
    List<TagInfoResponse> relatedTags = getRelatedTagsFilterDto(query);

    // 태그가 존재하지 않는 경우
    if (optionalTag.isEmpty()) {

      return ApiResult.success(SearchTagsResponse.builder()
        .tagId(null)
        .tagName(null)
        .postsCount(null)
        .relatedTags(relatedTags)
        .posts(posts)
        .build());
    }

    Tag tag = optionalTag.get();

    // 태그와 관련된 게시글 수 계산
    Long postsCount = postTagRepository.countPostsByTagId(tag.getId());

    return ApiResult.success(SearchTagsResponse.builder()
      .tagId(tag.getId())
      .tagName(tag.getTagName())
      .postsCount(postsCount)
      .relatedTags(relatedTags)
      .posts(posts)
      .build());
  }

  private List<TagInfoResponse> getRelatedTagsDto(String query) {
    // 연관 태그 조회 및 DTO 변환
    List<Object[]> relatedTags = postTagRepository.findRelatedTagsWithPostCount(query);
    return relatedTags.stream()
      .map(result -> {
        Tag tag = (Tag) result[0];
        Long postCount = (Long) result[1];
        return TagInfoResponse.builder()
          .tagId(tag.getId())
          .tagName(tag.getTagName())
          .postCount(postCount)
          .build();
      })
      .collect(Collectors.toList());
  }

  private List<TagInfoResponse> getRelatedTagsFilterDto(String query) {
    // 연관 태그 조회 및 DTO 변환
    List<Object[]> relatedTags = postTagRepository.findRelatedTagsWithPostCount(query);
    return relatedTags.stream()
      .map(result -> {
        Tag tag = (Tag) result[0];
        Long postCount = (Long) result[1];
        return TagInfoResponse.builder()
          .tagId(tag.getId())
          .tagName(tag.getTagName())
          .postCount(postCount)
          .build();
      })
      .filter(tagInfo -> !tagInfo.getTagName().equals(query)) // 쿼리 태그 제외
      .collect(Collectors.toList());
  }

  private List<PostsByTagInfoResponse> getPostsByQuery(String query, int limit) {
    List<Post> posts = postRepository.findByTitleOrContentOrTagNameOrAuthor(query, Sort.by(Sort.Direction.DESC, "createdTime"));

    return posts.stream()
      .limit(limit)
      .map(this::convertToDto)
      .collect(Collectors.toList());
  }

  private PostsByTagInfoResponse convertToDto(Post post) {
    // 토큰이 없을 경우
    String token = tokenProvider.resolveToken(currentRequest);
    boolean isLoggedIn = token != null && tokenProvider.getAuthentication(token) != null;

    // 로그인 상태일 때의 사용자 정보 처리
    Member member = isLoggedIn ? memberRepository.findByUserId(getUserIdFromToken(currentRequest)).orElse(null) : null;

    // 게시글에 대한 좋아요 여부 판단
    boolean isLiked = isLoggedIn && member != null && postLikeRepository.existsByPostAndMember(post, member);
    LocalDateTime now = LocalDateTime.now();
    boolean isPenalized =  isLoggedIn && member != null && memberPenaltiesRepository.findByMemberIdAndEndTimeAfter(member.getMemberId(), now).isPresent();

    // 댓글 및 답글 데이터 변환
    List<PostsByTagInfoResponse.CommentDto> commentDtos = commentRepository.findByPost(post).stream()
      .map(comment -> {
        // 해당 댓글의 답글들 가져오기
        List<Reply> replies = replyRepository.findByCommentId(comment.getId());

        boolean isCommentLiked = isLoggedIn && member != null && commentLikeRepository.existsByCommentAndMember(comment, member);


        // 각 답글에 대한 데이터 변환
        List<PostsByTagInfoResponse.CommentDto.ReplyDto> replyDtos = replies.stream()
          .map(reply -> {
            boolean isReplyLiked = isLoggedIn && member != null && replyLikeRepository.existsByReplyAndMember(reply, member);
            return PostsByTagInfoResponse.CommentDto.ReplyDto.builder()
              .replyId(reply.getId())
              .replyContent(reply.getContent())
              .likeCount(replyLikeRepository.countByReplyId(reply.getId()))
              .IsLiked(isReplyLiked)
              .createdAt(reply.getCreatedTime())
              .writer(PostsByTagInfoResponse.AuthorDto.builder()
                .memberId(reply.getMember().getMemberId())
                .username(reply.getMember().getUsername())
                .profileImagePathUrl(reply.getMember().getProfile_path())
                .build())
              .build();
          })
          .collect(Collectors.toList());

        // 댓글 DTO 생성
        return PostsByTagInfoResponse.CommentDto.builder()
          .commentId(comment.getId())
          .commentContent(comment.getPostContent())
          .likeCount(commentLikeRepository.countByCommentId(comment.getId()))
          .IsLiked(isCommentLiked)
          .createdAt(comment.getCreatedTime())
          .writer(PostsByTagInfoResponse.AuthorDto.builder()
            .memberId(comment.getMember().getMemberId())
            .username(comment.getMember().getUsername())
            .profileImagePathUrl(comment.getMember().getProfile_path())
            .build())
          .replies(replyDtos)
          .build();
      })
      .collect(Collectors.toList());

    // 게시글에 대한 전체 DTO 반환
    return PostsByTagInfoResponse.builder()
      .postId(post.getId())
      .title(post.getTitle())
      .content(post.getContent())
      .createdAt(post.getCreatedTime())
      .modifiedAt(post.getModifiedTime())
      .postImagePathUrls(photoRepository.findByPost(post).stream()
        .map(Photo::getPhotoPath)
        .collect(Collectors.toList()))
      .author(PostsByTagInfoResponse.AuthorDto.builder()
        .memberId(post.getMember().getMemberId())
        .username(post.getMember().getUsername())
        .profileImagePathUrl(post.getMember().getProfile_path())
        .build())
      .tags(postTagRepository.findByPost(post).stream()
        .map(tag -> PostsByTagInfoResponse.TagsDto.builder()
          .tagId(tag.getTag().getId())
          .tagName(tag.getTag().getTagName())
          .build())
        .collect(Collectors.toList()))
      .views(post.getViews())
      .services(postServiceRepository.findByPost(post).stream()
        .map(postService -> PostsByTagInfoResponse.ServiceDto.builder()
          .serviceId(postService.getService().getId())
          .planIds(planRepository.findByService_Id(postService.getService().getId()).stream()
            .map(Plan::getId)
            .collect(Collectors.toList()))
          .name(postService.getService().getServiceName())
          .url(postService.getService().getUrl())
          .build())
        .collect(Collectors.toList()))
      .comments(commentDtos)
      .likeCount(postLikeRepository.countByPostId(post.getId()))
      .IsLiked(isLiked)
      .IsPenalized(isPenalized)
      .build();
  }
}
