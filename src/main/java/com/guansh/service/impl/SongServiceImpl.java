package com.guansh.service.impl;

import com.guansh.dao.SongDao;
import com.guansh.pojo.Song;
import com.guansh.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class SongServiceImpl implements SongService {
    private SongDao songDao;

    @Autowired
    public void setSongDao(SongDao songDao) {
        this.songDao = songDao;
    }

    @Override
    // 分页查询歌曲信息
    public List<Song> getSongsByPage(int pageNum, int pageSize) {

        int offset = (pageNum - 1) * pageSize;
        Map<String, Integer> params = new HashMap<>();
        params.put("offset", offset);
        params.put("limit", pageSize);
        return songDao.findSongsByPage(params);

    }

    @Override
    // 获取歌曲总数
    public int getTotalCount() {
        return songDao.countSongs();
    }


    @Override
    // 根据id查询歌曲信息
    public Song findSongById(Integer id) {
        return songDao.findSongById(id);
    }

    //    public List<Song> findAll() {
//        return songDao.findAll();
//    }
    //根据song_title查询歌曲信息
    @Override
    public List<Song> findSongByTitle(String song_title) {
        return songDao.findSongByTitle(song_title);
    }

    //根据artist_name查询歌曲信息
    @Override
    public List<Song> findSongByArtistName(String artist_name) {
        return songDao.findSongByArtistName(artist_name);
    }

    //根据album_name查询歌曲信息
    @Override
    public List<Song> findSongByAlbumName(String album_name) {
        return songDao.findSongByAlbumName(album_name);
    }
}
