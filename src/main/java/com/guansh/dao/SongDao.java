package com.guansh.dao;

import com.guansh.pojo.Song;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper

public interface SongDao {
    //@Select("select * from songs")
    //    public List<Song> findAll();

    //分页查询
    List< Song>findSongsByPage(Map<String,Integer> params);

    //查询歌曲总数
    int countSongs();

    //新增根据id查询单首歌曲信息
    Song findSongById(Integer id);

    //根据song_title查询歌曲信息
    List<Song> findSongByTitle(String song_title);
    //根据artist_name查询歌曲信息
    List<Song> findSongByArtistName(String artist_name);
    //根据album_name查询歌曲信息
    List<Song> findSongByAlbumName(String album_name);
}