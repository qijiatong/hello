<template>
	<view class="content">
	
		<view class="top-bar">
			<view class="top-bar-right"  @tap="toSignUp">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/image/top-center.png" mode=""></image>
		</view>
		
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">hello!欢迎欢迎！热烈欢迎</view>
			<view class="inputs">
				<input type="text" placeholder="用户名/邮箱" class="user" placeholder-style="color:#bbb;font-weight:400" @blur="getUser"/>
				<input type="password" placeholder="密码" class="password" placeholder-style="color:#bbb;font-weight:400" @blur="getPassword">
			</view>
			<view class="tips">输入用户名或密码错误</view>
			</view>
			<view class="submit" @tap="testFun">登录</view>
		
		
		</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				password:''
			}
		},
		methods: {
			// testFun:function(){
			// 	uni.request({
			// 		url:'http://192.168.1.110:3006/test',
			// 		data:{
						
			// 		},
			// 		method:'GET',
			// 		success:(data)=>{
			// 			console.log(data);
			// 		}
			// 	})
			// },
			toSignUp:function(){
				 uni.navigateTo({
				 	url: '../signup/signup'
				 });
				 
			},
			//获取用户名
			getUser:function(e){
				this.user=e.detail.value;
			},
			//获取密码
			getPassword:function(e){
				this.password=e.detail.value;
			},
			//登录提交
			login:function(){
				if(this.user && this.password){
					console.log('提交')
				}
			}
		
		}
	}
</script>

<style lang="scss">
	@import "@/commons/CSS/topbar.scss";
	.logo{
		text-align: center;
		image{
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin:0 auto;
		}
	} 
	.main{
		padding: 0 $uni-spacing-row-lg 120rpx;
		
		.title{
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}
		.slogan{
			font-size: 40rpx;
			color:$uni-text-color-grey;
			height: 56rpx;
		}
		.inputs{
			padding-top: 8rpx;
			input{
				padding-top: 40rpx;
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color:$uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.tips{
			float: left;
			font-size: $uni-font-size-lg;
			color:$uni-color-warning;
			line-height:56rpx;
		}
	}
	.submit{
		margin:0 auto;
		width: 520rpx;
		height: 96rpx;
		background:$uni-color-primary;
		box-shadow: 0rpx 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius: 48rpx;
		font-size:$uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
</style>
