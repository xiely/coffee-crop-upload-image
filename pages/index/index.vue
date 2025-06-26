<template>
	<view class="item-wrap">
        <button type="primary" @click="navClick('./size')">上传印花图</button>
	</view>
</template>

<script>
export default {
    methods: {
        navClick(url) {
            uni.navigateTo({
                url
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    margin: 100rpx auto 0;
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
