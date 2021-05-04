import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@sahithi-golkonda/types-of-restaurants-in-austin";

function TypesOfRestaurantsInAustin() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "chart") return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={chartRef} />
      <p>Credit: <a href="https://observablehq.com/@sahithi-golkonda/types-of-restaurants-in-austin">Types of Restaurants in Austin by Sahithi Golkonda</a></p>
    </>
  );
}

export default TypesOfRestaurantsInAustin;