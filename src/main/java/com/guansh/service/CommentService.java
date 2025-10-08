package com.guansh.service;

import com.guansh.pojo.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsBySongId(Integer songId);
    void addComment(Comment comment);
    void deleteComment(Integer id);
}
