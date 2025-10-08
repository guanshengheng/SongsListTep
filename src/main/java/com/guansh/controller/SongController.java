package com.guansh.controller;

import com.guansh.pojo.Song;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface SongController {
    public Map<String, Object> getSongsByPage(@RequestParam(defaultValue = "1") int pageNum,
                                              @RequestParam(defaultValue = "10") int pageSize);

    Song findById(Integer id);

    //    List<Song>findAll();
    List<Song> findSongByTitle(String song_title);

    List<Song> findSongByArtistName(String artist_name);

    List<Song> findSongByAlbumName(String album_name);
}
