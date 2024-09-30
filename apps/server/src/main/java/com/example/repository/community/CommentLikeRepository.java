package com.example.repository.community;

import com.example.domain.community.Comment;
import com.example.domain.community.CommentLike;
import com.example.domain.community.CommentLikeId;
import com.example.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, CommentLikeId> {
    int countByCommentId(Long commentId);
    boolean existsByCommentAndMember(Comment comment, Member member);
}
