const partners = [
  { src: "/images/partner-cloud.jpg", alt: "Cloud Education", w: 102, h: 74.5, black: false },
  { src: "/images/partner-cmc.png", alt: "CMC", w: 141, h: 50, black:false  },
  { src: "/images/partner-snp.png", alt: "SNP", w: 120, h: 72.17, black : false },
  { src: "/images/partner-zebec.png", alt: "Zebec", w: 139, h:41, black: true },
];

export default function Partners() {
  return (
    <section className="mx-auto w-full max-w-[1080px] h-[75px] px-5 pb-16 pt-[88px] sm:px-[50px]">
      <h2 className="font-manrope text-center text-[22px] font-bold leading-[150%] tracking-[-0.44px]">
        Our Partners
      </h2>
      <ul className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-6 px-2 sm:px-6 lg:px-10">
        {partners.map((p) => (
          <li key={p.alt} className="flex flex-1 justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className={`h-auto max-w-full object-contain  contrast-200 ${ p.black ? "brightness-0" : "" } `}
              style={{ width: p.w }}
              
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
