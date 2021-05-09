var loginBtn = document.getElementsByClassName('login')[0];
var write = document.getElementsByClassName('article')[0];
var sendOutBtn = document.getElementsByClassName('more')[0].getElementsByTagName('i')[0];
var sendOut = document.getElementsByClassName('more')[0].getElementsByClassName('send-out')[0];

var registerBox = document.getElementsByClassName('register-box')[0];
var out = document.getElementsByClassName('out')[0];
var text = document.getElementsByClassName('other-box')[0].getElementsByTagName('input')[0];
var password = document.getElementsByClassName('other-box')[0].getElementsByTagName('input')[1];
var normalimg = document.getElementsByClassName('normal')[0];
var greetimg = document.getElementsByClassName('greet')[0];
var closeimg = document.getElementsByClassName('close')[0];
var login = document.getElementsByClassName('sign-now')[1];
var headerfixed = document.getElementsByClassName('header-fixed')[0];
var offer = document.getElementsByClassName('offer')[0];

var stopBubble = function(e) {
    var evt = e || window.event;
    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
}

sendOutBtn.addEventListener('click', function() {
    if (sendOut.style.display == 'none') {
        sendOut.style.display = 'block';
    } else {
        sendOut.style.display = 'none';
    }
}, false)


var clearLoginImg = function() {
    normalimg.style.display = 'none';
    greetimg.style.display = 'none';
    closeimg.style.display = 'none';
}


loginBtn.onclick = function() {
    registerBox.style.visibility = 'visible';
}

text.onfocus = function() {
    clearLoginImg();
    greetimg.style.display = 'block';
}
text.onblur = function() {
    clearLoginImg();
    normalimg.style.display = 'block';
}

password.onfocus = function() {
    clearLoginImg();
    closeimg.style.display = 'block';
}
password.onblur = function() {
    clearLoginImg();
    normalimg.style.display = 'block';
}
out.onclick = function() {
    registerBox.style.visibility = 'hidden';
}

var otherId;
var userId; //获取用户id
var userInfo; //获取用户信息
var message; //判断登录
var alerting = document.getElementsByClassName('alert')[0];
var personalInfo = document.getElementsByClassName('personal-info')[0];
var aboutYourself = document.getElementsByClassName('about-yourself')[0];
var yourLike = document.getElementsByClassName('your-like')[0];
var userfollowed;

login.onclick = function() {
    window.onscroll = null;
    username = text.value;
    pwd = password.value;
    articleContents = [];
    axios.post('http://47.100.42.144:3389/user/login', {
        'username': username,
        'password': pwd,
    }).then(res => {
        userId = res.data.data.userId;
        axios.get('http://47.100.42.144:3389/user/isLogin', {
                params: {
                    'userId': userId,
                }
            }).then(res => {
                message = res.data.data.message;
                username = '';
                pwd = '';
                if (message == '已登录') {
                    axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                        params: {
                            'userId': userId,
                        }
                    }).then(res => {
                        userInfo = res.data.data;
                        registerBox.style.visibility = 'hidden';
                        loginBtn.style.display = 'none';
                        alerting.style.display = 'block';
                        personalInfo.style.display = 'block';
                        yourLike.style.display = 'block';
                        offer.style.display = 'none';
                        personalInfo.getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                        page = 1;
                        mainArticle.innerHTML = '';
                        getMainArticle();
                    })
                }
            }).then(() => {
                axios.get('http://47.100.42.144:3389/user/getMySubscribe', { params: { "userId": userId } }).then(res => {
                    userfollowed = res.data.data;
                }).then(() => {
                    if (userfollowed.message == '暂无关注用户') {
                        followedNum.innerHTML = 0;
                    } else {
                        followedNum.innerHTML = userfollowed.length;
                    }
                });
                axios.get('http://47.100.42.144:3389/user/getSubscribeMe', { params: { "userId": userId } }).then(res => {
                    personalFollowing = res.data.data;
                }).then(() => {
                    if (personalFollowing.message == '暂无人关注') {
                        followingNum.innerHTML = 0;
                    } else {
                        followingNum.innerHTML = personalFollowing.length;
                    }
                }).then(() => {
                    axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', { params: { "userId": userId } }).then(res => {
                        personalThumbed = res.data.data;
                        if (personalThumbed.message == '暂无点赞文章') {

                        } else {
                            goodnum.innerHTML = personalThumbed.length + '&#xe600;';
                            articlesnum.innerHTML = personalThumbed.length;
                        }
                    })
                });
            }).then(() => {
                axios.get('http://47.100.42.144:3389/user/getSubscribe', { params: { "userId": userId } }).then(res => {
                    userfollowed = res.data.data;
                })
            })
            .catch(err => {
                alert('账号或密码错误');
            })
    })
}

