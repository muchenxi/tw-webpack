console.log('hello webpack')
let inner = document.querySelector('.inner')
let outer = document.querySelector('.outer')

// 监听outer元素的attribute变化
new MutationObserver(function () {
    console.log('mutate')
}).observe(outer, {
    attributes: true
})

// click监听事件
function onClick() {
    console.log('click')

    setTimeout(function () {
        console.log('timeout')
    }, 0)

    Promise.resolve().then(function () {
        console.log('promise')
    })

    outer.setAttribute('data-random', Math.random())
}

inner.addEventListener('click', onClick)