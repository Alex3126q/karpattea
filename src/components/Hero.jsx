
export default function Hero() {
  return (
    <div
      className="relative h-[350px] md:h-[500px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/karpaty-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <h1 className="relative text-white text-2xl md:text-4xl font-bold text-center px-4 drop-shadow-lg">
        Трав’яні збори з Карпат — смак, якому довіряють
      </h1>
    </div>
  );
}
