import { fetchQuery } from "@/db/queries/fetchQuery";
import { type NextRequest } from 'next/server'

/**
 * GET REST endpoint for querying advocates
 * 
 * @param request NextRequest with page and searchTerms query parameters
 * @returns Response with results
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumberString = searchParams.get('page');

  const pageNumber = Number(pageNumberString);
  const searchTerms = searchParams.get("searchTerms");
  const formattedSearchTerms = searchTerms ? searchTerms.split(",") : [];
  
  const data = fetchQuery(pageNumber, formattedSearchTerms);

  return Response.json({ data });
}
