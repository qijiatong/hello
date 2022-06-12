<template>
	<view class="content">
		
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/commons/back.png" mode="" ></image>
			</view>
			<view class="top-bar-center top-bar-title">详情</view>
		</view>
		
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">头像</view>
					<view class="cont">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" @tap="upload" mode="aspectFill"  class="user-img"></image>
					</view>
					<view class="more">
						<image src="../../static/next.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" @tap="modify('签名',dataarr.sign,false)">
					<view class="title">签名</view>
					<view class="cont">
						{{dataarr.sign}}
					</view>
					<view class="more" >
						<image src="../../static/next.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">注册</view>
					<view class="cont">
						{{changeTime(dataarr.time)}}
					</view>
					
				</view>
			</view>
			
			<view class="column heads">
			<view class="row" @tap="modify('昵称',dataarr.name,false)">
				<view class="title" >昵称</view>
				<view class="cont">{{dataarr.name}}</view>
				<view class="more" >
					<image src="../../static/next.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="row">
				<view class="title">性别</view>
				<view class="cont">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<view class="more">
					<image src="../../static/next.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="row">
				<view class="title">生日</view>
				<view class="cont">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="more">
					<image src="../../static/next.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="row" @tap="modify('电话',dataarr.tell,false)">
				<view class="title">电话</view>
				<view class="cont">{{dataarr.tell}}</view>
				<view class="more">
					<image src="../../static/next.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="row" @tap="modify('邮箱',dataarr.mail,false)">
				<view class="title">邮箱</view>
				<view class="cont">{{dataarr.mail}}</view>
				<view class="more" @tap='modify'>
					<image src="../../static/next.png" mode="aspectFill"></image>
				</view>
			</view>	
			</view>
			
			<view class="column heads">
				<view class="row" @tap="modify('密码',' ',true)">
					<view class="title">密码</view>
					<view class="cont">******** </view>
					<view class="more">
						<image src="../../static/next.png" mode="aspectFill" ></image>
					</view>
				</view>
			</view>
			
			<view class="btn2">退出登录</view>
		</view>	

			
			<view class="modify" :style="{bottom:-widHeight+'px'}" :animation="animationData" >
				<view class="modify-header">
					<view class="close" @tap='modifySubmit'>取消</view>
					<view class="title">签名</view>
					<view class="define" @tap='modifySubmit'>确定</view>
				</view>
				<view class="modify-main">
					<input type="text" v-model="pwd" class="modify-pwd" placeholder="请输入原密码"  placeholder-style="color:#bbb;font-weight:400" :style="{display:isPsw}"></textarea>
					<textarea v-model="data" class="modify-content"></textarea>
				</view>
			
			
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myfun from "@/commons/JS/myfun.js";
	export default {
		data() {
			const currentDate = this.getDate({
			    format: true,
			})
			return {
				//模拟数据
				dataarr:{
					name:'齐珈童',
					sign:'救命啊是不是别人不发火把别人当傻子救命救命',
					time:new Date(),
					sex:'男',
					birth:'2001-04-06',
					tell:'16604370228',
					mail:'943694176@qq.com'
				},
				tempFilePath: '',
				cropFilePath:"../../static/me.png",
				array: ['男', '女', '未知'],
				index: 0,
				date:currentDate,
				heading:'',
				data:'要修改的内容',
				pwd:'',
				animationData:{},//动画
				isModify:false,//动画开关
				widHeight:'',//页面高度
				ModifyTitle:'',//修改标题
				isPsw:'none',//是否需要原密码
			};
		},
		components: {ImageCropper},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		},
		
		methods:{
			//获取页面高度
			getElementStyle:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
				  this.widHeight=data.height;
				}).exec();
			},
			backOne:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.detail.value)
			    this.index = e.detail.value
			},
			bindDateChange: function(e) {
			    this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
		
				if (type === 'start') {
					year = year - 60;
				} 
				else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onReady:function(){
				this.getElementStyle();
			},
			upload() {
			    uni.chooseImage({
			        count: 1, //默认9
			        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			        sourceType: ['album','camera'], //从相册选择
			        success: (res) => {
			            this.tempFilePath = res.tempFilePaths.shift()
			        }
			    });
			},
			confirm(e) {
			      this.tempFilePath = "";
			      this.cropFilePath = e.detail.tempFilePath;
			
			      // #ifdef APP-PLUS||MP
			      //除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
			      //按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
			      //待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
			
			      uni.uploadFile({
			        url: "后端地址上传图片接口地址",
			        filePath: this.cropFilePath,
			        name: "file",
			        fileType: "image",
			        //formData:{},传递参数
			        success: (uploadFileRes) => {
			          var backstr = uploadFileRes.data;
			          //自定义操作
			        },
			
			        fail(e) {
			          console.log("this is errormes " + e.message);
			        },
			      });
			
			      // #endif
			    },
			    cancel() {
			      console.log("canceled");
			      this.tempFilePath = "";
			    },
				//修改项弹框
				modify:function(type,data,isPsw){
					this.isPsw=isPsw;
					if(isPsw){
						this.isPsw='block';
					}
					else{
						this.isPsw='none';
					}
					this.ModifyTitle=type;
					this.data=data;
					this.isModify=!this.isModify;
					var animation = uni.createAnimation({
					      duration: 300,
					        timingFunction: 'ease',
					})
					if(this.isModify){
						animation.bottom(0).step();
					}
					else{
						animation.bottom(-this.widHeight).step();
					}
					this.animationData = animation.export();
				},
				//弹框修改确定
				modifySubmit:function(){
					this.modify();
				},
				//时间处理
				changeTime:function(date){
					return myfun.detailTime(date);
				}
		
		}
	}
