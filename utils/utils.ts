import { NextResponse } from "next/server";

export function apiErrorResponse() {
  return new NextResponse("Someting went wrong please try again later", {
    status: 404,
  });
}

export function apiResponse({
  message,
  status,
}: {
  message: string;
  status: number;
}) {
  return NextResponse.json(
    {
      message: message,
    },
    {
      status: status,
    }
  );
}
