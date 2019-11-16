// 轮播图组件功能：
// - 自动播放
// - 鼠标移动上图片,停止自动播放,显示按钮
// - 鼠标移动出图片,开始自动播放,隐藏按钮
// - 鼠标移动到小圆点,切换图片
// - 点击按钮,切换图片

// 用一个开关来控制定时器
let pause = false

const showImageAtIndex = (slide, index) => {
    removeClassAll('slide-active')
    let selector = '#id-img-' + String(index)
    e(selector).classList.add('slide-active')
}

const showIndicatorAtIndex = (index) => {
    removeClassAll('indi-show')
    let selector = '#id-indi-' + String(index)
    e(selector).classList.add('indi-show')
}

const showAtIndex = (slide, index) => {
    showImageAtIndex(slide, index)
    showIndicatorAtIndex(index)
}

const nextIndex = (slide, offset) => {
    let image_number = Number(slide.dataset.image)
    // 获得当前显示图片 id
    let now_active = Number(slide.dataset.active)
    // 计算下一张图片 id
    let next_active = (now_active + offset + image_number) % image_number
    slide.dataset.active = String(next_active)
    return next_active
}

const bindEventSlide = () => {
    let selector = '.slide-button'
    // 点击按钮播放下一张
    bindAll(selector, 'click', function(event) {
        let button = event.target
        let slide = button.closest('.slide')
        let offset = Number(button.dataset.offset)
        let index = nextIndex(slide, offset)
        showAtIndex(slide, index)
    })
}

const bindEventIndicator = () => {
    let selector = '.slide-indi'
    // 鼠标覆盖小圆点自动切换对应图片
    bindAll(selector, 'mouseover', function(event) {
        let indi = event.target
        let slide = indi.closest('.slide')
        let index = indi.dataset.index
        showAtIndex(slide, index)
    })
}

const bindEventButtonShow = () => {
    let slide = e('.slide')
    bindEvent(slide, 'mouseover', function(event) {
        // 暂停自动播放
        pause = true
        // 显示按钮
        removeClassAll('button-none')
    })
}

const bindEventButtonNone = () => {
    let slide = e('.slide')
    bindEvent(slide, 'mouseout', function(event) {
        // 开始自动播放
        pause = false
        // 隐藏按钮
        addClassAll('.slide-button', 'button-none')
    })
}

const bindEvents = () => {
    // slide 事件
    bindEventSlide()
    // 小圆点事件
    bindEventIndicator()
    // 按钮事件
    bindEventButtonShow()
    bindEventButtonNone()
}

const playNextImage = () => {
    if(pause) {
    } else {
        let slide = e('.slide')
        let index = nextIndex(slide, 1)
        showAtIndex(slide, index)
    }
}
// 设置定时器实现自动播放
const autoPlay = () => {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

const __main = () => {
    // 绑定事件
    bindEvents()
    // 自动播放
    autoPlay()

}

__main()