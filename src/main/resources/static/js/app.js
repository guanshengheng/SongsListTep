// 全局变量
let currentPage = 1;
let pageSize = 12;
let totalPages = 1;
let currentSongId = null;
let currentSearchResults = [];
let currentSearchType = 'song';
let currentSearchKeyword = '';

// API基础URL
const API_BASE = '';

// 处理图片URL
function getImageUrl(imagePath) {
    if (!imagePath) {
        return 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=No+Image';
    }
    
    // 如果是完整的HTTP URL，直接返回
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // 如果是相对路径，构造完整URL
    if (imagePath.startsWith('/')) {
        return imagePath;
    }
    
    // 如果不是以/开头，添加/前缀
    return '/' + imagePath;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定搜索表单提交事件
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
    
    // 绑定删除评论确认事件
    document.getElementById('confirmDeleteComment').addEventListener('click', confirmDeleteComment);
    
    // 显示首页
    showHomePage();
});

// 显示首页
async function showHomePage() {
    hideAllPages();
    document.getElementById('homePage').style.display = 'block';
    
    try {
        showLoading(true);
        await loadSongs(currentPage);
    } catch (error) {
        console.error('加载歌曲列表失败:', error);
        showAlert('加载歌曲列表失败，请稍后重试', 'danger');
    } finally {
        showLoading(false);
    }
}

// 显示搜索页面
function showSearchPage() {
    hideAllPages();
    document.getElementById('searchPage').style.display = 'block';
    
    // 清空搜索表单
    document.getElementById('searchKeyword').value = '';
    document.getElementById('searchSong').checked = true;
}

// 显示搜索结果页面
function showSearchResultsPage() {
    hideAllPages();
    document.getElementById('searchResultsPage').style.display = 'block';
}

// 隐藏所有页面
function hideAllPages() {
    const pages = ['homePage', 'songDetailPage', 'searchPage', 'searchResultsPage'];
    pages.forEach(pageId => {
        document.getElementById(pageId).style.display = 'none';
    });
}

