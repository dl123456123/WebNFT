import React, { useState } from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";

const loginAndSignUp = () => {
	const [activeBtn, setActiveBtn] = useState(1);

	const socialImage = [
		{
			social: images.facebook,
			name: "Continue with Facebook",
		},
		{
			social: images.twitter,
			name: "Continue with twitter",
		},
	];
	return (
		<div className={Style.user}>
			<div className={Style.user_img}>
				<Image
					src={images.SignInBanner}
					alt='Hero section'
					className={Style.user_img_img}
				/>
			</div>
			<div className={Style.user_box}>
				<div className={Style.user_box_social}>
					{socialImage.map((el, i) => (
						<div
							key={i + 1}
							onClick={() => setActiveBtn(i + 1)}
							className={`${Style.user_box_social_item} ${
								activeBtn == i + 1 ? Style.active : ""
							}`}>
							<Image
								src={el.social}
								alt={el.name}
								width={30}
								height={30}
								className={Style.user_box_social_item_img}
							/>
							<p>
								<span>{el.name}</span>
							</p>
						</div>
					))}
				</div>
				<p className={Style.user_box_or}>OR</p>

				<div className={Style.user_box_input}>
					<div className={Style.user_box_input_box}>
						<label htmlFor='username'>Username</label>
						<input type='text' placeholder='Username' />
					</div>
					<div className={Style.user_box_input_box}>
						<label htmlFor='email'>Email address</label>
						<input type='email' placeholder='example@emample.com' />
					</div>

					<div className={Style.user_box_input_box}>
						<label
							htmlFor='password'
							className={Style.user_box_input_box_label}>
							<p>Password</p>
						</label>
						<input type='password' />
						<label
							htmlFor='password'
							className={Style.user_box_input_box_label}>
							<p>Confirm Password</p>
						</label>
						<input type='password' />
					</div>
				</div>

				<Button btnName='Create account' classStyle={Style.button} />
				<p>
					<a href='#'>Forget password</a>
				</p>
				<p className={Style.login_box_para}>
					<a href='/login'>You Have A Account?</a>
				</p>
			</div>
		</div>
	);
};

export default loginAndSignUp;
