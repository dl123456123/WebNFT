import React from "react";
import Image from "next/image";

import Style from "./ArtistInfo.module.css";
import Button from "../../components/Button/Button";

import image from "../../img";

const ArtistInf = () => {
	return (
		<div className={Style.ArtistInfo}>
			<div className={Style.ArtistInfo_box}>
				<div className={Style.ArtistInfo_box_avatar}>
					<Image
						src={image.artistAvatar}
						width={120}
						height={120}
						className={Style.ArtistInfo_box_avatar_img}
					/>
				</div>
				<div className={Style.ArtistInfo_box_title}>
					<h1 className={Style.ArtistInfo_box_title_name}>AnimaKid</h1>
					<div className={Style.ArtistInfo_box_title_button}>
						<button className={Style.ArtistInfo_box_title_button_box_1}>
							<Image src={image.Copy} />
							<span>gawhawhawhawhaw</span>
						</button>
						<button className={Style.ArtistInfo_box_title_button_box_2}>
							<Image src={image.Plus} />
							<span>Follow</span>
						</button>
					</div>
				</div>
				<div className={Style.ArtistInfo_box_status}>
					<div className={Style.ArtistInfo_box_status_box}>
						<h2>250k+</h2>
						<span>Volume</span>
					</div>
					<div className={Style.ArtistInfo_box_status_box}>
						<h2>50</h2>
						<span>NFTs Sold</span>
					</div>
					<div className={Style.ArtistInfo_box_status_box}>
						<h2>3000+</h2>
						<span>Followers</span>
					</div>
				</div>
				<div className={Style.ArtistInfo_box_bio}>
					<h3 className={Style.ArtistInfo_box_bio_title}>Bio</h3>
					<p className={Style.ArtistInfo_box_bio_description}>
						hahawhawhawhawhawhawhawhawha
					</p>
				</div>
				<div className={Style.ArtistInfo_box_link}>
					<h3 className={Style.ArtistInfo_box_link_title}>Links</h3>
					<div className={Style.ArtistInfo_box_link_box}>
						<Image
							src={image.YoutubeIcon}
							className={Style.ArtistInfo_box_link_icon}
						/>
						<Image
							src={image.TwitterLogo}
							className={Style.ArtistInfo_box_link_icon}
						/>
						<Image
							src={image.InstagramLogo}
							className={Style.ArtistInfo_box_link_icon}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistInf;
