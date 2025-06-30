<template>
    <view class="item-wrap">
        <view v-if="!showQrCode" class="upload-img-wrap">
            <view class="image-content">
                <view class="img-wrap">
                    <image class="image" :mode="'aspectFit'" :src="imgPath"
                    ></image>
                </view>
            </view>
            <button class="sure-make" type="primary" @click="submit">确定制作</button>
        </view>
        <view v-else class="qrcode-wrap">
            <view class="qrcode-content">
                <view class="code-title">核销码</view>
                <uv-qrcode ref="qrcode" canvas-id="qrcode" :value="qrValue" size="400rpx" :options="options"></uv-qrcode>
                <view class="qrcode-tip">将核销码扣至扫码区，开始制作</view>
            </view>
        </view>
    </view>
</template>
<script>
import uvQrcode from '@/uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.vue';

export default {
    components: {
        uvQrcode
    },
    watch: {
        imgPath(newVal, oldVal) {
            console.log('imgPath changed:', newVal);
            // 这里可以做你需要的处理
        }
    },
    onLoad(query) {
        this.imgPath = decodeURIComponent(query.img || '');
    },
    data() {
        return {
            imgPath: "",
            qrValue: "https://www.baidu.com",
            showQrCode: false,
            options: {
                // useDynamicSize: false,
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
        },
    }
}
</script>
<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    .upload-img-wrap {
        .image-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 400rpx; // 可根据实际图片高度调整
            width: 400rpx;
            margin: 0 auto;

            .img-wrap {
                width: 100%;
                text-align: center;
                margin: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;

                .image {
                    width: 400rpx;
                    height: 400rpx;
                    background-color: #fff;
                    display: block;
                }
            }
        }

        .sure-make {
            width: 400rpx;
            margin: 0 auto 20px auto;
            display: block;
        }

    }

    .qrcode-wrap {
        width: 100%;
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400rpx; // 可根据实际二维码高度调整

        .qrcode-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            .code-title {
                color: #696565;
            }

            .qrcode-tip {
                width: 400rpx;
                text-align: center;
                margin-top: 16rpx;
                font-size: 28rpx;
                color: #333;
            }
        }


    }


}
</style>