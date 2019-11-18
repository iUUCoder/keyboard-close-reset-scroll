// 滚动时间间隔
var TIME_INTERVAL = 1;

/**
 * 键盘回收复位滚动模块
 * 作用：iOS 弹出键盘可能会把整个页面向上顶，并且键盘收起的时候不会自动复位
 *      此模块则是监听了键盘收起事件，手动进行复位，避免页面错位问题
 */
function KCRS() {
    // 是否需要处理滚动
    this._needReset = false;

    // 是否处于 iOS 环境
    this._isIOS = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 键盘展开的处理方法
    this._focusinHandler = function () {
        this._needReset = false;
    };

    // 键盘收起的处理方法
    this._focusoutHandler = function () {
        var self = this;
        var top = document.documentElement.scrollTop || document.body.scrollTop || 0;
        var left = document.documentElement.scrollLeft || document.body.scrollLeft || 0;

        this._needReset = true;
        setTimeout(function () {
            // 当焦点在输入框之间切换时先处理
            if (self._needReset) {
                
                // 上下滚动 1px
                window.scrollTo(left, top + 1);
                setTimeout(function () {
                    window.scrollTo(left, top - 1)

                    // 恢复到原位置
                    setTimeout(function () {
                        window.scrollTo(left, top);
                        self._needReset = false;
                    }, TIME_INTERVAL);
                }, TIME_INTERVAL);
            }
        }, 300);
    };
}

/**
 * 模块初始化
 * 添加事件监听
 * @returns {boolean} 初始化结果
 */
KCRS.prototype.init = function () {
    // 非 iOS 设备，无需处理此问题
    if (!this._isIOS) return true;

    // 添加事件监听
    if (typeof this._focusinHandler === 'function' && typeof this._focusoutHandler === 'function') {
        document.body.addEventListener('focusin', this._focusinHandler);
        document.body.addEventListener('focusout', this._focusoutHandler);
        return true;
    }

    return false;
}

/**
 * 模块注销
 * 取消事件监听
 */
KCRS.prototype.destroy = function () {
    // 取消事件监听
    if (this._isIOS) {
        if (typeof this._focusinHandler === 'function') {
            document.body.removeEventListener('focusin', this._focusinHandler);
        }
        if (typeof this._focusoutHandler === 'function') {
            document.body.removeEventListener('focusout', this._focusoutHandler);
        }
    }
}

/**
 * 导出模块
 */
module.exports = new KCRS();