// 加载歌曲列表
async function loadSongs(page = 1) {
    try {
        const response = await fetch(`${API_BASE}/page?pageNum=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        
        currentPage = data.currentPage;
        totalPages = data.totalPages;
        
        renderSongs(data.songs);
        renderPagination(data.currentPage, data.totalPages, data.total);
    } catch (error) {
        console.error('加载歌曲失败:', error);
        throw error;
    }
}

// 渲染歌曲列表
function renderSongs(songs) {
    const container = document.getElementById('songsList');
    
    // 调试信息
    console.log('歌曲列表数据:', songs);
    if (songs.length > 0) {
        console.log('第一首歌曲数据:', songs[0]);
        console.log('第一首歌曲封面URL:', songs[0].cover_url);
    }
    
    if (songs.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-music fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">暂无歌曲数据</h5>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = songs.map(song => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card song-card h-100" onclick="showSongDetail(${song.id})">
                <img src="${getImageUrl(song.cover_url)}" 
                     class="card-img-top" 
                     alt="${song.song_title}"
                     onerror="this.src='https://via.placeholder.com/300x200/ff6b6b/ffffff?text=No+Image'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${escapeHtml(song.song_title)}</h5>
                    <p class="card-text">
                        <span class="artist-name" onclick="event.stopPropagation(); searchByArtist('${escapeHtml(song.artist_name)}')">
                            <i class="fas fa-user me-1"></i>${escapeHtml(song.artist_name)}
                        </span>
                    </p>
                    <p class="card-text">
                        <i class="fas fa-compact-disc me-1"></i>
                        <small class="text-muted">${escapeHtml(song.album_name || '未知专辑')}</small>
                    </p>
                    <div class="mt-auto">
                        <span class="badge bg-primary">${song.duration || '未知时长'}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染分页控件
function renderPagination(currentPage, totalPages, total) {
    const container = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHtml = '';
    
    // 首页按钮
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadSongs(1)">首页</a>
        </li>
    `;
    
    // 上一页按钮
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadSongs(${currentPage - 1})">上一页</a>
        </li>
    `;
    
    // 页码按钮
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="loadSongs(${i})">${i}</a>
            </li>
        `;
    }
    
    // 下一页按钮
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadSongs(${currentPage + 1})">下一页</a>
        </li>
    `;
    
    // 尾页按钮
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadSongs(${totalPages})">尾页</a>
        </li>
    `;
    
    // 页码跳转
    paginationHtml += `
        <li class="page-item">
            <div class="input-group ms-2">
                <input type="number" class="form-control" placeholder="页码" 
                       min="1" max="${totalPages}" style="width: 80px;">
                <button class="btn btn-outline-primary" type="button" 
                        onclick="jumpToPage(this.previousElementSibling.value)">跳转</button>
            </div>
        </li>
    `;
    
    container.innerHTML = paginationHtml;
}

// 跳转到指定页面
function jumpToPage(pageNum) {
    const page = parseInt(pageNum);
    if (page >= 1 && page <= totalPages) {
        loadSongs(page);
    } else {
        showAlert('请输入有效的页码', 'warning');
    }
}

// 显示歌曲详情
async function showSongDetail(songId) {
    hideAllPages();
    document.getElementById('songDetailPage').style.display = 'block';
    
    currentSongId = songId;
    
    try {
        showLoading(true);
        
        // 并行加载歌曲详情和评论
        const [songResponse, commentsResponse] = await Promise.all([
            fetch(`${API_BASE}/song?id=${songId}`),
            fetch(`${API_BASE}/comments?songId=${songId}`)
        ]);
        
        const song = await songResponse.json();
        const comments = await commentsResponse.json();
        
        renderSongDetail(song, comments);
    } catch (error) {
        console.error('加载歌曲详情失败:', error);
        showAlert('加载歌曲详情失败，请稍后重试', 'danger');
    } finally {
        showLoading(false);
    }
}

// 渲染歌曲详情
function renderSongDetail(song, comments) {
    const container = document.getElementById('songDetailContent');
    
    // 调试信息
    console.log('歌曲详情数据:', song);
    console.log('封面URL:', song.cover_url);
    console.log('歌词内容:', song.lyrics);
    
    container.innerHTML = `
        <div class="card song-detail-card">
            <div class="song-detail-info">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${getImageUrl(song.cover_url)}" 
                             class="img-fluid rounded" 
                             alt="${song.song_title}"
                             onerror="this.src='https://via.placeholder.com/300x300/ff6b6b/ffffff?text=No+Image'">
                    </div>
                    <div class="col-md-8">
                        <h1>${escapeHtml(song.song_title)}</h1>
                        <p class="mb-2">
                            <span class="artist-link" onclick="searchByArtist('${escapeHtml(song.artist_name)}')">
                                <i class="fas fa-user me-2"></i>${escapeHtml(song.artist_name)}
                            </span>
                        </p>
                        <p class="album-info mb-2">
                            <i class="fas fa-compact-disc me-2"></i>
                            ${escapeHtml(song.album_name || '未知专辑')}
                        </p>
                        <p class="mb-3">
                            <span class="duration">
                                <i class="fas fa-clock me-1"></i>${song.duration || '未知时长'}
                            </span>
                        </p>
                        ${song.song_url ? `
                            <a href="${song.song_url}" target="_blank" class="btn btn-light btn-lg">
                                <i class="fas fa-external-link-alt me-2"></i>访问原网站
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="lyrics-container">
                <h4><i class="fas fa-music me-2"></i>歌词</h4>
                <div class="lyrics-content" id="lyricsContent">
                    ${song.lyrics || '暂无歌词'}
                </div>
            </div>
        </div>
        
        <div class="comments-section">
            <h4><i class="fas fa-comments me-2"></i>评论 (${comments.length})</h4>
            
            <div class="comment-input-container">
                <h5>添加评论</h5>
                <form id="commentForm">
                    <div class="mb-3">
                        <textarea class="form-control comment-textarea" 
                                  id="commentContent" 
                                  placeholder="请输入您的评论..." 
                                  required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane me-2"></i>发表评论
                    </button>
                </form>
            </div>
            
            <div id="commentsList">
                ${renderComments(comments)}
            </div>
        </div>
    `;
    
    // 绑定评论提交事件
    document.getElementById('commentForm').addEventListener('submit', handleCommentSubmit);
}


// 渲染评论列表
function renderComments(comments) {
    if (comments.length === 0) {
        return `
            <div class="text-center py-4">
                <i class="fas fa-comment-slash fa-2x text-muted mb-3"></i>
                <p class="text-muted">暂无评论，快来发表第一条评论吧！</p>
            </div>
        `;
    }
    
    return comments.map(comment => `
        <div class="card comment-card">
            <div class="card-body">
                <p class="comment-content">${escapeHtml(comment.content)}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="comment-time">
                        <i class="fas fa-clock me-1"></i>
                        ${formatDateTime(comment.create_time)}
                    </small>
                    <div class="comment-actions">
                        <button class="btn btn-outline-danger btn-sm" 
                                onclick="showDeleteCommentModal(${comment.id})">
                            <i class="fas fa-trash me-1"></i>删除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 处理评论提交
async function handleCommentSubmit(event) {
    event.preventDefault();
    
    const content = document.getElementById('commentContent').value.trim();
    if (!content) {
        showAlert('请输入评论内容', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song_id: currentSongId,
                content: content
            })
        });
        
        if (response.ok) {
            showAlert('评论发表成功！', 'success');
            document.getElementById('commentContent').value = '';
            
            // 重新加载评论
            await loadComments();
        } else {
            showAlert('评论发表失败，请稍后重试', 'danger');
        }
    } catch (error) {
        console.error('发表评论失败:', error);
        showAlert('评论发表失败，请稍后重试', 'danger');
    }
}