personalInfo.onclick = function() {
    if (aboutYourself.style.display == 'none') {
        aboutYourself.style.display = 'block';
    } else {
        aboutYourself.style.display = 'none';
    }
}

var personalMain = document.getElementById('personal-main');
var writeArticle = document.getElementsByClassName('write-article');
var signOut = document.getElementById('sign-out');
var headerBottom = document.getElementById('suggest'); //主页导航栏
var personalNav = document.getElementById('personal-nav'); //个人导航栏
var mainPage = document.getElementsByClassName('main-page')[0]; //主页
var personalPage = document.getElementById('personal-page'); //个人主页
var editPage = document.getElementsByClassName('edit-personal')[0]; //修改个人资料
var personalPageImg = document.getElementById('personal-img');
var personalPagenName = document.getElementById('personal-page-name');
var personalEditImg = document.getElementsByClassName('personal-img')[0].getElementsByTagName('img')[0];
var writeImg = document.getElementsByClassName('write-header')[0].getElementsByTagName('img')[0];
var goBack = document.getElementsByClassName('go-back')[0];
var bakcMain = document.getElementsByClassName('back-main')[0];
var backPersonal = document.getElementsByClassName('back-personal')[0];
var articlePage = document.getElementsByClassName('article-type2')[0];




var clearPage = function() {
    mainPage.style.display = 'none';
    personalPage.style.display = 'none';
    editPage.style.display = 'none';
    writePage.style.display = 'none';
    articlePage.style.display = 'none';
}
personalMain.onclick = function() {
    clearPage();
    clearPersonalPage();
    clearaNavStyle();
    otherId = userId;
    article.children[0].style.borderBottom = '2px solid #3780f7';
    personalPage.style.display = 'block';
    headerBottom.style.display = 'none';
    personalNav.style.display = 'none';
    editInfo.style.display = 'block';
    personalArticles.style.display = 'block';
    personalPageImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
    personalPagenName.innerHTML = userInfo.nickname;
    personalEditImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
    personalInput[0].value = userInfo.nickname;
    page = 1;
    articleContents = [];
    getMyArticle();
}

// 退出登录
signOut.onclick = function() {
    userId = undefined;
    yourLike.style.display = 'none';
    clearPage();
    mainPage.style.display = 'block';
    alerting.style.display = 'none';
    loginBtn.style.display = 'block';
    personalInfo.style.display = 'none';
    headerBottom.style.display = 'block';
    offer.style.display = '';
    page = 1;
    mainArticle.innerHTML = '';
    articleContents = []
    getMainArticle();
}

var writePage = document.getElementById('write');
var title = document.getElementsByClassName('write-title')[0];
var writeImg = document.getElementsByClassName('write-img')[0];
var writeSend = document.getElementsByClassName('write-send')[0];
var writeContent = document.getElementsByClassName('write-area')[0];

for (let i = 0; i < writeArticle.length; i++) {
    writeArticle[i].onclick = function() {
        if (userId) {
            clearPage();
            headerfixed.style.display = 'none';
            writePage.style.display = 'block';
            writeImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
        } else {
            registerBox.style.visibility = 'visible';
        }
    }
}


