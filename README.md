
---

# 🎵 SongsList 项目说明

> 🚀 我的第一个完整 Java 项目 —— 从爬虫到后端开发的完整实践

---

## 🌟 项目简介

这是我第一个完成的 **Java 项目**，在开发过程中我从中学到了一些新的知识与技能。
整个项目的流程包括：

1. **数据爬取**（详情可见我前面的仓库 🕷️）
2. **Python 数据入库**（不在本项目内）
3. **Spring Boot + MyBatis 后端开发**
4. **AI 生成的前端页面**

---

## 🧩 技术栈

| 模块   | 技术                      | 说明                             |
| ---- | ----------------------- | ------------------------------ |
| 爬虫   | 🐍 Python               | 爬取音乐网站数据                       |
| 数据库  | 🛢️ MySQL               | 存储歌曲、歌手、评论等信息                  |
| 后端框架 | ☕ Spring Boot + MyBatis | 实现三层架构（DAO、Service、Controller） |
| 前端   | 🤖 AI 生成                | 简单展示歌曲与评论信息                    |

---

## 🧠 学到的内容

在项目的开发过程中，我收获了很多：

* ✅ 理解了 **DAO - Service - Controller 三层架构**
* ✅ 学习了 **IoC（控制反转）** 与 **DI（依赖注入）** 的思想与实践
* ✅ 实现了以下功能：

  * 🔹 分页展示歌曲列表
  * 🔹 评论的增删查操作（数据持久化存储到数据库）
  * 🔹 基于 `LIKE` 语句的模糊查询（支持歌曲或歌手搜索）

---

## 🖥️ 功能展示

* 🎶 **歌曲分页展示**
* 💬 **评论功能（增删查）**
* 🔍 **模糊搜索功能**
* 🗄️ **数据库持久化保存**

---

## 📦 项目结构

```- src
  - main
    - java
      - com.guansh
        - controller
          - impl
            - CommentControllerImpl
            - SongControllerImpl
          - CommentController
          - SongController
        - dao
          - CommentDao
          - SongDao
        - pojo
          - Comment
          - Song
        - service
          - impl
            - CommentServiceImpl
            - SongServiceImpl
          - CommentService
          - SongService
        - SongsListTepApplication
- resources
  - com.guansh.dao
    - CommentDao.xml
    - SongDao.xml
  - static
    - css
      - style.css
    - js
      - app.js
    - index.html
    - README.md
  - templates
  - application.properties
```

---

## 🔗 相关仓库

> 🧩 数据爬虫部分请参考我前面的 crawler 仓库。

---

## ✨ 结语

这是我完成的第一个完整 Java 项目。
它让我对 **后端开发、数据库设计、以及 Spring Boot 框架** 有了更深入的理解。
未来我可能会继续完善这个项目



---


