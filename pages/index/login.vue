<template>
	<view class="item-wrap">
        <!-- <view>请输入您的制作码</view>
        <view class="input-wrap">
             <uni-easyinput v-model="code"  placeholder="例如： 9523" :styles="styles"></uni-easyinput>
        </view>
        <button v-if="code !== '' && code !== undefined" type="primary" @click="submit" class="btn">确定</button> -->
        <button v-if="!getFailed && !getOrderFailed" type="primary" @click="navClick('./size')">上传印花图</button>
        <!-- <button type="primary" @click="scanCode">扫码</button> -->
	</view>
</template>

<script>
import { checkCode, random, orderId } from '../../api'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
    onLoad(query) {
        this.token = decodeURIComponent(query.scene);
        if (!this.token) {
            this.$forceUpdate();
        }
        console.log(query, "query")
        console.log(this.token, "token")
        // this.token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicGxhdGZvcm0iOiJjb2ZmZWVfYWRtaW5fIiwiaWF0IjoxNzUxMzY3MzQxLCJleHAiOjE3NTEzNzA5NDF9.SrSupBWciimAL89fp1O9hHijnlxFrVYRfROYQ3Fm7NA"
    },
    data() {
        return {
            code: "",
            randomId: "",
            token: "",
            orderSubId: "",
            getFailed: false,
            getOrderFailed: false,
            styles: {
                borderRadios: '20px'
            },
        }
    },
    methods: {
        navClick(url) {
            uni.navigateTo({
                url
            })
        },
        submit() {
            if (this.code == undefined || this.code == '' || this.code == null) {
                uni.showToast({
                    title: '请输入制作码',
                    icon: "none",
                });
                return;
            }
            let data = {
                code: this.code
            }
            uni.navigateTo({
                url: '/pages/index/index'
            })
            return;
            // console.log("AAAAAAAAAAAAAAAAAAAAAA")
            checkCode(data).then((res) => {
                console.log(res, "res")
                if (res.status == 200) {
                    uni.navigateTo({
                        url: '/pages/index/index?scene=aaaa'
                    })
                }
                else {
                    uni.showToast({
                        title: '制作码有误',
                        icon: "none",
                    });
                }

            }).catch((err) => {
                console.log(err, "Er")
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
        },
        async getRandom() {
            this.getFailed = false;
            let data = {
                accessId: "OPEN"
            }
            try {
                const res = await random(data);
                this.randomId = res.data;
                // console.log(res, "RRRRRRRRR")
                uni.setStorageSync("random", res.data)
            } catch (err) {
                this.getFailed = true;
                uni.showToast({
                    title: err,
                    icon: 'none',
                    duration: 2000
                });
                console.error('getRandom error', err);
            }
        },
        async getOrderId() {
            this.getOrderFailed = false;
            let data = {
                snToken: this.token,
                randomId: this.randomId
            }
            try {
                const res = await orderId(data);
                this.orderSubId = res.data.orderSubId;
                getApp().globalData.randomId = this.randomId || "aa";
                getApp().globalData.token = this.token || "BB";
                getApp().globalData.orderSubId = this.orderSubId || "CC";
                console.log(this.orderSubId, "orderSubId")
            } catch (err) {
                console.error('getOrderId error', err);
                this.getOrderFailed = true;
                uni.showToast({
                    title: err,
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    },
    async created() {
        uni.showLoading({ title: '获取数据中...', mask: true });
        await this.getRandom();
        await this.getOrderId();
        uni.hideLoading();
    }
}
</script>

<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    min-height: 80vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .input-wrap {
        margin: 30rpx 0;
        width: 100%;
    }

    .btn {
        width: 100%;
    }
}
</style>
