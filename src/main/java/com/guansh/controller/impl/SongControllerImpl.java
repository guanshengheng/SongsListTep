package com.guansh.controller.impl;


import com.guansh.controller.SongController;
import com.guansh.pojo.Song;
import com.guansh.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SongControllerImpl implements SongController {
    private SongService songService;

    @Autowired //自动注入
    public void setSongService(SongService songService) {
        this.songService = songService;
    }

    //分页查询
    @GetMapping("/page")
    public Map<String, Object> getSongsByPage(@RequestParam(defaultValue = "1") int pageNum,
                                              @RequestParam(defaultValue = "10") int pageSize) {

        List<Song> songs = songService.getSongsByPage(pageNum, pageSize);
        int total = songService.getTotalCount();

        Map<String, Object> result = new HashMap<>();
        result.put("songs", songs);
        result.put("currentPage", pageNum);
        result.put("pageSize", pageSize);
        result.put("total", total);
        result.put("totalPages", (total + pageSize - 1) / pageSize);

        return result;
    }

    //根据id查询歌曲
    @GetMapping("/song")
    public Song findById(Integer id) {
        return songService.findSongById(id);
    }

    @GetMapping("/title")
    public List<Song> findSongByTitle(String song_title) {
        return songService.findSongByTitle(song_title);
    }

    @GetMapping("/artist")
    public List<Song> findSongByArtistName(String artist_name) {
        return songService.findSongByArtistName(artist_name);
    }

    @GetMapping("/album")
    public List<Song> findSongByAlbumName(String album_name) {
        return songService.findSongByAlbumName(album_name);
    }
}