</script>

<style lang="scss">
	@import "@/commons/CSS/topbar.scss";
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom:1px solid $uni-border-color;
	}
	.top-bar-title{
		font-size: 40rpx;
		text-align: center;
		line-height: 88rpx;
		font-weight: 400;
	}
	.main{
		padding-top: 118rpx;
		display: flex;
		flex-direction:column;
		.column{
			display: flex;
			flex-direction:column;
			border-bottom:1px solid $uni-border-color;
			padding-top: 12rpx;
			width: 100%;
			.row{
				display: flex;
				flex-direction:row;
			}
			.title{
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size:$uni-font-size-lg;
				color:$uni-text-color;
				line-height: 112rpx;
			}
			.head{
				height: 148rpx;
				display: flex;
				align-items: center;
			}
			.user-img{
				
				width: $uni-img-size-lg;
				height:$uni-img-size-lg;
				border-radius:$uni-border-radius-base;
			}
			.cont{
				display: flex;
				align-items: center;
				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				min-width:0;

				span{
					white-space: nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
				}
			}
			.more{
				flex:none;
				height: 112rpx;
				display: flex;
				align-items: center;
				image{
					width: 80rpx;
					height: 28rpx;
				}
			}
		}
		
	}
	.btn2{
		margin-top:160rpx;
		text-align: center;
		font-size: $uni-font-size-lg;
		color:$uni-color-warning;
		line-height: 88rpx;
	}
	
	.modify{
		position: fixed;
		z-index: 1002;
		left:0;
		height: 100%;
		width: 100%;
		background-color: #fff;
		.modify-header{
			width: 100%;
			height: 88rpx;
			padding-top: -var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom:1px solid $uni-border-color;
			.close{
				padding-left: $uni-spacing-col-base;
				font-size:$uni-font-size-lg;
				color:$uni-text-color;
				line-height: 44rpx;
			}
			.title{
				flex:auto;
				text-align: center;
				font-size:40rpx;
				color:$uni-text-color;
				line-height: 88rpx;
			}
			.define{
				padding-right:$uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color:$uni-color-success;
				line-height: 44rpx;
			}
		}
		.modify-main{
			display: flex;
			padding: $uni-spacing-col-base;
			flex-direction: column;
			.modify-pwd{
				
				margin-bottom: $uni-spacing-col-base;
				width: 100%;
				height: 88rpx;
				box-sizing: border-box;
				background:$uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size:$uni-font-size-lg;
				color:$uni-text-color;
				line-height: 88rpx;
				padding: 0 20rpx;
				flex: auto;
				
			}
			.modify-content{
				width: 686rpx;
				box-sizing: border-box;
				height: 386rpx;
				padding: 16rpx 20rpx;
				flex: auto;
				background:$uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size:$uni-font-size-lg;
				color:$uni-text-color;
				line-height: 44rpx;
			}
		}
		
	}
</style>
