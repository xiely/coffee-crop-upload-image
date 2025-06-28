<template>
    <view class="item-wrap">
        <view class="image-content">
            <view class="img-wrap">
                <image style="width: 400rpx; height: 400rpx; background-color: #fff;" :mode="'aspectFit'" :src="imgPath"
                ></image>
            </view>
        </view>
        <button type="primary" @click="submit">确定制作</button>
    </view>
</template>
<script>
import { checkCode, login } from '../../api'
export default {
    onLoad(query) {
        this.imgPath = decodeURIComponent(query.img || '');
        console.log(this.imgPath, "imgPath")
    },
    data() {
        return {
            imgPath: "",
        }
    },
    methods: {
        submit() { }

    }
}
</script>
<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    margin: 0 auto;
    text-align: center;

    .img-wrap {
        width: 100%;
        text-align: center;
        margin: 20px
    }

    .input-wrap {
        margin: 30rpx 0;
    }
}
</style>