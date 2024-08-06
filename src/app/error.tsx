"use client";

import { Button } from "@nextui-org/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {


  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <h2>Something went wrong!</h2>
      <p>Error message:</p>
      <pre>{error.message}</pre>
      <Button
        variant={"solid"}
        color={"danger"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
