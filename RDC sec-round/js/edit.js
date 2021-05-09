var editInfo = document.getElementsByClassName('edit')[0].getElementsByTagName('button')[0];
var editBox = document.getElementsByClassName('edit-personal')[0];

editInfo.onclick = function() {
    clearPage();
    editPage.style.display = 'block';
    personalNav.style.display = 'block';
    headerBottom.style.display = 'none';
}

var Lis = document.getElementsByClassName('navs')[0].getElementsByTagName('li');
var getGood = document.getElementById('getgood');
var following = document.getElementById('following');
var article = Lis[1];
var thumbup = Lis[3];
var more = Lis[5];


thumbup.onclick = function() {
    if (getGood.style.display == 'none') {
        getGood.style.display = 'block';
    } else {
        getGood.style.display = 'none';
    }
}
more.onclick = function() {
    if (following.style.display == 'none') {
        following.style.display = 'block';
    } else {
        following.style.display = 'none';
    }
}

var clearaNavStyle = function() {
    for (let i = 0; i < Lis.length; i++) {
        Lis[i].children[0].style.border = 'none';
    }
}

var good = document.getElementById('good');
var goodnum = document.getElementById('goodnum');
var articles = document.getElementById('articles');
var articlesnum = document.getElementById('articlesnum');
var aboutMore = more.childNodes[0];
var aboutFollow = document.getElementsByClassName('following')[0];


var personalArticles = document.getElementById('personal-articles');
var personalThumbup = document.getElementById('personal-thumbup');
var followedPage = document.getElementById('followed');
var empetyBox = document.getElementById('empty-box');

var personalWrited, personalThumbed, personalFollowed, whoFollowing;

var clearPersonalPage = function() {
    personalArticles.style.display = 'none';
    personalThumbup.style.display = 'none';
    followedPage.style.display = 'none';
    empetyBox.style.display = 'none';
}


var personalWritedPage = document.getElementById('personal-writed');
var personalWritedShow = personalWritedPage.children[0];

// 写过的文章
article.onclick = function() {
    clearaNavStyle();
    clearPersonalPage();
    article.children[0].style.borderBottom = '2px solid #3780f7';
    personalArticles.style.display = 'block';
    getGood.style.display = 'none';
    following.style.display = 'none';
    articleContents = [];
    getMyArticle();
}

var getMyArticle = function() {
    page = 1;
    personalWritedShow.innerHTML = '';
    if (otherId == userId) {
        id = userId;
    } else {
        id = otherId;
    }
    axios.get('http://47.100.42.144:3389/user/getUserWriteArticles', { params: { "userId": id } }).then(res => {
        personalWrited = res.data.data;
    }).then(() => {
        if (personalWrited.length == 0) {
            empetyBox.style.display = 'block';
        } else {
            personalWritedPage.style.display = 'block';;
            for (let i = 0; i < personalWrited.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = '<div class = "type2 my-article" ><div class = "date" ><span class = "author-id"></span> <span > | </span><span> 19 小时前 </span></div><h3 class = "article-title"></h3><div class = "left-content"id = "article-content"></div> <div class="comment"><ul><li class="outside-thumbup"><span>&#xe601;</span><i class="thumbup-num">121</i></li><li class="outside-comment"><span>&#xe61b;</span><i class="comment-num">20</i></li><li class="outside-dislike"><span>&#xe601;</span></li> </ul></div></div>';
                personalWritedShow.appendChild(li);
            }
        }
    }).then(() => {
        for (let i = 0; i < personalWrited.length; i++) {
            followBtn.style.display = 'none';
            axios.get('http://47.100.42.144:3389/article/getContent', { params: { "userId": id, "articleId": personalWrited[i].articleId } }).then((res) => { articleContent = res.data.data; }).then(() => {
                articleContents.push(articleContent);
                var thumbupNum = personalWritedShow.getElementsByClassName('thumbup-num')[i];
                var commentNum = personalWritedShow.getElementsByClassName('comment-num')[i];
                var authorName = personalWritedShow.getElementsByClassName('author-id')[i];
                var articleTitle = personalWritedShow.getElementsByClassName('article-title')[i];
                var outThumbup = personalWritedShow.getElementsByClassName('outside-thumbup')[i];
                var outDislike = personalWritedShow.getElementsByClassName('outside-dislike')[i];
                if (id == userId) {
                    authorName.innerHTML = userInfo.nickname;
                } else {
                    authorName.innerHTML = otherInfo.nickname;
                }
                articleTitle.innerHTML = personalWrited[i].title;
                thumbupNum.innerHTML = personalWrited[i].thumbUpNum;
                commentNum.innerHTML = personalWrited[i].commentNum;
                outSideBtns(personalWrited[i].articleId, i, outThumbup, outDislike);
                personalWritedShow.getElementsByClassName('my-article')[i].onclick = function() {
                    clearPage();
                    commentList.innerHTML = '';
                    articlePage.style.display = 'block';
                    authorBox.getElementsByTagName('h3')[0].innerHTML = articleContents[i].author;
                    authorBox.getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + articleContents[i].authorAvatar;
                    document.getElementsByClassName('type2-content')[0].getElementsByTagName('h1')[0].innerHTML = articleContents[i].title;
                    document.getElementsByClassName('type2-content')[0].getElementsByTagName('p')[0].innerHTML = articleContents[i].content;
                    document.getElementsByClassName('send-comment')[0].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                    page = 1;
                    getArticleComment(personalWrited[i].articleId);
                    sendArticleComment(personalWrited[i].articleId);
                    articleBtns(personalWrited[i].articleId, i);
                }
            })
        }
    })
}

