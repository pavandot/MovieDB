import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Types
import { mediaType } from "../../pages/Home";

type HomeShowcasePropsType = {
	media: mediaType;
};

const HomeShowcase = ({ media }: HomeShowcasePropsType) => {
	const { title, poster, rating, releaseDate } = media;
	return (
		<motion.section className='inline-block h-72  w-[160px]  sm:w-[170px] md:w-[180px] ' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<div className='rounded-lg  relative h-full '>
				<img src={`https://image.tmdb.org/t/p/w300${poster}`} alt={title} className='rounded-lg bg-gray-300  h-full w-full object-fill cursor-pointer' />

				<div className='w-10 font-bold absolute z-40  bottom-[-18px] left-[10px]'>
					<CircularProgressbar
						value={rating * 10}
						text={`${rating * 10}%`}
						backgroundPadding={6}
						strokeWidth={6}
						styles={buildStyles({
							textSize: "35px",
							textColor: "white",
							backgroundColor: "#081C22",
							pathColor: "#21D07A",
						})}
						background={true}
					/>
				</div>
			</div>
			<div className='sm:mx-3 my-3 mt-7'>
				<p className=' font-bold'>{title}</p>
				<p className=' text-gray-500'>{releaseDate}</p>
			</div>
		</motion.section>
	);
};

export default HomeShowcase;
