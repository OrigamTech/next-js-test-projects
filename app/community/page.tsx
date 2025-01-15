import React from "react";
import Link from "next/link";

import Image from "next/image";
import mealIcon from "@/assets/icons/meal.png";
import communityIcon from "@/assets/icons/community.png";
import eventsIcon from "@/assets/icons/events.png";

const CommunityPage = () => {
  return (
    <>
      <header className="gap-12 mt-12 mb-12 mr-20 ml-20 m-auto w-[90%] max-w-[75rem] text-[#ddd6cb] text-lg text-center">
        <h1>One shared passion</h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className="flex flex-col justify-center items-center mb-20 mt-20">
        <h2>Community Perks</h2>
        <ul>
          <li className="flex flex-col justify-center items-center">
            <Image 
            className="w-44" 
            src={mealIcon} 
            alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <Image
              className="w-44"
              src={communityIcon}
              alt="A crowd of people, cooking"
            />
            <p>Find new friends $ like-minded people</p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <Image
              className="w-44"
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participating in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
};

export default CommunityPage;
