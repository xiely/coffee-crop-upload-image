<template>
	<view>
		<qf-image-cropper :width="400" :height="400" fileType="png" @crop="handleCrop"></qf-image-cropper>
	</view>
</template>

<script>
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue';
export default {
    components: {
        QfImageCropper
    },
    methods: {
        handleCrop(e) {
            console.log(e.tempFilePath, "e.tempFilePath")
            uni.uploadFile({
                // #ifdef H5
                url: "/gw/v1/uploadImage",
                // #endif
                // #ifndef H5
                url: "http://coffee.htcbot.com/gw/v1/uploadImage",
                // #endif
                filePath: e.tempFilePath,
                name: 'file',
                header: {
                    // 这里可以添加自定义header，比如token
                    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MCIsInBsYXRmb3JtIjoiY29mZmVlX2FkbWluXyIsImlhdCI6MTc1MDkxNzI3OSwiZXhwIjoxNzUwOTIwODc5fQ.WSlFDcvcK4NNvHckfRQPEGS2i2gjqUt4fPxsRaejZfw',
                },
                fileType: "image",
                success: uploadFileRes => {
                    // this.url = XXX;(后端传回来的图片地址)
                    let data = JSON.parse(uploadFileRes.data)
                    console.log(data.success, "DDDDDDDDDD")
                    if (data.success) {
                        // this.url = data.data
                        // console.log(data.data);
                        uni.showToast({
                            title: "上传成功",
                            icon: "none",
                        });
                    }
                    else {
                        // uni.showToast({
                        //     title: `${data.message}`,
                        //     icon: "none",
                        // });
                    }

                },
                fail: (error) => {
                    uni.hideLoading();
                    console.error('error', error);
                }
            });
            // uni.previewImage({
            //     urls: [e.tempFilePath],
            //     current: 0
            // });
        }
    }
}
</script>

<style></style>
