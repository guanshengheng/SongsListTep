package com.guansh.controller;

import com.guansh.pojo.Comment;

import java.util.List;

public interface CommentController {
    List<Comment> getCommentsBySongId(Integer songId);
    void addComment(Comment comment);
    void deleteComment(Integer id);
}
