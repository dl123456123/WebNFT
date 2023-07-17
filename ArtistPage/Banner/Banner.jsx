import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";
import img from "../../img";

const Banner = () => {
	return (
		<div className={Style.banner}>
			<div className={Style.banner_img}>
				<Image
					src={img.creatorbackground1}
					objectFit='cover'
					alt='background'
					width={1600}
					height={300}
				/>
			</div>
		</div>
	);
};

export default Banner;
