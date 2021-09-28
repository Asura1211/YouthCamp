class Carousel {
    constructor(option) {
        let { imgList } = option;
        for (let s in option) {
            this[s] = option[s];
        }
        this.x = 0; // 当前幻灯片的横轴位置
        this.startX = 0; // 开始滑动时，幻灯片的位置
        this.isMove = false; // 当用户进行左右滑动时，才进行幻灯片移动
        this.viewWidth = imgList.parentNode.clientWidth; // 移动窗口的大小
        this.index = 0; // 当前应该选中第几张图

        enableGesture(imgList);
        this.initLayout();

        this.imgsLen = this.imgList.children.length; //当前图片个数（包括无缝添加的两张!!）
        imgList.addEventListener("start", (e) => {
            this.start(e);
        });
        imgList.addEventListener("panstart", (e) => {
            this.panstart(e);
        });
        imgList.addEventListener("pan", (e) => {
            this.pan(e);
        });
        imgList.addEventListener("panend", (e) => {
            this.panend(e);
        });
        imgList.addEventListener("end", (e) => {
            this.panend(e);
            this.autoPalyer();
        });
        this.autoPalyer();
    }
    //修改布局以实现无缝轮播
    initLayout() {
        let imgs = this.imgList.children;
        let firstImg = imgs[0];
        let lastImg = imgs[imgs.length - 1];
        this.imgList.insertBefore(lastImg.cloneNode(true), firstImg);
        this.imgList.appendChild(firstImg.cloneNode(true));
        this.x = -this.viewWidth;
        this.index = 1;
        this.setTransfrom();
    }
    //调整布局以完成无缝轮播
    resetLayout() {
        let disX = -this.index * this.viewWidth - this.x;
        if (this.index === 0) {
            this.index = this.imgsLen - 2;
        } else if (this.index === this.imgsLen - 1) {
            this.index = 1;
        }
        this.x = -this.index * this.viewWidth - disX;
        this.setTransfrom();
    }
    //按下
    start(e) {
        clearInterval(this.animateTimer);
        clearInterval(this.autoTimer);
    }
    //首次滑动方向即用户想要进行滑动的方向，防止即左右滑动又上下滚动
    panstart(e) {
        let disX = e.clientX - e.startX;
        let disY = e.clientY - e.startY;
        // 最左和最右图片判断
        if (this.index === 0 || this.index === this.imgsLen - 1) {
            this.resetLayout();
        }
        // 通过用户左右滑动距离绝对值判断选择
        if (Math.abs(disX) > Math.abs(disY)) {
            this.isMove = true;
            // 在 gesture 中的 move 封装 stop 事件，不能直接 e.preventDefault，因为 e 不是图片元素
            e.stop();
        } else {
            this.isMove = false;
        }
        this.startX = this.x;
    }

    pan(e) {
        if (this.isMove) {
            let disX = e.clientX - e.startX;
            this.x = this.startX + disX;
            this.setTransfrom();
            e.stop();
        }
    }
    panend() {
        this.index = Math.round(-this.x / this.viewWidth);
        let targetX = -this.index * this.viewWidth;
        this.animate(targetX);
        this.setNavs();
    }
    //同步标识位置
    setNavs() {
        this.navs.forEach((item) => (item.className = ""));
        const nowIndex = this.index === 0 ? this.navs.length - 1 : (this.index - 1) % this.navs.length;
        this.navs[nowIndex].className = "active";
    }
    setTransfrom() {
        this.imgList.style.transform = `translate3d(${this.x}px,0,0)`;
    }
    animate(targetX) {
        if (Math.abs(targetX - this.x) < 20) {
            this.x = targetX;
            this.setTransfrom();
        } else {
            // 执行动画
            let interval = 1000 / 60; // 动画执行间隔
            let t = 0; // 当前执行次数
            let b = this.x;
            let c = targetX - this.x;
            let time = Math.min(Math.abs(c), 500); // 动画持续的毫秒数
            let d = Math.ceil(time / interval); // 总次数
            clearInterval(this.animateTimer);
            this.animateTimer = setInterval(() => {
                t++;
                if (t >= d) {
                    clearInterval(this.animateTimer);
                }
                this.x = this.easeOut(t, b, c, d);
                this.setTransfrom();
            }, interval);
        }
    }
    // tween 动画算法
    /*
    t: current time（当前时间）；
    b: beginning value（初始值）；
    c: change in value（变化量）；
    d: duration（持续时间）。
    */
    easeOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }
    //自动播放
    autoPalyer() {
        clearInterval(this.autoTimer);
        this.autoTimer = setInterval(() => {
            if (this.index === this.imgsLen - 1) {
                this.resetLayout();
            }
            this.index++;
            this.animate(-this.index * this.viewWidth);
            this.setNavs();
        }, 3000);
    }
}
