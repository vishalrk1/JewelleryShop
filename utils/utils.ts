import { NextResponse } from "next/server";

export function apiErrorResponse() {
  return new NextResponse("Someting went wrong please try again later", {
    status: 404,
  });
}
