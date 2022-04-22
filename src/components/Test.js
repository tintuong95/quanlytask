import React from "react";
import { array } from "yup/lib/locale";

export default function Test() {
  const array = [{ name: "Anh" }, { name: "Binh" }, { name: "Chanh" }];
  return (
    <>
      {array.map((item, index) => {
        return (
          <div>
            <h1>{item.name}</h1>
            <button onClick={()=>{}}>Click</button>
          </div>
        );
      })}
    </>
  );
}
