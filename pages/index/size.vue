<template>
	<view>
		<qf-image-cropper :width="400" :height="400" fileType="png" @crop="handleCrop"></qf-image-cropper>
	</view>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth';
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue';
export default {
    components: {
        QfImageCropper
    },
    methods: {
        handleCrop(e) {
            if (!e.tempFilePath) {
                uni.showToast({
                    title: "未获取到图片路径",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            uni.uploadFile({
                // #ifdef H5
                url: "/gw/v1/uploadPattern",
                // #endif
                // #ifndef H5
                url: "https://coffee.htcbot.com/gw/v1/uploadPattern",
                // #endif
                filePath: e.tempFilePath,
                name: 'file',
                // header: {
                //     // 这里可以添加自定义header，比如token
                //     'Authorization': getToken(),
                // },
                fileType: "image",
                success: (uploadFileRes) => {
                    let data;
                    try {
                        data = JSON.parse(uploadFileRes.data);
                    } catch (err) {
                        uni.showToast({
                            title: "返回数据格式错误",
                            icon: "none",
                            duration: 4000
                        });
                        return;
                    }
                    if (data.success) {
                        this.url = data.data;
                        uni.showToast({
                            title: "上传成功",
                            icon: "none",
                            duration: 8000
                        });
                        uni.navigateTo({
                            url: '/pages/index/confirm?img=' + encodeURIComponent(this.url)
                        });
                    } else {
                        const message = data.message || "上传失败";
                        uni.showToast({
                            title: message,
                            icon: "none",
                            duration: 4000
                        });
                    }

                },
                fail: (error) => {
                    uni.showToast({
                        title: "上传失败",
                        icon: "none",
                        duration: 4000
                    });
                    uni.hideLoading();
                    console.error('error', error);
                },
                complete: (aaaa) => {
                    // uni.showToast({
                    //     title: "complete",
                    //     icon: "none",
                    //     duration: 4000
                    // });
                }
            });

        }
    }
}
</script>

<style></style>
