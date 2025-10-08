package com.guansh.controller.impl;

import com.guansh.pojo.Comment;
import com.guansh.service.CommentService;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentControllerImpl {

    @Autowired
    private CommentService commentService;

    // 获取评论
    @GetMapping
    public List<Comment> getCommentsBySongId(@RequestParam Integer songId) {
        return commentService.getCommentsBySongId(songId);
    }

    // 添加评论
    @PostMapping
    public void addComment(@RequestBody Comment comment) {
        commentService.addComment(comment);
    }

    // 删除评论
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
    }
}
