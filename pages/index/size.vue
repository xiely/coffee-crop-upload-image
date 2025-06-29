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
            uni.uploadFile({
                // #ifdef H5
                url: "/gw/v1/uploadImage",
                // #endif
                // #ifndef H5
                url: "https://coffee.htcbot.com/gw/v1/uploadImage",
                // #endif
                filePath: e.tempFilePath,
                name: 'file',
                header: {
                    // 这里可以添加自定义header，比如token
                    'Authorization': getToken(),
                },
                fileType: "image",
                success: uploadFileRes => {
                    // this.url = XXX;(后端传回来的图片地址)
                    console.log(uploadFileRes.data, "DDDDDDDDDDDDDDDD")
                    let data = JSON.parse(uploadFileRes.data)
                    console.log(data.success, "DDDDDDDDDD")
                    if (data.success) {
                        this.url = data.data
                        // console.log(data.data);
                        // uni.navigateTo({
                        //     url: './index'
                        // });
                        uni.showToast({
                            title: "上传成功",
                            icon: "none",
                            duration: 4000
                        });
                        uni.navigateTo({
                            url: '/pages/index/confirm?img=' + encodeURIComponent(this.url)
                        })
                    }
                    else {
                        uni.showToast({
                            title: `${data.message}`,
                            icon: "none",
                            duration: 2000
                        });
                    }

                },
                fail: (error) => {
                    uni.hideLoading();
                    console.error('error', error);
                }
            });

        }
    }
}
</script>

<style></style>