// 赞过的文章
articles.onclick = function() {
    clearaNavStyle();
    clearPersonalPage();
    personalThumbup.style.display = 'block';
    thumbup.children[0].style.borderBottom = '2px solid #3780f7';
    following.style.display = 'none';
    getLikeArticle();
}

var getLikeArticle = function() {
    page = 1;
    var id;
    personalWritedShow.innerHTML = '';
    articleContents = [];
    if (otherId == userId) {
        id = userId;
    } else {
        id = otherId;
    }
    axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', { params: { "userId": id } }).then(res => {
        personalThumbed = res.data.data;
        if (personalThumbed.message == '暂无点赞文章') {

        } else {
            goodnum.innerHTML = personalThumbed.length + '&#xe600;';
            articlesnum.innerHTML = personalThumbed.length;
        }
    }).then(() => {
        axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', { params: { "userId": id } }).then(res => {
            personalThumbed = res.data.data;
        }).then(() => {
            if (personalThumbed.message == '暂无点赞文章') {
                empetyBox.style.display = 'block';
            } else {
                personalWritedPage.style.display = 'block';;
                for (let i = 0; i < personalThumbed.length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = '<div class = "type2 good-article my-article" ><div class = "date" ><span class = "author-id"></span> <span > | </span><span> 19 小时前 </span></div><h3 class = "article-title"> </h3><div class = "left-content" id= "article-content"></div> <div class="comment"><ul><li class="outside-thumbup"><span>&#xe601;</span><i class="thumbup-num">121</i></li><li class="outside-comment"><span>&#xe61b;</span><i class="comment-num">20</i></li><li class="outside-dislike"><span>&#xe601;</span></li> </ul></div></div>';
                    personalWritedShow.appendChild(li);
                }
            }
        }).then(() => {
            for (let i = 0; i < personalThumbed.length; i++) {
                axios.get('http://47.100.42.144:3389/article/getContent', { params: { "userId": id, "articleId": personalThumbed[i].articleId } }).then((res) => {
                    articleContent = res.data.data;
                }).then(() => {
                    articleContents.push(articleContent);
                    var thumbupNum = personalWritedShow.getElementsByClassName('thumbup-num')[i];
                    var commentNum = personalWritedShow.getElementsByClassName('comment-num')[i];
                    var authorName = personalWritedShow.getElementsByClassName('author-id')[i];
                    var articleTitle = personalWritedShow.getElementsByClassName('article-title')[i];
                    var outThumbup = personalWritedShow.getElementsByClassName('outside-thumbup')[i];
                    var outDislike = personalWritedShow.getElementsByClassName('outside-dislike')[i];
                    authorName.innerHTML = personalThumbed[i].author;
                    thumbupNum.innerHTML = personalThumbed[i].thumbUpNum;
                    articleTitle.innerHTML = personalThumbed[i].title;
                    commentNum.innerHTML = personalThumbed[i].commentNum;
                    outSideBtns(personalThumbed[i].articleId, i, outThumbup, outDislike);
                    personalWritedShow.getElementsByClassName('my-article')[i].onclick = function() {
                        clearPage();
                        commentList.innerHTML = '';
                        articlePage.style.display = 'block';
                        authorBox.getElementsByTagName('h3')[0].innerHTML = articleContents[i].author;
                        authorBox.getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + articleContents[i].authorAvatar;
                        document.getElementsByClassName('type2-content')[0].getElementsByTagName('h1')[0].innerHTML = articleContents[i].title;
                        document.getElementsByClassName('type2-content')[0].getElementsByTagName('p')[0].innerHTML = articleContents[i].content;
                        document.getElementsByClassName('send-comment')[0].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                        sendArticleComment(personalThumbed[i].articleId);
                        articleBtns(personalThumbed[i].articleId, i);
                        getArticleComment(personalThumbed[i].articleId)
                        authorBox.onclick = function() {
                            otherId = personalThumbed[i].authorId;
                            editInfo.style.display = 'none';
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
                    }
                })
            }
        })
    })
}

