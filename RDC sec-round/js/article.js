var articleThumbup = document.getElementsByClassName('article-thumbup')[0];
var articleComment = document.getElementsByClassName('article-fixed-comment')[0];
var articleDislike = document.getElementsByClassName('article-dislike')[0];
var followBtn = document.getElementsByClassName('follow')[0];
var commentArea = document.getElementsByClassName('comment-content')[0].offsetTop;
var authorBox = document.getElementsByClassName('author-box')[0];
var articleContents = [];
var articleContent;


var articleBtns = function(articleId, i) {
    var isThumbup = articleContents[i].isThumbUp;
    var isDislike = articleContents[i].isDislike;
    if (isThumbup) {
        articleThumbup.style.color = 'rgb(255, 0, 0)';
    } else {
        articleThumbup.style.color = '#b2bac2';
    }
    if (isDislike) {
        articleDislike.style.color = 'rgb(0, 128, 0)';
    } else {
        articleDislike.style.color = '#b2bac2';
    }
    articleThumbup.onclick = function() {
        if (articleThumbup.style.color == 'rgb(255, 0, 0)') {
            articleThumbup.style.color = '#b2bac2';
            axios.post('http://47.100.42.144:3389/article/thumbUpArticle', { "userId": userId, "articleId": articleId, "flag": "false" })
        } else {
            articleThumbup.style.color = 'rgb(255, 0, 0)';
            axios.post('http://47.100.42.144:3389/article/thumbUpArticle', { "userId": userId, "articleId": articleId, "flag": "true" })
        }
        goodnum.innerHTML = personalThumbed.length;
        articlesnum.innerHTML = personalThumbed.length;
    };
    articleComment.onclick = function() {
        window.scroll(0, commentArea);
    };
    articleDislike.onclick = function() {
        if (articleDislike.style.color == 'rgb(0, 128, 0)') {
            articleDislike.style.color = '#b2bac2';
            axios.post('http://47.100.42.144:3389/article/dislikeArticle', { "userId": userId, "articleId": articleId, "flag": "false" })
        } else {
            articleDislike.style.color = 'rgb(0, 128, 0)';
            axios.post('http://47.100.42.144:3389/article/dislikeArticle', { "userId": userId, "articleId": articleId, "flag": "true" })
        }
    };
}

var outSideBtns = function(articleId, i, outThumbup, outDislike) {
    var isThumbup = articleContents[i].isThumbUp;
    var isDislike = articleContents[i].isDislike;
    if (isThumbup) {
        outThumbup.style.color = 'rgb(255, 0, 0)';
    } else {
        outThumbup.style.color = '#b2bac2';
    }
    if (isDislike) {
        outDislike.style.color = 'rgb(0, 128, 0)';
    } else {
        outDislike.style.color = '#b2bac2';
    }
    outThumbup.onclick = function() {
        stopBubble();
        if (outThumbup.style.color == 'rgb(255, 0, 0)') {
            outThumbup.style.color = '#b2bac2';
            axios.post('http://47.100.42.144:3389/article/thumbUpArticle', { "userId": userId, "articleId": articleId, "flag": "false" })
        } else {
            outThumbup.style.color = 'rgb(255, 0, 0)';
            axios.post('http://47.100.42.144:3389/article/thumbUpArticle', { "userId": userId, "articleId": articleId, "flag": "true" })
        }
        goodnum.innerHTML = personalThumbed.length;
        articlesnum.innerHTML = personalThumbed.length;
    }

    outDislike.onclick = function() {
        stopBubble();
        if (outDislike.style.color == 'rgb(0, 128, 0)') {
            outDislike.style.color = '#b2bac2';
            axios.post('http://47.100.42.144:3389/article/dislikeArticle', { "userId": userId, "articleId": articleId, "flag": "false" })
        } else {
            outDislike.style.color = 'rgb(0, 128, 0)';
            axios.post('http://47.100.42.144:3389/article/dislikeArticle', { "userId": userId, "articleId": articleId, "flag": "true" })
        }
    }
}


var commentList = document.getElementsByClassName('comment-list')[0];
var sendComment = document.getElementsByClassName('article-enter-comment')[0];
var submitComment = document.getElementsByClassName('submit')[0].getElementsByTagName('button')[0];
var submitBox = document.getElementsByClassName('action-comment')[0].parentNode;
var articleComment;


var sendArticleComment = function(articleId) {
    var articleId = articleId
    sendComment.onfocus = function() {
        submitBox.style.display = 'block';
    }
    submitComment.onclick = function() {
        var comment = sendComment.value;
        if (comment != '') { axios.post('http://47.100.42.144:3389/comment/postComment', { "userId": userId, "articleId": articleId, "comment": comment }) } else { alert('评论失败') }
    }
}
var commentContent;
var getArticleComment = function(articleId) {
    axios.get('http://47.100.42.144:3389/comment/getComment', { params: { "userId": userId, "articleId": articleId, "page": page } }).then(res => {
        commentContent = res.data.data;
    }).then(() => {
        if (commentContent.length != 0) {
            for (let i = 0; i < commentContent.length; i++) {
                addArticleComment(commentContent[i], i)
            }
        } else {
            page = 1;
            window.onscroll = null;
        }
    }).then(() => {
        isBottom();
    })
}

