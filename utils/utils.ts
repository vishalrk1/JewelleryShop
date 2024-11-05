import { NextResponse } from "next/server";

export function apiErrorResponse() {
  const message = "Someting went wrong please try again later";
  return new NextResponse(message, {
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
  return NextResponse.json(message, {
    status: status,
  });
}
