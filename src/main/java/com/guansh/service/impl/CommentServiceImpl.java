package com.guansh.service.impl;

import com.guansh.dao.CommentDao;
import com.guansh.pojo.Comment;
import com.guansh.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentDao commentDao;
    @Override
    public List<Comment> getCommentsBySongId(Integer song_id) {
        return commentDao.findCommentsBySongId(song_id);
    }
    @Override
    public void addComment(Comment comment) {
        commentDao.addComment(comment);
    }
    @Override
    public void deleteComment(Integer id) {
        commentDao.deleteComment(id);
    }

}