// 关注
var personalFollowedInfo;
var follow = document.getElementsByClassName('personal-article-right ')[2].children;


var myFollow = function() {
    clearaNavStyle();
    clearPersonalPage();
    followedPage.style.display = 'block';
    more.children[0].style.borderBottom = '2px solid #3780f7';
    getGood.style.display = 'none';
    personalWritedShow.innerHTML = '';
    var id;
    if (otherId == userId) {
        id = userId;
    } else {
        id = otherId;
    }
    axios.get('http://47.100.42.144:3389/user/getMySubscribe', { params: { "userId": id } }).then(res => {
        personalFollowed = res.data.data;
    }).then(() => {
        if (personalFollowed.message == '暂无关注用户') {
            empetyBox.style.display = 'block';
        } else {
            for (let i = 0; i < personalFollowed.length; i++) {
                axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                    params: {
                        "userId": personalFollowed[i].subId,
                    }
                }).then(res => {
                    personalFollowedInfo = res.data.data;
                }).then(() => {
                    var li = document.createElement('li');
                    li.innerHTML = '<div class="personal-subscribe"><img src="" alt=""><div class="follow-info"><h3></h3><p></p></div><div class="follow-btns"><button class="follow-normal" style="display: none;">关注</button><button class="follow-active" style="display: block;">已关注</button></div></div></ul>'
                    personalWritedShow.appendChild(li);
                }).then(() => {
                    console.log(personalFollowedInfo);
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('h3')[0].innerHTML = personalFollowedInfo.nickname;
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + personalFollowedInfo.avatar;
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('p')[0].innerHTML = personalFollowedInfo.introduction;
                }).then(() => {
                    var followNormal = document.getElementsByClassName('follow-normal');
                    var followActive = document.getElementsByClassName('follow-active');
                    followNormal[i].onclick = function() {
                        axios.post('http://47.100.42.144:3389/user/subscribeSomeone', {
                            "userId": userId,
                            "subscribeId": personalFollowed[i].subId
                        })
                        followActive[i].style.display = 'block';
                        followNormal[i].style.display = 'none';
                    }
                    followActive[i].onclick = function() {
                        axios.post('http://47.100.42.144:3389/user/cancelSubscribe', {
                            "userId": userId,
                            "subscribeId": personalFollowed[i].subId
                        })
                        followNormal[i].style.display = 'block';
                        followActive[i].style.display = 'none';
                    }

                    var subscribePage = document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('img')[0];
                    subscribePage.onclick = function() {
                        otherId = personalFollowing[i].subId;
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
                })
            }
        }
    })
}
var followedNum = document.getElementsByClassName('followed-num')[0];
var followingNum = document.getElementsByClassName('following-num')[0];


// 关注的人
aboutFollow.onclick = function() {
    empetyBox.style.display = 'none';
    myFollow();
}

