package com.guansh.pojo;

import java.time.LocalDateTime;

public class Comment {
    private Integer id;
    private Integer song_id;
    private String content;
    private LocalDateTime create_time;

    // id
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    // song_id
    public Integer getSong_id() { return song_id; }
    public void setSong_id(Integer song_id) { this.song_id = song_id; }

    // content
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    // create_time
    public LocalDateTime getCreate_time() { return create_time; }
    public void setCreate_time(LocalDateTime create_time) { this.create_time = create_time; }

}
