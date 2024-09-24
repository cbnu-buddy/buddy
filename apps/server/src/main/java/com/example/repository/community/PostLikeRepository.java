package com.example.repository.community;

import com.example.domain.community.Post;
import com.example.domain.community.PostLike;
import com.example.domain.community.PostLikeId;
import com.example.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, PostLikeId> {
    boolean existsById(PostLikeId id);
    void deleteById(PostLikeId id);
    int countByPostId(Long postId);
    boolean existsByPostAndMember(Post post, Member member);
}