// 写文章
writeSend.onclick = function() {
    var ariticleTitle = title.value;
    var articleContent = writeContent.value;
    axios.post('http://47.100.42.144:3389/article/writeArticle', {
        "userId": userId,
        "title": ariticleTitle,
        'content': articleContent,
    }).then(res => {
        alert('发布成功');
        ariticleTitle = '';
        articleContent = '';
        goBack.style.display = 'none';
        headerfixed.style.display = 'block';
        writePage.style.display = 'none';
        mainPage.style.display = 'block';
        ariticleTitle = '';
        articleContent = '';
    })
}

writeImg.onclick = function() {
    if (goBack.style.display == 'none') {
        goBack.style.display = 'block';
    } else {
        goBack.style.display = 'none';
    }
}

backPersonal.onclick = function() {
    clearPage();
    personalPage.style.display = 'block';
    headerfixed.style.display = 'block';
    headerBottom.style.display = 'none';
    personalPageImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
    personalPagenName.innerHTML = userInfo.nickname;
    personalEditImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
    personalInput[0].value = userInfo.nickname;
    getMyArticle();
    goBack.style.display = 'none'
    clearaNavStyle();
    article.children[0].style.borderBottom = '2px solid #3780f7';
}

bakcMain.onclick = function() {
    clearPage();
    mainPage.style.display = 'block';
    headerfixed.style.display = 'block';
    headerBottom.style.display = 'block';
    goBack.style.display = 'none';
    articleContents = [];
    editInfo.style.display = 'block';
    window.onscroll = null;
    page = 1;
    mainArticle.innerHTML = ''
    getMainArticle();
}

var mainHeader = document.getElementsByClassName('nav1')[0].getElementsByTagName('li')[0]

mainHeader.onclick = function() {
    clearPage();
    mainPage.style.display = 'block';
    headerfixed.style.display = 'block';
    headerBottom.style.display = 'block';
    goBack.style.display = 'none';
    articleContents = [];
    editInfo.style.display = 'block';
    window.onscroll = null;
    page = 1;
    mainArticle.innerHTML = ''
    getMainArticle();
}

//获取主页文章

var page = 1;
var mainArticle = document.getElementsByClassName('mainPage-list')[0];

var getMainArticle = function() {
    var articles;
    axios.get('http://47.100.42.144:3389/article/getArticle', { params: { "userId": 104, "page": page } }).then(res => {
        articles = res.data.data;
    }).then(() => {
        if (articles.length != 0) {
            var pageNum = document.createElement('div');
            pageNum.setAttribute('class', 'page');
            mainArticle.appendChild(pageNum);
            var onPageNum = document.getElementsByClassName('page')[page - 1];
            for (let i = 0; i < articles.length; i++) {
                printArticles(onPageNum, articles[i], i);
                isBottom();
            }
        } else {
            window.onscroll = null;
            page = 1;
        }
    })
}

