package com.guansh.service;

import com.guansh.pojo.Song;

import java.util.List;

public interface SongService {
    //    public List<Song> findAll();
    List<Song> getSongsByPage(int pageNum, int pageSize);

    int getTotalCount();

    Song findSongById(Integer id);

    List<Song> findSongByTitle(String song_title);

    List<Song> findSongByArtistName(String artist_name);

    List<Song> findSongByAlbumName(String album_name);
}
