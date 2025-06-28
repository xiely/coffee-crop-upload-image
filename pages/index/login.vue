<template>
	<view class="item-wrap">
        <view>请输入您的制作码</view>
        <view class="input-wrap">
             <uni-easyinput v-model="code"  placeholder="例如： 9523" :styles="styles"></uni-easyinput>
        </view>
        <button v-if="code !== '' && code !== undefined" type="primary" @click="submit">确定</button>
	</view>
</template>

<script>
import { checkCode, login } from '../../api'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
    onLoad(query) {
        // this.userLogin();
    },
    data() {
        return {
            code: "",
            styles: {
                borderRadios: '20px'
            }
        }
    },
    methods: {
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
                        url: '/pages/index/index'
                    })
                }

            }).catch((err) => {
                console.log(err, "Er")
            })
        },
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
        },
        // userLogin() {
        //     let data = { "account": "xly@qq.com", "password": "htyj-coffee", "platform": "admin" }
        //     login(data).then(res => {
        //         console.log(res, "RRRRRRRRRRRRRRR")
        //     })
        // },
    }
}
</script>

<style lang="scss" scoped>
.item-wrap {
    width: 80%;
    margin: 100rpx auto 0;
    text-align: center;

    .input-wrap {
        margin: 30rpx 0;
    }
}
</style>