var printArticles = function(onPageNum, articleMain, i) {
    var i = i;
    var li = document.createElement('li');
    li.innerHTML = '<div class = "type2 my-article" ><div class = "date" ><span class = "author-id"></span> <span > | </span><span> 19 小时前 </span></div><h3 class = "article-title"></h3><div class = "left-content"id = "article-content"></div> <div class="comment"><ul><li class="outside-thumbup"><span>&#xe601;</span><i class="thumbup-num">121</i></li><li class="outside-comment"><span>&#xe61b;</span><i class="comment-num">20</i></li><li class="outside-dislike"><span>&#xe601;</span></li> </ul></div></div>';
    onPageNum.appendChild(li);
    axios.get('http://47.100.42.144:3389/article/getContent', { params: { "userId": 104, "articleId": articleMain.articleId } }).then((res) => { articleContent = res.data.data; }).then(() => {
        articleContents.push(articleContent);
        var thumbupNum = onPageNum.getElementsByClassName('thumbup-num');
        var commentNum = onPageNum.getElementsByClassName('comment-num');
        var outThumbup = onPageNum.getElementsByClassName('outside-thumbup')[i];
        var outDislike = onPageNum.getElementsByClassName('outside-dislike')[i];
        var authorName = onPageNum.getElementsByClassName('author-id')[i];
        var articleTitle = onPageNum.getElementsByClassName('article-title')[i];
        authorName.innerHTML = articleMain.author;
        articleTitle.innerHTML = articleMain.title;
        thumbupNum[i].innerHTML = articleMain.thumbUpNum;
        commentNum[i].innerHTML = articleMain.commentNum;
        if (userId) {
            outSideBtns(articleMain.articleId, i, outThumbup, outDislike);
        }
        onPageNum.getElementsByClassName('my-article')[i].onclick = function() {
            if (userId) {
                console.log((page - 1) * 10 + i)
                headerBottom.style.display = 'none'
                clearPage();
                commentList.innerHTML = '';
                articlePage.style.display = 'block';
                document.getElementsByClassName('author-box')[0].getElementsByTagName('h3')[0].innerHTML = articleContents[(page - 1) * 10 + i].author;
                document.getElementsByClassName('author-box')[0].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + articleContents[(page - 1) * 10 + i].authorAvatar;
                document.getElementsByClassName('type2-content')[0].getElementsByTagName('h1')[0].innerHTML = articleContents[(page - 1) * 10 + i].title;
                document.getElementsByClassName('type2-content')[0].getElementsByTagName('p')[0].innerHTML = articleContents[(page - 1) * 10 + i].content;
                document.getElementsByClassName('send-comment')[0].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                getArticleComment(articleMain.articleId);
                sendArticleComment(articleMain.articleId);
                articleBtns(articleMain.articleId, i);
                authorBox.onclick = function() {
                    otherId = articleContents[i].authorId;
                    axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                        params: {
                            'userId': otherId,
                        }
                    }).then(res => {
                        otherInfo = res.data.data;
                    }).then(() => {
                        clearPage();
                        clearPersonalPage();
                        clearaNavStyle();
                        article.children[0].style.borderBottom = '2px solid #3780f7';
                        personalPage.style.display = 'block';
                        headerBottom.style.display = 'none';
                        personalNav.style.display = 'none';
                        personalArticles.style.display = 'block';
                        personalPageImg.src = 'http://47.100.42.144:3389/' + otherInfo.avatar;
                        personalPagenName.innerHTML = otherInfo.nickname;
                        page = 1;
                        getMyArticle(otherId);
                        axios.get('http://47.100.42.144:3389/user/getMySubscribe', { params: { "userId": userId } }).then(res => {
                            personalFollowed = res.data.data;
                        }).then(() => {
                            if (personalFollowed.message == '暂无关注用户') {
                                followedNum.innerHTML = 0;
                            } else {
                                followedNum.innerHTML = personalFollowed.length;
                            }
                        });
                    }).then(() => {
                        axios.get('http://47.100.42.144:3389/user/getSubscribeMe', { params: { "userId": userId } }).then(res => {
                            personalFollowing = res.data.data;
                        }).then(() => {
                            if (personalFollowing.message == '暂无人关注') {
                                followingNum.innerHTML = 0;
                            } else {
                                followingNum.innerHTML = personalFollowing.length;
                            }
                        })
                    }).then(() => {
                        axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', { params: { "userId": id } }).then(res => {
                            personalThumbed = res.data.data;
                            if (personalThumbed.message == '暂无点赞文章') {

                            } else {
                                goodnum.innerHTML = personalThumbed.length + '&#xe600;';
                                articlesnum.innerHTML = personalThumbed.length;
                            }
                        })
                    })
                }
            } else {
                page = 1;
                registerBox.style.visibility = 'visible';
            }
        }
    })
}
getMainArticle();