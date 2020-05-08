//尝试创建一个可以执行简单动画的函数
/* 
参数：
    obj：要执行动画的对象
    attr：要执行的样式，比如 left top
    target：执行动画的目标位置
    speed：移动的速度
    callback：回调函数，将会在动画完毕后执行
 */
function move(obj, attr, target, speed, callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);

    //判断速度的正负值
    var current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }

    //开启定时器
    //向执行动画的对象添加timer属性用来保存属于他自己的标识
    obj.timer = setInterval(function () {
        //获取原来的left值
        var oldValue = parseInt(getStyle(obj, attr));

        //旧值的基础上增加
        var newValue = oldValue + speed;

        //判断newValue
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        //赋值
        obj.style[attr] = newValue + 'px';

        //停止执行
        if (newValue == target) {
            clearInterval(obj.timer);

            //动画执行完毕，调用回调函数
            callback && callback();
        }

    }, (30));


}
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}

//函数：用来向一个元素中添加指定的class属性值
/* 
参数：
    - obj 要添加class属性的元素
    - cn 要添加的class值
*/
function addClass(obj, cn) {
    //检查obj中是否含有cn
    if (!hasClass(obj, cn)) {
        obj.className += ' ' + cn;
    }
}

//判断一个元素是否有指定的class属性值
function hasClass(obj, cn) {
    //判断obj中有没有cn class
    // var reg=/\bb2\b/;
    var reg = new RegExp('\\b' + cn + '\\b');
    return reg.test(obj.className);
}

//删除指定的class属性
function removeClass(obj, cn) {
    var reg = new RegExp('\\b' + cn + '\\b');
    obj.className = obj.className.replace(reg, '');
}

/* 
toggleClass可以用来切换一个类
    有则删除
    没则添加
*/
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}