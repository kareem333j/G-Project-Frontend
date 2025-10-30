import BackgroundImage from "@/public/backgrounds/home.png";
import HomeBox from "@/components/custom/HomeBox";

export default function Home() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
    >
      <HomeBox
        motionProps={{
          initial: { scale: 1.2, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 2.5 }
        }}
      />
    </div>
  );
}
