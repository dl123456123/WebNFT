import React from "react";
import { Banner, ArtistInfo } from "./ArtistPageIndex";
import Style from "./ArtistPage.module.css";

const ArtistPage = () => {
	return (
		<div className={Style.ArtistPage}>
			<Banner />
			<ArtistInfo />
		</div>
	);
};

export default ArtistPage;
