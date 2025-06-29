<template>
	<view class="item-wrap">
        <button type="primary" @click="navClick('./size')">上传印花图</button>
        <!-- <button @click="scanCode()" style="margin-top: 30px;">扫码</button> -->
	</view>
</template>

<script>
export default {
    onLoad(query) {
        console.log(query, "qqqqqqqqqqqqqqqq")
    },
    methods: {
        navClick(url) {
            uni.navigateTo({
                url
            })
        },
        scanCode() {
            uni.scanCode({
                success: (res) => {
                    console.log('扫码结果：', res);
                    // 扫码成功后获取的结果
                    const scanResult = res.result;
                    console.log('扫码内容：', scanResult);
                    uni.showToast({
                        title: `扫码成功：${scanResult}`,
                        icon: 'success',
                        duration: 2000
                    });
                },
                fail: (err) => {
                    console.error('扫码失败：', err);
                    uni.showToast({
                        title: '扫码失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    margin: 50% auto 0;
}

.title {
    text-align: center;
    font-weight: bold;
    line-height: 100rpx;
    background-color: #f5f5f5;
}

.nav-item {
    position: relative;
    line-height: 100rpx;
    padding: 0 30rpx;
    border-bottom: 1px solid #f5f5f5;

    &:after {
        position: absolute;
        top: 50%;
        z-index: 9;
        content: " ";
        height: 16rpx;
        width: 16rpx;
        border-width: 1px 1px 0 0;
        border-color: $uni-text-color-grey;
        border-style: solid;
        transform: translateY(-50%) rotate(45deg);
        right: $uni-spacing-row-lg;
        border-radius: 1px;
    }
}
</style>