follow[0].onclick = function() {
    empetyBox.style.display = 'none';
    myFollow();
}
var personalFollowing;
// 谁关注我
follow[4].onclick = function() {
    personalWritedShow.innerHTML = '';
    var id;
    if (otherId == userId) {
        id = userId;
    } else {
        id = otherId;
    }
    empetyBox.style.display = 'none'
    axios.get('http://47.100.42.144:3389/user/getSubscribeMe', { params: { "userId": id } }).then(res => {
        personalFollowing = res.data.data;
    }).then(() => {
        if (personalFollowing.message == '暂无人关注') {
            empetyBox.style.display = 'block';
        } else {
            for (let i = 0; i < personalFollowing.length; i++) {
                axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                    params: {
                        "userId": personalFollowing[i].subId,
                    }
                }).then(res => {
                    personalFollowedInfo = res.data.data;
                }).then(() => {
                    var li = document.createElement('li');
                    li.innerHTML = '<div class="personal-subscribe"><img src="" alt=""><div class="follow-info"><h3></h3><p></p></div><div class="follow-btns"><button class="follow-normal" style="display: block;">关注</button><button class="follow-active" style="display: none;">已关注</button></div></div></ul>'
                    personalWritedShow.appendChild(li);
                }).then(() => {
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + personalFollowedInfo.avatar;
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('h3')[0].innerHTML = personalFollowedInfo.nickname;
                    document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('p')[0].innerHTML = personalFollowedInfo.introduction;
                }).then(() => {
                    var followNormal = document.getElementsByClassName('follow-normal')[i];
                    var followActive = document.getElementsByClassName('follow-active')[i];

                    var subId = [];
                    for (let i = 0; i < userfollowed.length; i++) {
                        subId.push(userfollowed[i].subId);
                    }
                    if (subId.indexOf(personalFollowing[i].subId) == -1) {
                        followNormal.style.display = 'block';
                        followActive.style.display = 'none';
                    } else {
                        followNormal.style.display = 'none';
                        followActive.style.display = 'block';
                    }

                    followNormal.onclick = function() {
                        axios.post('http://47.100.42.144:3389/user/subscribeSomeone', {
                            "userId": userId,
                            "subscribeId": personalFollowing[i].subId
                        }).then(() => {
                            followActive.style.display = 'block';
                            followNormal.style.display = 'none';
                        })
                    }
                    followActive.onclick = function() {
                        axios.post('http://47.100.42.144:3389/user/cancelSubscribe', {
                            "userId": userId,
                            "subscribeId": personalFollowing[i].subId
                        }).then(() => {
                            followNormal.style.display = 'block';
                            followActive.style.display = 'none';
                        })
                    }
                    var subscribePage = document.getElementsByClassName('personal-subscribe')[i].getElementsByTagName('img')[0];
                    subscribePage.onclick = function() {
                        otherId = personalFollowing[i].subId;
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
                            axios.get('http://47.100.42.144:3389/user/getMySubscribe', { params: { "userId": otherId } }).then(res => {
                                personalFollowed = res.data.data;
                            }).then(() => {
                                if (personalFollowed.message == '暂无关注用户') {
                                    followedNum.innerHTML = 0;
                                } else {
                                    followedNum.innerHTML = personalFollowed.length;
                                }
                            });
                        }).then(() => {
                            axios.get('http://47.100.42.144:3389/user/getSubscribeMe', { params: { "userId": otherId } }).then(res => {
                                personalFollowing = res.data.data;
                            }).then(() => {
                                if (personalFollowing.message == '暂无人关注') {
                                    followingNum.innerHTML = 0;
                                } else {
                                    followingNum.innerHTML = personalFollowing.length;
                                }
                            })
                        }).then(() => {
                            axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', { params: { "userId": otherId } }).then(res => {
                                personalThumbed = res.data.data;
                                if (personalThumbed.message == '暂无点赞文章') {

                                } else {
                                    goodnum.innerHTML = personalThumbed.length + '&#xe600;';
                                    articlesnum.innerHTML = personalThumbed.length;
                                }
                            })
                        })
                    }
                })
            }
        }
    })

}

// 个人信息修改
var editBtn = document.getElementsByClassName('special-edit');
var personalInput = document.getElementsByClassName('personal-input');
var editBack = document.getElementsByClassName('edit-return')[0];

editBack.onclick = function() {
    clearPage();
    personalPage.style.display = 'block';
    personalNav.style.display = 'none';
    getMyArticle();
}

for (let i = 0; i < 2; i++) {
    editBtn[i].onclick = function() {
        var nickname = personalInput[0].value;
        var introduction = personalInput[3].value;
        if (nickname != '' || introduction != '') {
            axios.post('http://47.100.42.144:3389/user/changeUserInfo', { "userId": userId, "nickname": nickname, "introduction": introduction }).then(res => { alert('修改成功') }).catch(err => { alert('修改失败') }).then(axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                params: {
                    'userId': userId,
                }
            }).then(res => {
                userInfo = res.data.data;
            }))
        } else { alert('修改内容不能为空！') }
    }
}

// 换头像
var addfile = document.getElementsByClassName('addfile')[0];
var form = document.getElementById('edit-form');

addfile.onchange = function() {
    var formdata = new FormData();
    file = addfile.files[0];
    formdata.append('avatar', file);
    formdata.append('userId', userId);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('http://47.100.42.144:3389/user/changeUserAvatar', formdata, config)
        .then(() => {
            axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                params: {
                    'userId': userId,
                }
            }).then(res => {
                userInfo = res.data.data;
            }).then(() => {
                personalEditImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                personalPageImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                writeImg.src = 'http://47.100.42.144:3389/' + userInfo.avatar;
                personalInfo.getElementsByTagName('img')[0].src = 'http://47.100.42.144:3389/' + userInfo.avatar;
            })
        })
}