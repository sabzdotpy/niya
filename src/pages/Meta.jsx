import "../styles/Meta.scss";

export default function Meta() {
	const links = [
		{ url: "/", name: "Base" },
		{ url: "/app-ide", name: "Disease Identification" },
		{ url: "/app-quo", name: "Quotes" },
		{ url: "/account", name: "Account" },
	];

	return (
		<div className="Meta">
			<div className="content">
				~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				<ul>
					<li>
						Contributors: <a href="https://www.github.com/sabzdotpy" target="_blank">sabzdotpy</a>
					</li>
					<li>Version: 1.0.0</li>
					<li>CID: 33cc334430a4a02213e305a94f71aa1727ef7034 </li>
					<li>Status: dev</li>
					<li>
						Public hosting preview url:{" "}
						<a href="https://niya-wheat.vercel.app" target="_blank">
							https://niya-wheat.vercel.app
						</a>
					</li>
					<li>Public stable release expected date: NaN</li>
				</ul>
				~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br></br>
			</div>

			<div className="links">
				Links
				<span>
					{links.map((link, index) => {
						return (
                            <>
							<a href={link.url} key={index} > {link.name} </a>
                            {(index === links.length -1) ? "" : "|"} 
                            </>
						);
					})}
				</span>
			</div>
		</div>
	);
}
