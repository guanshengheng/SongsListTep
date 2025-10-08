package com.guansh.dao;

import com.guansh.pojo.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentDao {
    //查询某首歌的全部评论，按照时间倒序排列
    List<Comment> findCommentsBySongId(@Param("songId") Integer song_id);

    //添加评论
    void addComment(Comment comment);

    //删除评论
    void deleteComment(Integer id);
}
