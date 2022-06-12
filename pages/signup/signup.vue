<template>
	<view class="content">
	
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/commons/back.png" mode=""></image>
			</view>
			
		</view>
		<view class="logo">
			<image src="../../static/image/top-center.png" mode=""></image>
		</view>
		
		<view class="main">
			<view class="title">注册</view>
			<view class="slogan">hello!欢迎欢迎！热烈欢迎</view>
			<view class="inputs">
				<view class="inputs-div">
					<input type="text" placeholder="请输入名字" class="user" placeholder-style="color:#bbb;font-weight:400" @input="getUser"/>
					<view class="employ" v-if="useremploy">已占用</view>
					<image class="ok" src="../../static/yes.png" alt="" v-if="isuser"></image>
				</view>
				
				<view class="inputs-div">
					<input type="text" placeholder="请输入邮箱" class="email" placeholder-style="color:#bbb;font-weight:400" @input="isEmail">
					<view class="employ" v-if="emailemploy">已占用</view>
					<view class="invalid" v-if="invalid">邮箱无效</view>
					<image class="ok" src="../../static/yes.png" alt="" v-if="isemail"></image>
				</view>
				
				<view class="inputs-div">
					<input :type="type" placeholder="请输入密码" class="password" placeholder-style="color:#bbb;font-weight:400" @input="getPassword">
					<image class="look" :src="lookurl" @tap="looks"></image>

				</view>
				
			</view>
			
			</view>
			<view :class="[{submit:isok},{submit1:!isok}]">注册</view>
		
		
		</view>
</template>

<script>
	export default {
		data() {
			return {
			type:'password',
			isuser:true,  //用户名是否可用
			isemail:true, //邮箱是否正确
			invalid:false,  //邮箱是否可用
			look:false, //是否查看密码
			useremploy:false, //用户名占用
			emailemploy:false,//邮箱占有
			lookurl:"../../static/see.png",
			email:'',//邮箱
			user:'',//用户名
			password:'',//密码
			isok:false,
			}
		},
		methods: {
			looks:function(){
				if(this.look){
					this.type='password';
					this.look=!this.look;
					this.lookurl="../../static/see.png";
					console.log(this.look);
				}
				else{
					this.type='text';
					this.look=!this.look;
					this.lookurl="../../static/nosee.png";
					console.log(this.look);
				}
			},
			//判断邮箱是否符合
			isEmail:function(e){
				let reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
				this.email=e.detail.value;
				if(this.email.length>0){//输入了才做判断
					if(reg.test(this.email)){
						this.invalid=false;
						this.isemail=true;
					}
					else{
						this.invalid=true;
					}
					this.isOk();
				}
				
			},
			backOne:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			//获取用户名
			getUser:function(e){
				this.user=e.detail.value;
				this.isOk();
			},
			//获取密码
			getPassword:function(e){
				this.password=e.detail.value;
				this.isOk();
			},
			//判断是否可注册
			isOk:function(){
				if(this.isuser && this.isemail && this.password.length>5){
					this.isok=true;
					
				}
				else{
					this.isok=false;
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
			.inputs-div{
				position: relative;
				.ok{
					position: absolute;
					right: 0;
					top:76rpx;
					height: 32rpx;
					width: 42rpx;		
					}
				.employ,.invalid{
					position: absolute;
					float:right;
					right: 0;
					top:40rpx;
					font-size: $uni-font-size-lg;
					font-weight: 500;
					color:$uni-color-warning;
					line-height: 88rpx;
				}
				.look{
					position: absolute;
					right: 0;
					top:76rpx;
					height: 40rpx;
					width: 50rpx;	
				}
			}
		}
		
	}
	.submit{
		margin:0 auto;
		width: 520rpx;
		height: 96rpx;
		background:$uni-color-primary;
		box-shadow: 0rpx 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		font-size:$uni-font-size-lg;
		border-radius: 48rpx;
		color:$uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
	.submit1{
		margin:0 auto;
		width: 520rpx;
		height: 96rpx;
		background:rgba(39,40,50,0.2);
		font-size:$uni-font-size-lg;
		border-radius: 48rpx;
		color:$uni-text-color-inverse;
		line-height: 96rpx;
		text-align: center;
	}
</style>
