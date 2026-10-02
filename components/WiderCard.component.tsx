"use client"
import Image from "next/image";
export type CardContent = {
  courseNumber: number;
  courseStatus: "Upcoming Courses" | "Ongoing Courses" | "All Courses";
  description: string;
  isActive: boolean
};

const images = [
    {   url: "/images/g1.png", alt: "course1", width: 75, height:75 },
    {   url: "/images/g2.png", alt: "course2", width: 90, height:90 },
    {   url: "/images/g3.png", alt: "course3", width: 80, height:80},
    {   url: "/images/g4.png", alt: "course4", width:75, height: 75}
]

export default function WideCard({
  courseNumber,
  courseStatus,
  description,
  isActive
}: CardContent) {
  const formattedNumber = courseNumber.toString().padStart(2, "0");

  return (
    <div className="  flex h-[461px] w-[592px] flex-col rounded-[32px] justify-between rounded-[32px] p-[35px] bg-[#C33241]">
        <div className=" group flex flex-row justify-end gap-2 text-[#F9EBEC]">
            <p>View all Courses</p> 
            <Image
    
            src= "/images/arrow.png"
            alt="arrow"
            width={14}
            height={11.67}
            className="group-hover:animate-arrowMove"
            />
        
        </div>
        <div className="flex flex-row justify-between top-[122px] left-[66px] gap-[42px]">
            {images.map((image)=>(
                <Image
                    key = {image.url}
                    src = {image.url}
                    alt = {image.url}
                    width={image.width}
                    height={image.height}
                />
            ))
            }
        </div>

        <div className="flex flex-row items-center text-[#F9EBEC] gap-8">
            <div className="relative">
                <p className="font-bold text-[150px] leading-[120%]">
                {formattedNumber}
                </p>

                <span className="absolute right-[-12px] top-[-5px] text-[40px] font-bold">
                +
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <p className="font-bold text-[32px] leading-[100%]">{courseStatus}</p>
                <p className= "font-regular text-[18px] leading-[100%]">{description}</p>
            </div>
            </div>
    </div>
  );
}