// 评论
var comment;
var reply;
var addArticleComment = function(commentContent, i) {
    var i = i;
    var commentContent = commentContent;
    commentId = commentContent.commentId;
    var oneComment = document.createElement('div');
    oneComment.setAttribute('class', 'one-comment');
    oneComment.innerHTML = '<div class="comments"><img src="" alt=" "><div class="comment-list-content "><div class="author-name ">马男波杰克</div><div class="comment-personal ">啥时候公布</div><div class="comment-time "><span>23小时前</span><div class="response first-response"><span class="comment-thumbup">&#xe601;</span><span class="comment-dislike">&#xe601;</span><span class="comment-further">&#xe61b;</span></div></div><div  style="display:none;"><div class="send-comment send-more"><img src="" alt=" "><div class="enter-comment"><input type="text " placeholder="输入评论... " class="input-box article-enter-comment"><div><div class="action-comment"><img src="imgs/comment.svg " alt=" "><span>表情</span><div class="submit"><span>Ctrl or ⌘ + Enter</span><button type="button">评论</button></div></div></div></div></div></div><div class="more-comment-box"><div class="more-comment"><img src="" alt=" "><div class="comment-list-content "><div class="author-name ">马男波杰克</div><div class="comment-personal ">啥时候公布</div><div class="comment-time "><span>23小时前</span><div class="response "><span class="comment-thumbup">&#xe601;</span><span class="comment-dislike">&#xe601;</span><span class="comment-further">&#xe61b;</span></div></div></div></div></div></div></div>';
    commentList.appendChild(oneComment);
    var commentBox = document.getElementsByClassName('more-comment-box')[i];
    var moreSubmit = document.getElementsByClassName('send-more')[i].parentNode;
    var moreImg = moreSubmit.getElementsByTagName('img')[0];
    var submitMoreComment = moreSubmit.getElementsByTagName('button')[0];
    var firstThumbup = document.getElementsByClassName('first-response')[i].getElementsByClassName('comment-thumbup')[0];
    var firstComment = document.getElementsByClassName('first-response')[i].getElementsByClassName('comment-further')[0];
    var firstDislike = document.getElementsByClassName('first-response')[i].getElementsByClassName('comment-dislike')[0];

    moreImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
    if (commentContent.isThumbUp) {
        firstThumbup.style.color = 'rgb(255, 0, 0)';
    } else {
        firstThumbup.style.color = '#8a9aa9';
    };
    if (commentContent.isDislike) {
        firstDislike.style.color = 'rgb(0, 128, 0)';
    } else {
        firstDislike.style.color = '#8a9aa9';
    };
    firstThumbup.onclick = function() {
        if (firstThumbup.style.color == 'rgb(255, 0, 0)') {
            axios.post('http://47.100.42.144:3389/comment/thumbUpComment', { "userId": userId, "commentId": commentId, "flag": 'false' }).then(() => {
                firstThumbup.style.color = '#8a9aa9';
            })
        } else {
            firstThumbup.style.color = 'rgb(255, 0, 0)'
            axios.post('http://47.100.42.144:3389/comment/thumbUpComment', { "userId": userId, "commentId": commentId, "flag": 'true' })
        }
    }

    firstDislike.onclick = function() {
        if (firstDislike.style.color == 'rgb(0, 128, 0)') {
            firstDislike.style.color = '#8a9aa9';
            axios.post('http://47.100.42.144:3389/comment/dislikeComment', { "userId": userId, "commentId": commentId, "flag": 'false' })
        } else {
            firstDislike.style.color = 'rgb(0, 128, 0)'
            axios.post('http://47.100.42.144:3389/comment/dislikeComment', { "userId": userId, "commentId": commentId, "flag": 'true' })
        }
    }
    firstComment.onclick = function() {
        if (moreSubmit.style.display == 'block') {
            moreSubmit.style.display = 'none';
        } else {
            moreSubmit.style.display = 'block';
        }
    }

    submitMoreComment.onclick = function() {
        var reply = moreSubmit.getElementsByTagName('input')[0].value;
        axios.post('http://47.100.42.144:3389/reply/postReply', { "userId": userId, "commentId": commentId, "reply": reply })
    }
    axios.get('http://47.100.42.144:3389/reply/getReply', { params: { "userId": userId, "commentId": commentId, "page": 1 } }).then(res => {
        reply = res.data.data;
    }).then(() => {
        document.getElementsByClassName('comments')[i].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + commentContent.commentatorAvatar;
        document.getElementsByClassName('comments')[i].getElementsByClassName('author-name')[0].innerHTML = commentContent.commentator;
        document.getElementsByClassName('comments')[i].getElementsByClassName('comment-personal')[0].innerHTML = commentContent.comment;
        if (reply.length == 0) {
            commentBox.style.display = 'none';
        } else {
            commentBox.style.display = 'block';
            for (let j = 0; j < reply.length; j++) {
                document.getElementsByClassName('more-comment')[i].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + reply[j].replierAvatar;
                document.getElementsByClassName('more-comment')[i].getElementsByClassName('author-name')[0].innerHTML = reply[j].replier;
                document.getElementsByClassName('more-comment')[i].getElementsByClassName('comment-personal')[0].innerHTML = reply[j].replyContent;
            }
        }
    })
}
var isBottom = function(articleId) {
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) == scrollHeight) {
            page++;
            if (mainPage.style.display == 'block') {
                getMainArticle();
            } else if (articlePage.style.display == 'block') {
                getArticleComment(articleId);
            } else {
                window.onscroll = null;
                articleContents = [];
            }
        }
    }
}