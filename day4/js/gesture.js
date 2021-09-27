// start、move、end //兼容 touch 和 move
// pressstart\pressend
// tap
// panstart\pan\panend

function enableGesture(ele) {
    // 通过 contexts 标识类型以及其他
    let contexts = {};
    const MOUSE_TYPE = Symbol("mouse");

    // PC 端
    if (!("ontouchstart" in document)) {
        ele.addEventListener("mousedown", (e) => {
            contexts[MOUSE_TYPE] = {};
            onStart(e, contexts[MOUSE_TYPE]);
            let move = (e) => {
                const stop = () => {
                    event.preventDefault();
                };
                contexts[MOUSE_TYPE].stop = stop;
                onMove(e, contexts[MOUSE_TYPE]);
            };
            let end = (e) => {
                onEnd(e, contexts[MOUSE_TYPE]);
                document.removeEventListener("mousemove", move);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", end, { once: true });
        });
    }

    ele.addEventListener("touchstart", (e) => {
        // 移动端通过 touch.identifier 标识触发事件的是哪一根手指
        for (let touch of e.changedTouches) {
            contexts[touch.identifier] = {};
            onStart(touch, contexts[touch.identifier]);
        }
    });
    ele.addEventListener("touchmove", (e) => {
        const stop = () => {
            e.preventDefault();
        };
        for (let touch of e.changedTouches) {
            contexts[touch.identifier].stop = stop;
            onMove(touch, contexts[touch.identifier]);
        }
    });
    ele.addEventListener("touchend", (e) => {
        for (let touch of e.changedTouches) {
            onEnd(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });

    let onStart = (e, contexts) => {
        ele.dispatchEvent(
            Object.assign(new CustomEvent("start"), {
                clientX: e.clientX,
                clientY: e.clientY,
            })
        );
        // 按下时默认想 tap
        contexts.isTap = true;
        contexts.startX = e.clientX;
        contexts.startY = e.clientY;
        clearTimeout(contexts.timeout);
        // 500ms 后想长按
        contexts.timeout = setTimeout(() => {
            contexts.isTap = false;
            // 长按
            contexts.isPress = true;
            ele.dispatchEvent(
                Object.assign(new CustomEvent("pressstart"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                })
            );
        }, 500);
    };

    let onMove = (e, contexts) => {
        let dx = e.clientX - contexts.startX;
        let dy = e.clientY - contexts.startY;

        ele.dispatchEvent(
            Object.assign(new CustomEvent("move"), {
                clientX: e.clientX,
                clientY: e.clientY,
            })
        );

        // 发生 pan 滑屏
        if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {
            contexts.isPan = true;
            // 如果是长按
            if (contexts.isPress) {
                ele.dispatchEvent(
                    Object.assign(new CustomEvent("presscancel"), {
                        clientX: e.clientX,
                        clientY: e.clientY,
                    })
                );
            }
            // 发生滑屏后就不是长按
            clearTimeout(contexts.timeout);
            contexts.isTap = false;
            contexts.isPress = false;
            ele.dispatchEvent(
                Object.assign(new CustomEvent("panstart"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    startX: contexts.startX,
                    startY: contexts.startY,
                    stop: contexts.stop,
                })
            );
            // 防止同时执行
            return;
        }

        if (contexts.isPan) {
            ele.dispatchEvent(
                Object.assign(new CustomEvent("pan"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    startX: contexts.startX,
                    startY: contexts.startY,
                    stop: contexts.stop,
                })
            );
        }
    };

    let onEnd = (e, contexts) => {
        clearTimeout(contexts.timeout);
        if (contexts.isPan) {
            ele.dispatchEvent(
                Object.assign(new CustomEvent("panend"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    startX: contexts.startX,
                    startY: contexts.startY,
                })
            );
            contexts.isPan = false;
        }

        if (contexts.isTap) {
            ele.dispatchEvent(
                Object.assign(new CustomEvent("tap"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                })
            );
            contexts.isTap = false;
        }

        if (contexts.isPress) {
            ele.dispatchEvent(
                Object.assign(new CustomEvent("pressend"), {
                    clientX: e.clientX,
                    clientY: e.clientY,
                })
            );
            contexts.isPress = false;
        }

        ele.dispatchEvent(
            Object.assign(new CustomEvent("end"), {
                clientX: e.clientX,
                clientY: e.clientY,
            })
        );
    };
}
