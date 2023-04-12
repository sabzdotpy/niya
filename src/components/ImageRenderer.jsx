import React, { useState, useRef } from "react";
import classnames from "classnames";
import { useIntersection } from "./intersectionObserver";
import "../styles/ImageRenderer.scss";


const ImageRenderer = ({ url, thumb, width, height }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const imgRef = useRef();
	useIntersection(imgRef, () => {
		console.log("img in view")
		setIsInView(true);
	});

	const handleOnLoad = () => {
		setIsLoaded(true);
	};
	return (
		<div
			className="image-container"
			ref={imgRef}
			style={{
				height: height,
				width: width,
			}}
		>
			{isInView && (
				<>
					<img
						className={classnames("image", "thumb", {
							["hasLoaded"]: !!isLoaded,
						})}
						src={thumb}
					/>
					<img
						className={classnames("image", {
							["hasLoaded"]: !!isLoaded,
						})}
						src={url}
						onLoad={handleOnLoad}
					/>
				</>
			)}
		</div>
	);
};

export default ImageRenderer;
