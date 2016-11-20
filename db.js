/**
 * Created by renxi on 2016/11/19.
 */
var mongojs = require('mongojs');
var db = mongojs('zhihuazhang:p821161102@happyCoupon.zhihuazhang.net/presentchat',
    ['users', 'events', 'messages', 'devices','presents']);
db.users.find(function (err,docs) {
})




module.exports = {
    db: db,
    mongojs: mongojs
}
