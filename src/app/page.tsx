"use client";

import { useEffect, useState } from "react";
import { AdvocateTable } from "./components/AdvocateTable";
import { SearchInput } from "./components/SearchInput";
import { Button, Typography } from "@material-tailwind/react";

export interface Advocate {
  firstName: string,
  lastName: string,
  city: string,
  degree: string,
  specialties: string[],
  yearsOfExperience: number,
  phoneNumber: number
}

export default function Home() {
  const RESULTS_PER_PAGE = 6;
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [currentSearchTerms, setCurrentSearchTerms] = useState<string[]>([]);
  const [noResultsText, setNoResultsText] = useState("Loading initial results...")

  /**
   * Runs the search with the given criteria and updates state with results
   * 
   * @param currentPageNumber Numeric current page number
   * @param searchTerms Array of search criteria
   */
  const runSearch = (currentPageNumber: number, searchTerms: string[]) => {
    fetch("../api/advocates?" + new URLSearchParams([
      ["page", currentPageNumber.toString()],
      ["searchTerms", searchTerms.toString()]

    ])).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data.searchResults);
        setTotalNumberOfPages(Math.ceil(jsonResponse.data.totalNumberOfMatches / RESULTS_PER_PAGE));
      });
    });
  }

  useEffect(() => {
    runSearch(0, []);
    setNoResultsText("No results found, please update search criteria");
  }, []);

  const handleSearchClick = () => {
    setCurrentPage(0);
    runSearch(0, currentSearchTerms);
  }

  const handleResetClick = () => {
    setCurrentPage(0);
    setCurrentSearchTerms([]);
    runSearch(0, []);
  }

  const handleChangePage = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
    runSearch(newPageNumber, currentSearchTerms);
  }

  return (
    <main className="m-5">
      <div>
        <Typography variant="h1" className="text-primary-green flex justify-center mb-3"  >
          Solace Advocates
        </Typography>
        <Typography className="text-primary-green">
          Find a care advocate who will help you unlock better healthcare by phone or video—no matter what you need.
        </Typography>
      </div>
      <SearchInput currentSearchTerms={currentSearchTerms} onUpdateSearchTerms={setCurrentSearchTerms} />
      <div className="flex mb-4">
        <Button className="hover:bg-primary-green-darker mr-2 bg-primary-green text-white"
          type="button"
          onClick={handleSearchClick}>
          Search
        </Button>
        <Button
          className="hover:bg-primary-green-transparent bg-white border-primary-green hover:border-primary-green-transparent border-2 text-primary-green-darker"
          type="button"
          onClick={handleResetClick}>
          Reset
        </Button>
      </div>
      {advocates.length !== 0 ?
        <AdvocateTable
          advocates={advocates}
          currentPage={currentPage}
          numberOfPages={totalNumberOfPages}
          handleChangePage={handleChangePage}
        /> :
        <Typography
          className="text-primary-green flex justify-center mt-3"
          variant="h5">
          {noResultsText}
        </Typography>
      }
    </main>
  );
}
