<template>
    <view class="item-wrap">
        <view v-if="!showQrCode" >
            <view class="image-content">
                <view class="img-wrap">
                    <image style="width: 400rpx; height: 400rpx; background-color: #fff;" :mode="'aspectFit'" :src="imgPath"
                    ></image>
                </view>
            </view>
            <button type="primary" @click="submit">确定制作</button>
        </view>
        <view class="qrcode-wrap" v-else>
            <view class="qrcode-content">
                <view class="code-title">核销码</view>
                <uv-qrcode ref="qrcode" canvas-id="qrcode" :value="qrValue" size="300rpx" :options="options"></uv-qrcode>
                <view>将核销码扣至扫码区，开始制作</view>
            </view>
        </view>
    </view>
</template>
<script>
import uvQrcode from '@/uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.vue';

export default {
    onLoad(query) {
        this.imgPath = decodeURIComponent(query.img || '');
        console.log(this.imgPath, "imgPath")
    },
    data() {
        return {
            imgPath: "",
            qrValue: "http://www.baidu.com",
            showQrCode: false,
            options: {
                useDynamicSize: false,
                errorCorrectLevel: 'Q',
                margin: 10,
                areaColor: "#fff",
                // 指定二维码前景，一般可在中间放logo
                // foregroundImageSrc: require('static/image/logo.png')
            }

        }
    },
    methods: {
        submit() {
            this.showQrCode = true;
        }

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

    .qrcode-wrap {
        width: 100%;
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400rpx; // 可根据实际二维码高度调整

        .code-title {
            color: #696565;
        }
    }
}
</style>