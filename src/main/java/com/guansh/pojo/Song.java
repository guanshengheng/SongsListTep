package com.guansh.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//定义实体类，用于存放歌曲信息


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Song {
    private Integer id;
    private String song_url;
    private String song_title;
    private String duration;
    private String artist_name;
    private String artist_url;
    private String album_name;
    private String album_url;
    private String lyrics;
    private String cover_url;
}