// 加载评论
async function loadComments() {
    try {
        const response = await fetch(`${API_BASE}/comments?songId=${currentSongId}`);
        const comments = await response.json();
        
        document.getElementById('commentsList').innerHTML = renderComments(comments);
    } catch (error) {
        console.error('加载评论失败:', error);
    }
}

// 显示删除评论确认模态框
function showDeleteCommentModal(commentId) {
    const modal = new bootstrap.Modal(document.getElementById('deleteCommentModal'));
    modal.show();
    
    // 存储要删除的评论ID
    document.getElementById('confirmDeleteComment').dataset.commentId = commentId;
}

// 确认删除评论
async function confirmDeleteComment() {
    const commentId = document.getElementById('confirmDeleteComment').dataset.commentId;
    
    try {
        const response = await fetch(`${API_BASE}/comments/${commentId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('评论删除成功！', 'success');
            
            // 关闭模态框
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteCommentModal'));
            modal.hide();
            
            // 重新加载评论
            await loadComments();
        } else {
            showAlert('评论删除失败，请稍后重试', 'danger');
        }
    } catch (error) {
        console.error('删除评论失败:', error);
        showAlert('评论删除失败，请稍后重试', 'danger');
    }
}

// 处理搜索
async function handleSearch(event) {
    event.preventDefault();
    
    const keyword = document.getElementById('searchKeyword').value.trim();
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    if (!keyword) {
        showAlert('请输入搜索关键词', 'warning');
        return;
    }
    
    if (keyword.length > 20) {
        showAlert('搜索关键词不能超过20个字符', 'warning');
        return;
    }
    
    currentSearchKeyword = keyword;
    currentSearchType = searchType;
    
    try {
        showLoading(true);
        await performSearch(keyword, searchType);
        showSearchResultsPage();
    } catch (error) {
        console.error('搜索失败:', error);
        showAlert('搜索失败，请稍后重试', 'danger');
    } finally {
        showLoading(false);
    }
}

// 执行搜索
async function performSearch(keyword, searchType) {
    let endpoint = '';
    let searchResults = [];
    
    const startTime = Date.now();
    
    if (searchType === 'song') {
        // 搜索歌曲：按标题、艺术家、专辑搜索
        const [titleResults, artistResults, albumResults] = await Promise.all([
            fetch(`${API_BASE}/title?song_title=${encodeURIComponent(keyword)}`).then(r => r.json()),
            fetch(`${API_BASE}/artist?artist_name=${encodeURIComponent(keyword)}`).then(r => r.json()),
            fetch(`${API_BASE}/album?album_name=${encodeURIComponent(keyword)}`).then(r => r.json())
        ]);
        
        // 合并结果并去重
        const allResults = [...titleResults, ...artistResults, ...albumResults];
        searchResults = allResults.filter((song, index, self) => 
            index === self.findIndex(s => s.id === song.id)
        );
    } else if (searchType === 'artist') {
        // 搜索歌手
        searchResults = await fetch(`${API_BASE}/artist?artist_name=${encodeURIComponent(keyword)}`)
            .then(r => r.json());
    }
    
    const endTime = Date.now();
    const searchTime = endTime - startTime;
    
    currentSearchResults = searchResults;
    
    renderSearchResults(searchResults, keyword, searchType, searchTime);
}

// 渲染搜索结果
function renderSearchResults(results, keyword, searchType, searchTime) {
    const statsContainer = document.getElementById('searchStats');
    const resultsContainer = document.getElementById('searchResults');
    
    // 更新搜索统计信息
    statsContainer.innerHTML = `
        <p>搜索关键词: <strong>"${escapeHtml(keyword)}"</strong> | 
           搜索类型: <strong>${searchType === 'song' ? '歌曲' : '歌手'}</strong> | 
           找到 ${results.length} 个结果 | 
           耗时 ${searchTime}ms</p>
    `;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">未找到相关结果</h5>
                    <p class="text-muted">请尝试其他关键词或搜索类型</p>
                </div>
            </div>
        `;
        document.getElementById('searchPaginationContainer').style.display = 'none';
        return;
    }
    
    // 渲染搜索结果
    resultsContainer.innerHTML = results.map(song => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card search-result-card h-100" onclick="showSongDetail(${song.id})">
                <img src="${getImageUrl(song.cover_url)}" 
                     class="card-img-top search-result-image" 
                     alt="${song.song_title}"
                     onerror="this.src='https://via.placeholder.com/300x200/ff6b6b/ffffff?text=No+Image'">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${escapeHtml(song.song_title)}</h6>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="fas fa-user me-1"></i>${escapeHtml(song.artist_name)}
                        </small>
                    </p>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="fas fa-compact-disc me-1"></i>${escapeHtml(song.album_name || '未知专辑')}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('searchPaginationContainer').style.display = 'none';
}

// 按歌手搜索
async function searchByArtist(artistName) {
    // 设置搜索表单
    document.getElementById('searchKeyword').value = artistName;
    document.getElementById('searchArtist').checked = true;
    
    // 显示搜索页面
    showSearchPage();
    
    // 自动执行搜索
    setTimeout(async () => {
        try {
            showLoading(true);
            await performSearch(artistName, 'artist');
            showSearchResultsPage();
        } catch (error) {
            console.error('搜索失败:', error);
            showAlert('搜索失败，请稍后重试', 'danger');
        } finally {
            showLoading(false);
        }
    }, 100);
}

// 显示/隐藏加载动画
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = show ? 'block' : 'none';
}

// 显示提示信息
function showAlert(message, type = 'info') {
    // 创建提示框
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

// 转义HTML字符
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化日期时间
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '未知时间';
    
    const date = new Date(dateTimeString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
